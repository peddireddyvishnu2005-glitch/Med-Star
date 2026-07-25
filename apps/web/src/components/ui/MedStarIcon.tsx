'use client';

import React from 'react';

interface MedStarIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  glow?: boolean;
  animated?: boolean;
}

export const MedStarIcon: React.FC<MedStarIconProps> = ({
  className = '',
  size = 'md',
  glow = true,
  animated = false,
}) => {
  const getDimension = () => {
    if (typeof size === 'number') return `${size}px`;
    switch (size) {
      case 'sm':
        return '24px';
      case 'md':
        return '36px';
      case 'lg':
        return '48px';
      case 'xl':
        return '64px';
      default:
        return '36px';
    }
  };

  const dimension = getDimension();

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      {glow && (
        <div
          className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-emerald-400 blur-md opacity-60 ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{ transform: 'scale(0.85)' }}
        />
      )}

      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-xl"
      >
        <defs>
          {/* Main Shield Gradient */}
          <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>

          {/* Border Cyan-Emerald Gradient */}
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>

          {/* Star Gradient */}
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="40%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Cross & Core Gradient */}
          <linearGradient id="crossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          {/* Pulse Glow Filter */}
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shield Container Background */}
        <rect
          x="6"
          y="6"
          width="88"
          height="88"
          rx="24"
          fill="url(#shieldGrad)"
          stroke="url(#borderGrad)"
          strokeWidth="2.5"
        />

        {/* Inner Glass Highlights */}
        <path
          d="M 12 30 C 12 18, 18 12, 30 12 L 70 12 C 82 12, 88 18, 88 30 Z"
          fill="white"
          fillOpacity="0.04"
        />

        {/* Compass Ticks / Navigation Coordinates */}
        <circle cx="50" cy="50" r="38" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 6" opacity="0.4" />

        {/* 4-Point Precision Navigation Star Background */}
        <path
          d="M 50 16 L 56 44 L 84 50 L 56 56 L 50 84 L 44 56 L 16 50 L 44 44 Z"
          fill="url(#starGrad)"
          opacity="0.9"
          filter="url(#glowFilter)"
        />

        {/* 4-Point Precision Star Accent Geometry (3D Facet) */}
        <path
          d="M 50 16 L 50 50 L 84 50 L 50 50 L 50 84 L 50 50 L 16 50 L 50 50 Z"
          fill="#38bdf8"
          opacity="0.3"
        />

        {/* Central Medical Cross Emblem */}
        <g transform="translate(50 50)">
          {/* Vertical Cross Bar */}
          <rect
            x="-6"
            y="-19"
            width="12"
            height="38"
            rx="3"
            fill="url(#crossGrad)"
          />
          {/* Horizontal Cross Bar */}
          <rect
            x="-19"
            y="-6"
            width="38"
            height="12"
            rx="3"
            fill="url(#crossGrad)"
          />

          {/* Central Beacon Core */}
          <circle cx="0" cy="0" r="4.5" fill="#0284c7" />
          <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};

export default MedStarIcon;
