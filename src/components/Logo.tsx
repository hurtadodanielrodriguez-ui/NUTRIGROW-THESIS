import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  isDark?: boolean;
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  isDark = false,
  showSubtitle = false,
  className = '',
  onClick
}) => {
  const isHero = size === 'hero';
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  const iconDimensions = isHero 
    ? 'w-28 h-28 sm:w-40 sm:h-40' 
    : isLg 
    ? 'w-14 h-14 sm:w-16 sm:h-16' 
    : isSm 
    ? 'w-9 h-9 sm:w-10 sm:h-10' 
    : 'w-11 h-11 sm:w-12 sm:h-12';

  return (
    <div
      id="nutrigrow-brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${
        isHero ? 'flex-col text-center' : 'flex-row'
      } ${className}`}
    >
      {/* Natural Meditating Emblem Icon */}
      <div className={`relative ${iconDimensions} flex items-center justify-center shrink-0`}>
        {/* Glow backdrop */}
        <div
          className={`absolute inset-0 rounded-full blur-xl opacity-50 transition-all duration-500 ${
            isDark ? 'bg-[#70B873]/30' : 'bg-[#0E5C36]/20'
          }`}
        />

        {/* Circular natural emblem matching the new NutriGrow logo */}
        <div
          className={`relative w-full h-full rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 overflow-hidden ${
            isDark
              ? 'bg-[#102419] ring-2 ring-[#70B873]/40'
              : 'bg-[#F4F1EA] ring-2 ring-[#0E5C36]/25 shadow-emerald-950/10'
          }`}
        >
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full p-1"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft inner circle background */}
            <circle cx="100" cy="100" r="92" fill={isDark ? '#0C1C13' : '#F9F8F5'} />

            {/* Tree Branch Arch (Left to Top-Right Canopy) */}
            <path
              d="M 50 145 C 38 120 40 70 75 42 C 95 26 128 26 150 46 C 158 54 162 65 160 76 C 156 86 142 86 138 74 C 132 56 112 44 92 48 C 68 54 56 78 58 108 C 59 122 62 135 66 145 Z"
              fill={isDark ? '#70B873' : '#0E5C36'}
            />

            {/* Lush Sprouting Tree Leaves */}
            {/* Top leaves */}
            <ellipse cx="100" cy="30" rx="6" ry="11" transform="rotate(-15 100 30)" fill="#70B873" />
            <ellipse cx="118" cy="32" rx="5" ry="10" transform="rotate(25 118 32)" fill={isDark ? '#86EFAC' : '#3E9B5F'} />
            <ellipse cx="82" cy="34" rx="5.5" ry="10" transform="rotate(-40 82 34)" fill={isDark ? '#86EFAC' : '#4EAD6E'} />
            <ellipse cx="136" cy="40" rx="5" ry="9" transform="rotate(45 136 40)" fill="#70B873" />
            <ellipse cx="66" cy="46" rx="6" ry="10" transform="rotate(-60 66 46)" fill="#70B873" />
            <ellipse cx="152" cy="54" rx="5" ry="9" transform="rotate(60 152 54)" fill={isDark ? '#86EFAC' : '#3E9B5F'} />
            <ellipse cx="52" cy="64" rx="5.5" ry="9.5" transform="rotate(-75 52 64)" fill={isDark ? '#86EFAC' : '#4EAD6E'} />
            <ellipse cx="160" cy="72" rx="4.5" ry="8" transform="rotate(75 160 72)" fill="#70B873" />
            <ellipse cx="44" cy="85" rx="5" ry="9" transform="rotate(-85 44 85)" fill="#70B873" />
            <ellipse cx="42" cy="106" rx="5" ry="8.5" transform="rotate(-95 42 106)" fill={isDark ? '#86EFAC' : '#3E9B5F'} />
            
            {/* Inner canopy leaves */}
            <ellipse cx="90" cy="48" rx="4.5" ry="8" transform="rotate(10 90 48)" fill="#70B873" />
            <ellipse cx="110" cy="50" rx="4.5" ry="8" transform="rotate(-20 110 50)" fill={isDark ? '#86EFAC' : '#4EAD6E'} />
            <ellipse cx="126" cy="60" rx="4" ry="7.5" transform="rotate(30 126 60)" fill="#70B873" />
            <ellipse cx="76" cy="62" rx="4.5" ry="8" transform="rotate(-35 76 62)" fill={isDark ? '#86EFAC' : '#3E9B5F'} />
            <ellipse cx="68" cy="82" rx="4.5" ry="8" transform="rotate(-50 68 82)" fill="#70B873" />

            {/* Supportive Cupped Hand (Base) */}
            <path
              d="M 52 142 C 55 162 76 176 106 176 C 132 176 155 165 164 148 C 166 144 163 138 158 138 C 153 138 150 142 146 148 C 137 160 120 166 102 166 C 80 166 65 155 62 140 C 66 144 74 148 86 148 C 104 148 122 138 140 134 C 145 133 150 137 149 142 C 145 152 135 158 120 160 C 105 162 90 158 80 152 C 70 146 64 140 52 142 Z"
              fill={isDark ? '#70B873' : '#0E5C36'}
            />
            {/* Hand fingers accent lines */}
            <path
              d="M 125 140 C 135 130 148 116 156 108 C 158 105 162 107 160 111 C 152 122 140 138 132 148 Z"
              fill={isDark ? '#86EFAC' : '#0E5C36'}
            />
            <path
              d="M 140 138 C 148 126 158 114 166 105 C 168 102 172 104 170 108 C 162 120 150 136 143 144 Z"
              fill={isDark ? '#70B873' : '#1A6E43'}
            />

            {/* Meditating Human Figure in Lotus Pose */}
            {/* Head */}
            <circle cx="100" cy="80" r="7.5" fill={isDark ? '#86EFAC' : '#2D8B55'} />
            {/* Neck & Torso */}
            <path
              d="M 96 90 C 94 98 94 108 92 116 C 97 117 103 117 108 116 C 106 108 106 98 104 90 Z"
              fill={isDark ? '#86EFAC' : '#2D8B55'}
            />
            {/* Meditative Arms & Hands on Knees */}
            <path
              d="M 96 92 C 86 98 78 106 72 114 C 70 117 74 120 78 118 C 84 114 90 110 94 104 Z"
              fill={isDark ? '#86EFAC' : '#2D8B55'}
            />
            <path
              d="M 104 92 C 114 98 122 106 128 114 C 130 117 126 120 122 118 C 116 114 110 110 106 104 Z"
              fill={isDark ? '#86EFAC' : '#2D8B55'}
            />
            {/* Crossed Lotus Legs */}
            <path
              d="M 72 116 C 68 122 74 130 84 130 C 94 130 100 126 100 124 C 100 126 106 130 116 130 C 126 130 132 122 128 116 C 122 122 112 124 100 124 C 88 124 78 122 72 116 Z"
              fill={isDark ? '#86EFAC' : '#2D8B55'}
            />
          </svg>
        </div>
      </div>

      {/* Brand Typography matching the uploaded logo */}
      <div className={`flex flex-col ${isHero ? 'items-center mt-3' : 'items-start'}`}>
        <div className={`flex ${isHero ? 'flex-col items-center gap-0' : 'flex-col sm:flex-row sm:items-baseline sm:gap-1.5'}`}>
          <span
            className={`font-serif-title font-black uppercase tracking-[0.22em] leading-none ${
              isHero
                ? 'text-3xl sm:text-5xl text-[#0E5C36] dark:text-[#70B873]'
                : isLg
                ? 'text-xl sm:text-2xl text-[#0E5C36] dark:text-[#70B873]'
                : isSm
                ? 'text-sm sm:text-base text-[#0E5C36] dark:text-[#70B873]'
                : 'text-base sm:text-lg text-[#0E5C36] dark:text-[#70B873]'
            }`}
          >
            NUTRI
          </span>
          <span
            className={`font-serif-title font-light uppercase tracking-[0.28em] leading-none ${
              isHero
                ? 'text-2xl sm:text-4xl text-[#1E7F4E] dark:text-white mt-1'
                : isLg
                ? 'text-lg sm:text-xl text-[#1E7F4E] dark:text-white'
                : isSm
                ? 'text-xs sm:text-sm text-[#1E7F4E] dark:text-white'
                : 'text-sm sm:text-base text-[#1E7F4E] dark:text-white'
            }`}
          >
            GROW
          </span>
        </div>

        {showSubtitle && (
          <p
            className={`font-sans tracking-widest uppercase font-bold mt-2 text-center ${
              isHero ? 'text-xs sm:text-sm tracking-[0.3em]' : 'text-[9px] tracking-widest'
            } ${isDark ? 'text-[#70B873]' : 'text-[#0E5C36]'}`}
          >
            Nutrición Consciente & Crecimiento
          </p>
        )}
      </div>
    </div>
  );
};

