export interface ChurchLocation {
  id: string;
  name: string;
  address: string;
  serviceTimes: string[];
  pastor: string;
  image: string;
}

export interface CommunityMember {
  id: string;
  name: string;
  role: string;
  testimony: string;
  bgColor: string; // Tailwinds bg-color class (e.g., 'bg-amber-500', 'bg-violet-600')
  image: string;
  height: string; // height factor class (e.g., 'h-[240px]', 'h-[300px]')
}

export interface SermonSeries {
  title: string;
  subtitle: string;
  speaker: string;
  date: string;
  videoUrl: string;
  quote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChurchTabContent {
  id: string;
  label: string;
  title: string;
  content: string;
  bullets: string[];
  stats?: { value: string; label: string }[];
}
