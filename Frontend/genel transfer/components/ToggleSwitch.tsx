import { motion } from 'motion/react';

interface ToggleSwitchProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export function ToggleSwitch({ enabled, onChange }: ToggleSwitchProps) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
        enabled ? 'bg-gradient-to-r from-purple-600 to-cyan-500' : 'bg-white/10'
      }`}
    >
      <motion.div
        className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg"
        animate={{ x: enabled ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
    </button>
  );
}
