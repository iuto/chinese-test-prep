import React from 'react';

// 8-bit Retro Pixel Art SVG Sprites Components

// 1. Pixel Hero Knight (Left Platform)
export const PixelKnight: React.FC<{ isAttacking?: boolean; isHit?: boolean }> = ({ isAttacking, isHit }) => (
  <svg
    viewBox="0 0 32 32"
    className={`w-20 h-20 sm:w-28 sm:h-28 transition-transform duration-150 ${
      isAttacking ? 'translate-x-12 scale-110' : ''
    } ${isHit ? 'opacity-40 animate-ping' : ''}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Helmet Feather (Red) */}
    <rect x="13" y="1" width="3" height="4" fill="#E11D48" />
    <rect x="16" y="2" width="2" height="2" fill="#F43F5E" />

    {/* Helmet (Silver) */}
    <rect x="11" y="5" width="10" height="7" fill="#94A3B8" />
    <rect x="12" y="6" width="8" height="5" fill="#CBD5E1" />
    {/* Visor Slit */}
    <rect x="13" y="8" width="6" height="2" fill="#0F172A" />
    <rect x="17" y="8" width="1" height="1" fill="#38BDF8" />

    {/* Body / Armor (Silver & Shield) */}
    <rect x="10" y="12" width="12" height="10" fill="#64748B" />
    <rect x="11" y="13" width="10" height="8" fill="#94A3B8" />

    {/* Gold Shield (Left side / facing right) */}
    <rect x="8" y="13" width="5" height="9" fill="#F59E0B" />
    <rect x="9" y="14" width="3" height="7" fill="#FBBF24" />
    <rect x="10" y="15" width="1" height="5" fill="#FEF08A" />

    {/* Sword (Right side) */}
    <rect x="22" y="7" width="2" height="12" fill="#E2E8F0" />
    <rect x="21" y="10" width="4" height="2" fill="#F59E0B" />
    <rect x="22" y="19" width="2" height="3" fill="#78350F" />

    {/* Legs & Boots (Brown & Steel) */}
    <rect x="11" y="22" width="4" height="6" fill="#475569" />
    <rect x="17" y="22" width="4" height="6" fill="#475569" />
    <rect x="10" y="27" width="5" height="3" fill="#1E293B" />
    <rect x="17" y="27" width="5" height="3" fill="#1E293B" />
  </svg>
);

// 2. Pixel Green Dragon (Right Platform - Inspired by reference image 2)
export const PixelDragon: React.FC<{ isHit?: boolean }> = ({ isHit }) => (
  <svg
    viewBox="0 0 32 32"
    className={`w-24 h-24 sm:w-32 sm:h-32 transition-transform duration-100 ${
      isHit ? 'brightness-200 translate-x-2 animate-bounce' : ''
    }`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Dragon Wings */}
    <rect x="4" y="6" width="8" height="6" fill="#047857" />
    <rect x="2" y="8" width="6" height="4" fill="#10B981" />

    {/* Dragon Head (Facing Left) */}
    <rect x="8" y="5" width="14" height="9" fill="#059669" />
    <rect x="6" y="9" width="10" height="6" fill="#10B981" />
    {/* Eye (Red/Yellow) */}
    <rect x="10" y="7" width="2" height="2" fill="#FEF08A" />
    <rect x="10" y="7" width="1" height="2" fill="#DC2626" />
    {/* Horn */}
    <rect x="18" y="3" width="3" height="4" fill="#F59E0B" />

    {/* Belly & Chest (Orange/Yellow) */}
    <rect x="12" y="13" width="8" height="9" fill="#F59E0B" />
    <rect x="14" y="14" width="5" height="7" fill="#FBBF24" />

    {/* Back Body */}
    <rect x="18" y="11" width="10" height="12" fill="#059669" />

    {/* Tail */}
    <rect x="26" y="19" width="5" height="5" fill="#047857" />
    <rect x="29" y="17" width="3" height="3" fill="#DC2626" />

    {/* Feet / Claws */}
    <rect x="12" y="23" width="5" height="6" fill="#047857" />
    <rect x="21" y="23" width="5" height="6" fill="#047857" />
    <rect x="10" y="27" width="4" height="3" fill="#F59E0B" />
    <rect x="19" y="27" width="4" height="3" fill="#F59E0B" />
  </svg>
);

// 3. Pixel Skeleton Warrior (Inspired by reference image 3)
export const PixelSkeleton: React.FC<{ isHit?: boolean }> = ({ isHit }) => (
  <svg
    viewBox="0 0 32 32"
    className={`w-20 h-20 sm:w-28 sm:h-28 transition-transform duration-100 ${
      isHit ? 'brightness-200 translate-x-2 animate-bounce' : ''
    }`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Skull */}
    <rect x="12" y="4" width="10" height="8" fill="#F8FAFC" />
    {/* Eye Sockets */}
    <rect x="14" y="7" width="2" height="3" fill="#090D16" />
    <rect x="18" y="7" width="2" height="3" fill="#090D16" />
    {/* Glowing Red Eyes */}
    <rect x="14" y="8" width="1" height="1" fill="#EF4444" />
    <rect x="18" y="8" width="1" height="1" fill="#EF4444" />

    {/* Ribcage */}
    <rect x="13" y="12" width="8" height="9" fill="#CBD5E1" />
    <rect x="14" y="13" width="6" height="1" fill="#090D16" />
    <rect x="14" y="15" width="6" height="1" fill="#090D16" />
    <rect x="14" y="17" width="6" height="1" fill="#090D16" />

    {/* Red Shield (Right Hand) */}
    <rect x="20" y="13" width="5" height="9" fill="#991B1B" />
    <rect x="21" y="14" width="3" height="7" fill="#DC2626" />

    {/* Sword (Left Hand facing hero) */}
    <rect x="8" y="8" width="2" height="12" fill="#E2E8F0" />
    <rect x="7" y="11" width="4" height="2" fill="#B91C1C" />

    {/* Bone Legs */}
    <rect x="13" y="21" width="2" height="8" fill="#E2E8F0" />
    <rect x="18" y="21" width="2" height="8" fill="#E2E8F0" />
    <rect x="11" y="27" width="4" height="2" fill="#F8FAFC" />
    <rect x="17" y="27" width="4" height="2" fill="#F8FAFC" />
  </svg>
);

// 4. Pixel Slime Sprite
export const PixelSlime: React.FC<{ isHit?: boolean }> = ({ isHit }) => (
  <svg
    viewBox="0 0 32 32"
    className={`w-20 h-20 sm:w-28 sm:h-28 transition-transform duration-100 ${
      isHit ? 'brightness-200 translate-x-2 animate-bounce' : ''
    }`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Body */}
    <rect x="8" y="12" width="16" height="14" fill="#0284C7" />
    <rect x="6" y="14" width="20" height="10" fill="#38BDF8" />
    <rect x="10" y="10" width="12" height="4" fill="#7DD3FC" />

    {/* Eyes */}
    <rect x="10" y="15" width="3" height="4" fill="#FFFFFF" />
    <rect x="18" y="15" width="3" height="4" fill="#FFFFFF" />
    <rect x="11" y="16" width="2" height="3" fill="#090D16" />
    <rect x="19" y="16" width="2" height="3" fill="#090D16" />
  </svg>
);

// 5. Pixel Wall Torch with Animated Flame
export const PixelTorch: React.FC = () => (
  <div className="flex flex-col items-center">
    <div className="w-3 h-4 bg-amber-500 animate-pulse rounded-t-sm shadow-[0_0_12px_#f59e0b]" />
    <div className="w-2 h-5 bg-yellow-900 border border-amber-950" />
  </div>
);
