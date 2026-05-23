import React from "react";

interface ChurchLogoProps {
  className?: string; // custom classes (e.g., width, height)
  variant?: "brand" | "symbol"; // full brand layout with side text, or just the circular emblem
}

export default function ChurchLogo({ className = "h-12 w-12", variant = "symbol" }: ChurchLogoProps) {
  // Brand color palette from the actual logo uploaded
  const colorBurgundy = "#8A1E25"; // The primary deep wine red
  const colorRose = "#D2737D";     // The accent pink/rose
  const colorDarkWine = "#611014"; // Shading

  return (
    <div className={`flex items-center gap-2.5 transition-all text-left select-none ${variant === "brand" ? "max-w-xs" : ""}`}>
      {/* SVG Emblem */}
      <svg
        className={className}
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Definitions for Text-Paths and Gradients */}
        <defs>
          {/* Path for bottom curved text: Charismatic Evangelicals */}
          <path
            id="textArcPath"
            d="M 25,130 A 88,88 0 0,0 195,130"
            fill="none"
          />
          {/* Subtle gradient for the main human figure core */}
          <linearGradient id="roseGradient" x1="110" y1="65" x2="110" y2="125" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={colorRose} />
            <stop offset="100%" stopColor={colorBurgundy} />
          </linearGradient>
        </defs>

        {/* Outer Top Half-Circle Boundary */}
        <path
          d="M 46,78 A 78,78 0 0,1 174,78"
          stroke={colorBurgundy}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Decorative inner parallel ring for top arc */}
        <path
          d="M 49,82 A 74,74 0 0,1 171,82"
          stroke={colorRose}
          strokeWidth="1.5"
          fill="none"
        />

        {/* Outer Bottom Arced Banners */}
        <path
          d="M 40,118 A 82,82 0 0,0 180,118"
          stroke={colorBurgundy}
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 44,123 A 78,78 0 0,0 176,123"
          stroke={colorRose}
          strokeWidth="1.5"
          fill="none"
        />

        {/* ————————————————— MAIN EMBLEM SYMBOLS ————————————————— */}

        {/* 1. The Head of the Youth Figure */}
        <circle
          cx="110"
          cy="77"
          r="8"
          fill={colorBurgundy}
        />

        {/* 2. Stylized Human Body (Crescent shaped arms rising up) */}
        {/* Left inner arm banner */}
        <path
          d="M 88,71 C 94,86 102,110 110,128 C 110,128 102,106 102,89 Z"
          fill={colorBurgundy}
        />
        {/* Main stylized torso with rose filling */}
        <path
          d="M 88,71 C 89,84 94,106 107,126 C 110,122 110,110 102,89 Z"
          fill="url(#roseGradient)"
          stroke={colorBurgundy}
          strokeWidth="1.5"
        />
        {/* Right symmetric arm and body structure raising hands */}
        <path
          d="M 124,104 C 118,110 114,120 110,128 C 111,128 119,114 125,106 Z"
          fill={colorBurgundy}
        />
        
        {/* Inside Letters CE next to the central figure */}
        <text
          x="122"
          y="114"
          fill={colorBurgundy}
          fontFamily="serif"
          fontSize="17"
          fontWeight="bold"
          letterSpacing="0"
        >
          CE
        </text>

        {/* 3. The Open Scriptures Book below the figure */}
        {/* Left Page and Spine arches */}
        <path
          d="M 110,132 C 95,123 75,122 56,128 L 56,134 C 75,128 95,129 110,135 Z"
          fill={colorDarkWine}
          stroke={colorBurgundy}
          strokeWidth="1"
        />
        {/* Right Page and Spine arches */}
        <path
          d="M 110,132 C 125,123 145,122 164,128 L 164,134 C 145,128 125,129 110,135 Z"
          fill={colorDarkWine}
          stroke={colorBurgundy}
          strokeWidth="1"
        />
        {/* Central ribbon marker bookmark indicator */}
        <path
          d="M 106,135 L 110,146 L 114,135 Z"
          fill={colorRose}
          stroke={colorBurgundy}
          strokeWidth="1"
        />

        {/* 4. "RESCUE THE YOUTH" centered underneath the Book scripture coordinates */}
        <text
          x="110"
          y="157"
          textAnchor="middle"
          fill={colorBurgundy}
          fontFamily="Georgia, serif"
          fontSize="10"
          fontWeight="bold"
          letterSpacing="0.4"
        >
          RESCUE THE YOUTH
        </text>

        {/* 5. Curved bottom text: "CHARISMATIC EVANGELICALS" */}
        <text
          fill={colorBurgundy}
          fontFamily="Georgia, serif"
          fontSize="12.5"
          fontWeight="900"
          letterSpacing="1.2"
        >
          <textPath xlinkHref="#textArcPath" startOffset="50%" textAnchor="middle">
            CHARISMATIC EVANGELICALS
          </textPath>
        </text>
      </svg>

      {/* Full Brand Name layout styling option (displays side by side) */}
      {variant === "brand" && (
        <div className="flex flex-col">
          <span 
            className="font-display text-[15px] font-black tracking-widest uppercase -mb-1"
            style={{ color: colorBurgundy }}
          >
            Charismatic
          </span>
          <span className="font-display text-[16px] font-black tracking-normal uppercase text-slate-900">
            Evangelicals
          </span>
        </div>
      )}
    </div>
  );
}
