import React from 'react';
import { motion } from 'motion/react';

export function QRScannerFrame() {
  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Glass Frame */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border-2 border-[#c084fc] shadow-[0_0_30px_rgba(168,85,247,0.5)]">
        {/* Corner Accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#22d3ee] rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#22d3ee] rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#22d3ee] rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#22d3ee] rounded-br-3xl" />

        {/* Scanning Grid */}
        <div className="absolute inset-4 opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#60a5fa] to-transparent"
              style={{ top: `${(i + 1) * 12.5}%` }}
            />
          ))}
          {[...Array(8)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#60a5fa] to-transparent"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>

        {/* Animated Scan Line */}
        <motion.div
          className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-[#22d3ee] to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)]"
          animate={{
            top: ['10%', '90%', '10%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Center Target */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 border-2 border-[#22d3ee] rounded-lg"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#c084fc] rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
