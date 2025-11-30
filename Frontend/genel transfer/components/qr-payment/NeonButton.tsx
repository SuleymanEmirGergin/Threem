import React from 'react';
import { motion } from 'motion/react';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function NeonButton({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '' 
}: NeonButtonProps) {
  const variants = {
    primary: 'bg-gradient-to-r from-[#a855f7] to-[#3b82f6] shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]',
    secondary: 'bg-white/10 border border-white/20 hover:bg-white/15 hover:border-[#c084fc]',
    danger: 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4',
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-full
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </motion.button>
  );
}
