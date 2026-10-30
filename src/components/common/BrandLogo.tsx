import React from 'react';
import { Link } from 'react-router-dom';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  to?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ size = 'md', showTagline = false, to = '/' }) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-base tracking-wider',
    md: 'text-lg tracking-wider',
    lg: 'text-2xl tracking-wider',
  };

  const content = (
    <div className="flex items-center gap-3 group">
      <div className={`relative flex items-center justify-center ${iconSizes[size]}`}>
        {/* Verification Lens Mark */}
        <div className="absolute inset-0 rounded-full border border-[#00FF87]/40 dark:border-[#00FF87]/50 group-hover:border-[#00FF87] transition-colors" />
        <div className="absolute inset-[3px] rounded-full border border-dashed border-[#00FF87]/20 group-hover:rotate-45 transition-transform duration-500" />
        {/* Center precision aperture lens */}
        <div className="w-2.5 h-2.5 rounded-full bg-[#00FF87] shadow-[0_0_10px_#00FF87]" />
        {/* Peripheral optical focus tick */}
        <div className="absolute -top-0.5 w-1 h-1 rounded-full bg-[#00FF87]" />
      </div>

      <div className="flex flex-col">
        <span className={`font-bold font-mono-code uppercase text-[#111827] dark:text-[#F3F4F6] ${textSizes[size]}`}>
          DONOR<span className="text-[#059669] dark:text-[#00FF87] ml-1">LENS</span>
        </span>
        {showTagline && (
          <span className="text-[10px] tracking-tight text-gray-500 dark:text-neutral-400 font-sans">
            See where every contribution goes.
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-flex items-center hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
};
