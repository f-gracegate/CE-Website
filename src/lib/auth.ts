import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User 
} from "firebase/auth";
import firebaseConfig from "../firebase-applet-config.json";

// We check if it is a dummy config, in which case we will gracefully support a visual simulation/mock sign-in state 
// so the page never locks the user out of testing the UI before they set up keys!
export const isMockAuth = !firebaseConfig.apiKey || firebaseConfig.apiKey.includes("DUMMY");

let app;
let auth: any;
const provider = new GoogleAuthProvider();

// Google Calendar Scopes requesting
provider.addScope("https://www.googleapis.com/auth/calendar.events");
provider.addScope("https://www.googleapis.com/auth/calendar.readonly");

if (!isMockAuth) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (err) {
    console.warn("Firebase initialization failed, utilizing mock auth fallback", err);
  }
}

let isSigningIn = false;
let cachedAccessToken: string | null = null;
let simulatedUser: { displayName: string; email: string; photoURL: string } | null = null;

export const initAuth = (
  onAuthSuccess?: (user: any, token: string) => void,
  onAuthFailure?: () => void
) => {
  if (isMockAuth || !auth) {
    // Simulated/Mock interval check
    const savedUser = localStorage.getItem("simulated_church_user");
    const savedToken = localStorage.getItem("simulated_church_token");
    if (savedUser && savedToken) {
      simulatedUser = JSON.parse(savedUser);
      cachedAccessToken = savedToken;
      if (onAuthSuccess) onAuthSuccess(simulatedUser, savedToken);
    } else {
      if (onAuthFailure) onAuthFailure();
    }
    // Return unsubscribe empty stub
    return () => {};
  }

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: any; accessToken: string } | null> => {
  if (isMockAuth || !auth) {
    // Provide a beautiful simulated user session for test environments
    const mockUser = {
      displayName: "Grace Francis",
      email: "gracefrancis0895@gmail.com",
      photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
    };
    const mockToken = "mock_gcal_access_token_123456789";
    simulatedUser = mockUser;
    cachedAccessToken = mockToken;
    localStorage.setItem("simulated_church_user", JSON.stringify(mockUser));
    localStorage.setItem("simulated_church_token", mockToken);
    return { user: mockUser, accessToken: mockToken };
  }

  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Failed to retrieve access token from Google sign-in credential.");
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error("Sign in error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async () => {
  cachedAccessToken = null;
  simulatedUser = null;
  localStorage.removeItem("simulated_church_user");
  localStorage.removeItem("simulated_church_token");

  if (auth) {
    await auth.signOut();
  }
};
