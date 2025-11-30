import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  neonBorder?: 'purple' | 'blue' | 'cyan' | 'none';
  onClick?: () => void;
}

export function GlassCard({ children, className = '', neonBorder = 'none', onClick }: GlassCardProps) {
  const borderColors = {
    purple: 'border-purple-500/50 shadow-lg shadow-purple-500/20',
    blue: 'border-blue-500/50 shadow-lg shadow-blue-500/20',
    cyan: 'border-cyan-500/50 shadow-lg shadow-cyan-500/20',
    none: 'border-white/10'
  };
  
  const Component = onClick ? motion.div : motion.div;
  
  return (
    <Component
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass-card ${borderColors[neonBorder]} ${className}`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
    >
      {children}
    </Component>
  );
}
