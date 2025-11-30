import React from 'react';
import { motion } from 'motion/react';

interface PINKeypadProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
}

export function PINKeypad({ onKeyPress, onDelete }: PINKeypadProps) {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'];

  return (
    <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
      {keys.map((key, index) => {
        if (key === '') {
          return <div key={index} />;
        }

        if (key === 'del') {
          return (
            <motion.button
              key={key}
              onClick={onDelete}
              className="h-16 rounded-2xl bg-white/5 border border-white/20 hover:bg-white/10 hover:border-[#ef4444] transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-[#ef4444]">⌫</span>
            </motion.button>
          );
        }

        return (
          <motion.button
            key={key}
            onClick={() => onKeyPress(key)}
            className="h-16 rounded-2xl bg-white/10 border border-[#c084fc]/50 hover:bg-[#c084fc]/20 hover:border-[#c084fc] hover:shadow-[0_0_20px_rgba(192,132,252,0.4)] transition-all duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {key}
          </motion.button>
        );
      })}
    </div>
  );
}
