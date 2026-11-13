import { ChurchLocation, CommunityMember, ChurchTabContent } from "./types";

// Placeholder campuses (Ghana). Replace with the church's real campuses, times and pastors.
export const CHURCH_LOCATIONS: ChurchLocation[] = [
  {
    id: "accra",
    name: "Accra Campus",
    address: "Osu, Accra",
    serviceTimes: ["Sun 8:00 AM", "Sun 10:30 AM", "Wed 6:30 PM (Midweek)"],
    pastor: "Senior Pastor",
    image: "https://images.unsplash.com/photo-1548625361-155de0c1f25c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "kumasi",
    name: "Kumasi Campus",
    address: "Adum, Kumasi",
    serviceTimes: ["Sun 9:00 AM", "Fri 6:30 PM (Prayer)"],
    pastor: "Campus Pastor",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "tema",
    name: "Tema Campus",
    address: "Community 1, Tema",
    serviceTimes: ["Sun 9:30 AM"],
    pastor: "Campus Pastor",
    image: "https://images.unsplash.com/photo-1511242300810-9757af26284a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "online",
    name: "Online",
    address: "Live on YouTube",
    serviceTimes: ["Sun 10:30 AM GMT", "Wed 6:30 PM (Midweek)"],
    pastor: "Media Team",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80"
  }
];


export const WHO_WE_ARE_TABS: ChurchTabContent[] = [
  {
    id: "who-we-are",
    label: "Who we are",
    title: "Who we are",
    content: "We are a charismatic evangelical church built on John 14:6: Jesus Christ is the Way, the Truth and the Life. Changed by God's grace, we love our community and want everyone to experience the living power of Christ. Whether you are searching, unsure or already a believer, you are welcome here.",
    bullets: [
      "Biblical: our teaching is rooted in Scripture.",
      "Spirit-led: heartfelt worship and the gifts of the Spirit.",
      "Welcoming: a warm place where everyone belongs."
    ]
  },
  {
    id: "what-we-do",
    label: "What we do",
    title: "What we do",
    content: "We gather to worship, pray and grow together, and we go out to serve. Our ministries include Sunday worship, prayer meetings, home Bible studies and youth groups that tackle real questions with honesty and care.",
    bullets: [
      "Sunday services with lively worship and Bible teaching.",
      "Midweek prayer and Bible study groups in homes.",
      "Classes that help believers grow and answer hard questions about faith."
    ]
  },
  {
    id: "get-involved",
    label: "Get involved",
    title: "Get involved",
    content: "We grow when we serve. There are many ways to use your gifts here, from music and media to welcoming visitors and outreach in the community. Everyone has a part to play.",
    bullets: [
      "Welcome team: greeting and helping visitors.",
      "Worship and media: music, sound, cameras and livestream.",
      "Youth and children: helping young people grow in faith."
    ]
  },
  {
    id: "faq",
    label: "FAQ",
    title: "Frequently asked questions",
    content: "Planning your first visit? Here are answers to common questions.",
    bullets: [
      "What are your service times? See each campus above. Most have Sunday morning services and a midweek meeting.",
      "What should I wear? Come as you are, from casual wear to traditional attire.",
      "Are children welcome? Yes. Children's church runs during Sunday morning services."
    ]
  }
];

// Placeholder members and testimonies. Replace with real people (with their permission).
export const COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: "sarah",
    name: "Sarah Jenkins",
    role: "Home Group Leader",
    testimony: "Finding this family transformed my marriage and clarified my purpose. I went from feeling isolated in the city to hosting 15 beautiful brothers and sisters in my home every Thursday evening.",
    bgColor: "bg-amber-400",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=600&q=80",
    height: "h-[290px] md:h-[350px]"
  },
  {
    id: "elijah",
    name: "Elijah Graham",
    role: "Praise Coordinator",
    testimony: "Dynamic praise isn't just music—it's active warfare and breaking chains. Our worship team gathers with a single goal: to usher in the living breeze of God's presence.",
    bgColor: "bg-violet-600",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=600&q=80",
    height: "h-[330px] md:h-[410px]"
  },
  {
    id: "gabriella",
    name: "Gabriella Silva",
    role: "Youth Outreach Leader",
    testimony: "Teenagers aren't the future church—they are the active church right now. We create exciting spaces where the youth ask honest questions and find deep, uncompromising faith.",
    bgColor: "bg-emerald-500",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&h=600&q=80",
    height: "h-[270px] md:h-[320px]"
  },
  {
    id: "pastor-thomas",
    name: "Thomas Wright",
    role: "Campus Pastor",
    testimony: "We are planting lighthouses, not monuments. Seeing our neighbourhood transform through hospitality and intentional discipleship is our greatest victory.",
    bgColor: "bg-rose-500",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=600&q=80",
    height: "h-[320px] md:h-[390px]"
  },
  {
    id: "clara",
    name: "Clara Bell",
    role: "Children Ministry",
    testimony: "Faith starts small but grows deep. Providing a playground of grace where little hearts learn their absolute value in God's eyes is our sacred calling.",
    bgColor: "bg-sky-500",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=600&q=80",
    height: "h-[250px] md:h-[300px]"
  }
];
