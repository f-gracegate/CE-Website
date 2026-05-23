import { ChurchLocation, CommunityMember, ChurchTabContent } from "./types";

export const CHURCH_LOCATIONS: ChurchLocation[] = [
  {
    id: "london-central",
    name: "London Central (West End)",
    address: "Great Marylebone St, London W1G 8HU",
    serviceTimes: ["Sun 9:30 AM", "Sun 11:30 AM", "Sun 6:00 PM (Youth)"],
    pastor: "Dr. David Shepherd",
    image: "https://images.unsplash.com/photo-1548625361-155de0c1f25c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "birmingham",
    name: "Birmingham Campus",
    address: "St Paul's Square, Birmingham B3 1QY",
    serviceTimes: ["Sun 10:00 AM", "Sun 12:00 PM"],
    pastor: "Rev. Marcus & Clara Bell",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "manchester",
    name: "Manchester Northern Quarter",
    address: "Newton Street, Manchester M1 1FT",
    serviceTimes: ["Sun 9:00 AM", "Sun 11:00 AM", "Sun 5:00 PM"],
    pastor: "Pastor Thomas Wright",
    image: "https://images.unsplash.com/photo-1511242300810-9757af26284a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "online-global",
    name: "Charismatic Online Live",
    address: "Streaming Worldwide (YouTube & Live App)",
    serviceTimes: ["Sun 11:30 AM GMT", "Wed 7:30 PM (Midweek Prayer)"],
    pastor: "Broadcast Team",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80"
  }
];

export const WHO_WE_ARE_TABS: ChurchTabContent[] = [
  {
    id: "who-we-are",
    label: "WHO WE ARE",
    title: "who we are",
    content: "We are a John 14:6 church — a passionate, charismatic evangelical church proclaiming that Jesus Christ is the Way, the Truth, and the Life. Boundlessly transformed by God's radical grace, we love our community with depth, devotion, and high action, so that the world may witness the raw, living power of Christ. We welcome searchers, skeptics, and believers alike to join our diverse modern family.",
    bullets: [
      "Biblically Grounded: Focused heavily on historical truths and Scripture.",
      "Spirit-Led: Heartfelt, energetic worship and active spiritual gifts.",
      "Radical Hospitality: A warm, authentic space where everyone matters."
    ],
    stats: [
      { value: "12,400+", label: "Active Believers" },
      { value: "14", label: "Local Gatherings" },
      { value: "48", label: "Global Reach" }
    ]
  },
  {
    id: "what-we-do",
    label: "WHAT WE DO",
    title: "what we do",
    content: "We mobilize to love and serve. By creating spaces where modern seekers can encounter the supernatural presence of God, we rebuild spiritual foundations. Our ministries range from passionate, high-fidelity praise, deep corporate intercessory prayer, to responsive youth groups that tackle complex modern issues with biblical clarity, integrity, and warmth.",
    bullets: [
      "Dynamic Sunday Gatherings featuring energetic, spirit-stirring worship.",
      "Interactive midweek prayer groups in over 180 homes.",
      "Theological courses designed to equip believers to answer hard core questions of faith."
    ],
    stats: [
      { value: "180+", label: "Midweek Circles" },
      { value: "1,200", label: "Baptisms in 2025" }
    ]
  },
  {
    id: "get-involved",
    label: "GET INVOLVED",
    title: "get involved",
    content: "Growth happens when we step out of our seats and into community. There are countless avenues to contribute your God-given spiritual strengths and creative gifts in our spiritual home. From worship production, technology setups, friendly welcoming rails, to our intensive local outreach serving groups, you have a vital, unique part to play.",
    bullets: [
      "Welcome Team: Crafting a spectacular, warm first impression.",
      "Worship & Tech Grid: Creating a highly immersive environment of praise.",
      "Charismatic Youth: Instilling faith and purpose in the next generation."
    ],
    stats: [
      { value: "4,200+", label: "Active Serving Volunteers" },
      { value: "30+", label: "Ministry Teams" }
    ]
  },
  {
    id: "faq",
    label: "FAQ",
    title: "frequently asked questions",
    content: "Whether you are planning your first visit or looking for spiritual clarity on our evangelical theological positions, find quick, clear answers to help guide your steps.",
    bullets: [
      "What are your service times? Most locations host morning services at 9:30 AM and 11:30 AM, with evening youth gatherings.",
      "What should I wear? Dress comfortably! We gather in everything from casual jeans to traditional attire.",
      "Are children welcome? Yes! Our 'NextGen Kids' programs run simultaneously during all Sunday morning services."
    ]
  }
];

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
    role: "Manchester Pastor",
    testimony: "We are planting lighthouses, not monuments. Seeing the Northern Quarter transform through radical hospitality and intentional discipleship is our greatest victory.",
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
