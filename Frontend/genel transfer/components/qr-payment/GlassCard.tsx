import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  neonBorder?: boolean;
  neonColor?: 'purple' | 'blue' | 'cyan' | 'pink';
}

export function GlassCard({ children, className = '', neonBorder = false, neonColor = 'purple' }: GlassCardProps) {
  const neonColors = {
    purple: 'shadow-[0_0_20px_rgba(168,85,247,0.4)]',
    blue: 'shadow-[0_0_20px_rgba(59,130,246,0.4)]',
    cyan: 'shadow-[0_0_20px_rgba(6,182,212,0.4)]',
    pink: 'shadow-[0_0_20px_rgba(244,114,182,0.4)]',
  };

  const borderColors = {
    purple: 'border-[#c084fc]',
    blue: 'border-[#60a5fa]',
    cyan: 'border-[#22d3ee]',
    pink: 'border-[#f472b6]',
  };

  return (
    <div
      className={`
        bg-white/10 backdrop-blur-xl rounded-3xl 
        border ${neonBorder ? `${borderColors[neonColor]} ${neonColors[neonColor]}` : 'border-white/20'}
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        ${className}
      `}
    >
      {children}
    </div>
  );
}
