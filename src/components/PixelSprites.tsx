import React from 'react';

interface HeroSpriteProps {
  isAttacking?: boolean;
  isHurt?: boolean;
  className?: string;
}

export const HeroSprite: React.FC<HeroSpriteProps> = ({ isAttacking, isHurt, className = '' }) => {
  return (
    <div
      className={`relative inline-block transition-transform duration-200 ${
        isAttacking
          ? 'animate-hero-attack'
          : isHurt
          ? 'animate-player-hurt'
          : 'animate-hero-idle'
      } ${className}`}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 16 16"
        className="w-14 h-14 filter drop-shadow-md pixelated"
        style={{ imageRendering: 'pixelated' }}
      >
        {/* Helmet / Hair */}
        <rect x="5" y="1" width="6" height="4" fill="#E11D48" />
        <rect x="6" y="2" width="4" height="2" fill="#FFE4E6" />
        {/* Face */}
        <rect x="5" y="4" width="6" height="3" fill="#FED7AA" />
        {/* Eyes */}
        <rect x="6" y="5" width="1" height="1" fill="#1E293B" />
        <rect x="9" y="5" width="1" height="1" fill="#1E293B" />
        {/* Armor Body */}
        <rect x="4" y="7" width="8" height="5" fill="#2563EB" />
        <rect x="6" y="8" width="4" height="3" fill="#F1F5F9" />
        {/* Shield (Left hand) */}
        <rect x="2" y="7" width="2" height="4" fill="#EAB308" />
        <rect x="2" y="8" width="2" height="2" fill="#B45309" />
        {/* Sword (Right hand) */}
        <rect x="12" y="4" width="2" height="6" fill="#94A3B8" />
        <rect x="11" y="7" width="4" height="1" fill="#475569" />
        <rect x="12" y="3" width="2" height="1" fill="#E0F2FE" />
        {/* Legs / Boots */}
        <rect x="5" y="12" width="2" height="3" fill="#1E293B" />
        <rect x="9" y="12" width="2" height="3" fill="#1E293B" />
      </svg>
    </div>
  );
};

interface MonsterSpriteProps {
  icon?: string;
  isHit?: boolean;
  className?: string;
}

export const MonsterSprite: React.FC<MonsterSpriteProps> = ({ icon = '🐲', isHit, className = '' }) => {
  return (
    <div
      className={`relative inline-block transition-transform duration-300 ${
        isHit ? 'animate-monster-hit' : 'animate-monster-idle'
      } ${className}`}
    >
      <div className="text-5xl filter drop-shadow-lg transform-gpu select-none">
        {icon}
      </div>
    </div>
  );
};
