import React from 'react';

interface PixelLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PixelLogo: React.FC<PixelLogoProps> = ({ size = 'md', className = '' }) => {
  const iconSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-12 h-12' : 'w-8 h-8';
  const textSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* 8-Bit Pixel Sword Icon */}
      <div className={`${iconSize} bg-gradient-to-br from-amber-400 via-red-500 to-rose-600 rounded-xl p-1 shadow-md border-2 border-amber-300 flex items-center justify-center animate-pulse`}>
        <svg
          viewBox="0 0 16 16"
          className="w-full h-full pixelated filter drop-shadow"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Sword Blade */}
          <rect x="7" y="1" width="2" height="7" fill="#FFFFFF" />
          <rect x="7" y="2" width="2" height="5" fill="#FEF08A" />
          {/* Guard */}
          <rect x="4" y="8" width="8" height="2" fill="#F59E0B" />
          <rect x="3" y="8" width="1" height="1" fill="#DC2626" />
          <rect x="12" y="8" width="1" height="1" fill="#DC2626" />
          {/* Hilt */}
          <rect x="7" y="10" width="2" height="3" fill="#B45309" />
          {/* Pommel Gem */}
          <rect x="7" y="13" width="2" height="2" fill="#EF4444" />
        </svg>
      </div>

      {/* Brand Text 『クエスタ』 */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`font-black tracking-wider text-white ${textSize} drop-shadow-md`}>
            クエスタ
          </span>
          <span className="text-[9px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 px-1.5 py-0.5 rounded shadow border border-amber-300">
            QUESTA
          </span>
        </div>
      </div>
    </div>
  );
};
