import React from 'react';
import { motion } from 'motion/react';

export function Spinner() {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Outer Ring */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#c084fc] border-r-[#60a5fa]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          filter: 'drop-shadow(0 0 10px rgba(168, 85, 247, 0.5))',
        }}
      />

      {/* Middle Ring */}
      <motion.div
        className="absolute inset-3 rounded-full border-4 border-transparent border-b-[#3b82f6] border-l-[#22d3ee]"
        animate={{ rotate: -360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))',
        }}
      />

      {/* Inner Ring */}
      <motion.div
        className="absolute inset-6 rounded-full border-4 border-transparent border-t-[#22d3ee]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.5))',
        }}
      />

      {/* Center Glow */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="w-8 h-8 bg-gradient-to-br from-[#c084fc] to-[#22d3ee] rounded-full blur-md" />
      </motion.div>
    </div>
  );
}
