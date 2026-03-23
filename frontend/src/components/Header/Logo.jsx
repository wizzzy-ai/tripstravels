import React from "react";

const Logo = ({ className = "h-12 md:h-14 w-auto" }) => {
  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle background */}
      <circle
        cx="100"
        cy="80"
        r="65"
        fill="url(#globeGradient)"
        opacity="0.9"
      />

      {/* Globe styling */}
      <defs>
        <linearGradient
          id="globeGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#1e40af", stopOpacity: 1 }} />
        </linearGradient>

        <linearGradient
          id="textGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" style={{ stopColor: "#fbbf24", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#f97316", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Continents - simplified shapes */}
      {/* North America */}
      <path
        d="M 70 50 Q 72 55 68 60 Q 65 58 65 52 Q 67 48 70 50"
        fill="#10b981"
        opacity="0.8"
      />

      {/* South America */}
      <path
        d="M 75 70 Q 78 75 75 85 Q 72 80 72 72 Q 73 68 75 70"
        fill="#10b981"
        opacity="0.8"
      />

      {/* Africa */}
      <path
        d="M 95 60 Q 105 65 105 80 Q 103 75 100 72 Q 97 68 95 60"
        fill="#10b981"
        opacity="0.8"
      />

      {/* Europe */}
      <path
        d="M 105 50 Q 115 52 115 62 Q 110 58 105 50"
        fill="#10b981"
        opacity="0.8"
      />

      {/* Asia */}
      <path
        d="M 120 55 Q 135 60 140 75 Q 130 65 120 55"
        fill="#10b981"
        opacity="0.8"
      />

      {/* Airplane/Rocket element */}
      <g transform="translate(130, 45) rotate(-30)">
        <path
          d="M 0 0 L 12 -2 L 10 0 L 12 2 Z"
          fill="#fbbf24"
          opacity="0.95"
        />
        <path
          d="M 8 -3 L 10 3"
          stroke="#fbbf24"
          strokeWidth="1.5"
          opacity="0.7"
        />
      </g>

      {/* Spiral/arc around globe */}
      <circle
        cx="100"
        cy="80"
        r="68"
        fill="none"
        stroke="#60a5fa"
        strokeWidth="1.5"
        opacity="0.4"
        strokeDasharray="5,5"
      />

      {/* TRAVEL text */}
      <text
        x="100"
        y="160"
        textAnchor="middle"
        fontSize="20"
        fontWeight="bold"
        fill="url(#textGradient)"
        letterSpacing="2"
      >
        TRAVEL
      </text>

      {/* WORLD text */}
      <text
        x="100"
        y="182"
        textAnchor="middle"
        fontSize="14"
        fontWeight="600"
        fill="#e5e7eb"
        letterSpacing="3"
      >
        WORLD
      </text>

      {/* Decorative dots */}
      <circle cx="50" cy="155" r="1.5" fill="#fbbf24" opacity="0.6" />
      <circle cx="150" cy="155" r="1.5" fill="#fbbf24" opacity="0.6" />
    </svg>
  );
};

export default Logo;
