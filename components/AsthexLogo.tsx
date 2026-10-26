'use client';

import React from 'react';

interface AsthexLogoProps {
  className?: string;
  size?: number | string;
  showWordmark?: boolean;
}

export const AsthexLogo: React.FC<AsthexLogoProps> = ({
  className = '',
  size = 40,
  showWordmark = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        role="img"
        aria-labelledby="asthexLogoTitle"
        className="shrink-0 overflow-visible drop-shadow-[0_0_16px_rgba(255,36,59,0.22)]"
      >
        <title id="asthexLogoTitle">Logo Oficial Asthex</title>
        <defs>
          <linearGradient id="asthexSteel" x1="0" y1="0" x2="0.8" y2="1">
            <stop stopColor="#ffffff" />
            <stop offset="1" stopColor="#aeb4c0" />
          </linearGradient>
          <radialGradient id="asthexRedGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff243b" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ff243b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient subtle glow circle */}
        <circle cx="120" cy="120" r="110" fill="url(#asthexRedGlow)" pointerEvents="none" />

        {/* Outer dashed circular coordinate */}
        <circle
          cx="120"
          cy="120"
          r="91"
          fill="none"
          stroke="#383d49"
          strokeWidth="1.5"
          strokeDasharray="126 20 40 18"
        />

        {/* Geometric 'A' Glyph in Steel Gradient */}
        <path
          d="M53 163 L120 39 L187 163 L151 163 L120 106 L89 163 Z"
          fill="url(#asthexSteel)"
        />

        {/* Orbital Physical Ring in Vibrant Asthex Red */}
        <g className="animate-pulse">
          <ellipse
            cx="120"
            cy="120"
            rx="105"
            ry="27"
            transform="rotate(-25 120 120)"
            fill="none"
            stroke="#ff243b"
            strokeWidth="4.2"
            strokeDasharray="164 44"
            strokeLinecap="round"
          />
          {/* Orbital vector arrows */}
          <path d="M25 143 l-12 7 15 4 Z M214 94 l13 -7 -14 -4 Z" fill="#ff243b" />
        </g>

        {/* Crosshair coordinate markers */}
        <path
          d="M30 55 H48 M192 185 H210 M120 10 V24 M120 216 V230"
          stroke="#737987"
          strokeWidth="1.4"
        />

        {/* Center singularity point */}
        <circle cx="120" cy="120" r="3.2" fill="#ffffff" />
      </svg>

      {showWordmark && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-sans tracking-[0.16em] text-white font-extrabold text-base leading-none">
            <span>ASTHEX</span>
            <span className="text-[#ff243b] text-xs font-mono font-bold">.astun</span>
          </div>
          <span className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase font-mono mt-1">
            Universal Systems
          </span>
        </div>
      )}
    </div>
  );
};
