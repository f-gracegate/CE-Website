import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Simple in-memory storage for prayer requests to ensure real-time behavior
interface PrayerRequest {
  id: string;
  author: string;
  request: string;
  category: "Healing" | "Guidance" | "Family" | "Faith" | "Other";
  createdAt: string;
  prayingCount: number;
}

const initialPrayers: PrayerRequest[] = [
  {
    id: "prayer-1",
    author: "Sister Margaret",
    request: "Pray for our upcoming youth conference in South London, that many teens find their calling and community.",
    category: "Faith",
    createdAt: "Just now",
    prayingCount: 24
  },
  {
    id: "prayer-2",
    author: "David K.",
    request: "Requesting healing prayers for my father who is undergoing cardiac surgery this Friday morning.",
    category: "Healing",
    createdAt: "2 hours ago",
    prayingCount: 42
  },
  {
    id: "prayer-3",
    author: "The Thompson Family",
    request: "Guidance as we relocate our family next month. Asking for doors to open for local fellowship and schooling.",
    category: "Guidance",
    createdAt: "5 hours ago",
    prayingCount: 12
  },
  {
    id: "prayer-4",
    author: "Hannah B.",
    request: "Restore peace in my family relationship with my younger brother, that reconciliation and love prevail.",
    category: "Family",
    createdAt: "1 day ago",
    prayingCount: 19
  }
];

let prayers: PrayerRequest[] = [...initialPrayers];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  };

  // 1. PRAYER CANVAS ENDPOINTS
  app.get("/api/prayers", (req, res) => {
    res.json(prayers);
  });

  app.post("/api/prayers", (req, res) => {
    const { author, request, category } = req.body;
    if (!author || !request || !category) {
      return res.status(400).json({ error: "Missing required prayer fields." });
    }
    const newPrayer: PrayerRequest = {
      id: `prayer-${Date.now()}`,
      author: String(author).trim(),
      request: String(request).trim(),
      category: category as any,
      createdAt: "Just now",
      prayingCount: 1
    };
    prayers.unshift(newPrayer);
    res.status(201).json(newPrayer);
  });

  app.post("/api/prayers/:id/pray", (req, res) => {
    const { id } = req.params;
    const prayer = prayers.find(p => p.id === id);
    if (!prayer) {
      return res.status(404).json({ error: "Prayer not found" });
    }
    prayer.prayingCount += 1;
    res.json(prayer);
  });

  // 2. AI-POWERED SERMON COMPANION ENDPOINT (Using process.env.GEMINI_API_KEY)
  app.post("/api/sermon-companion", async (req, res) => {
    const { message, chatHistory } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Missing prompt message" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        text: "The Sermon Companion is currently offline. Please configure your `GEMINI_API_KEY` in the **Settings > Secrets** panel of AI Studio to wake the theological assistant up!"
      });
    }

    try {
      const prompt = `You are a warm, highly knowledgeable theological and Sermon Companion AI assistant for 'Charismatic Evangelicals' church.
The church has three core campuses: London Central (pastored by Elijah Thompson), Westminster Annex, and Croydon Assembly.
We have a major sermon library with recurring series like:
1. "The Sovereign Wilderness" (study of the Sinai covenant, John 14:6 coordinates, finding faith amidst isolation, by Senior Pastor Elijah Thompson).
2. "Unforced Rhythms of Grace" (Matthew 11:28, entering God's Sabbath rest, letting go of legalism).
3. "Bold Petitions" (a scripture-deep study on prayer shields, persistence, Luke 11 and Luke 18).

Theology: Evangelical, charismatic, biblically grounded, focusing on Westminster coordinates, Christcentrism, grace, corporate prayer, and covenant fellowship.

Answer the user's inquiry elegantly, warmth-fully, and with direct biblical citations (quoting chapter and verse coordinates!). If they ask which verse coordinates discuss Grace, John 14:6, truth, covenant, or any church location Pastor, answer with absolute scriptural precision and clarity. Provide helpful, structured, formatting in markdown.

User Enquiry: "${message}"`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "The Sermon Companion encountered an internal error. Ensure your key is valid and configured." });
    }
  });

  // Serve static assets / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FULL-STACK DEV SERVER] Running on port ${PORT}`);
  });
}

startServer();
