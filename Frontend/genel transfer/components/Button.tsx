import { motion } from 'motion/react';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '',
  disabled = false,
  fullWidth = false
}: ButtonProps) {
  const baseClasses = "px-6 py-3 rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/50",
    secondary: "glass-card border-2 border-white/20 hover:border-white/40 hover:bg-white/10",
    ghost: "bg-transparent hover:bg-white/5 border border-white/10"
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}
