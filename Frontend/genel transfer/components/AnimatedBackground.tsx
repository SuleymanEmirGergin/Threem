import React from 'react';
import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(139, 92, 246, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Animated scan line */}
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent"
          animate={{
            y: ['-10%', '110%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      {/* Ambient Glow Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [-20, 20, -20],
          y: [-20, 20, -20],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
          x: [20, -20, 20],
          y: [20, -20, 20],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#06b6d4' : '#10b981',
            boxShadow: `0 0 10px ${i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#06b6d4' : '#10b981'}`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Pulse Rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: '200px',
            height: '200px',
            borderColor: i % 2 === 0 ? 'rgba(139, 92, 246, 0.2)' : 'rgba(6, 182, 212, 0.2)',
            borderWidth: '1px',
          }}
          animate={{
            scale: [1, 3, 3],
            opacity: [0.5, 0, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.3,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Diagonal Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0)" />
          </linearGradient>
        </defs>
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={`line-${i}`}
            x1={`${i * 25}%`}
            y1="0%"
            x2={`${(i + 1) * 25}%`}
            y2="100%"
            stroke="url(#line-gradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Corner Accents */}
      <motion.div
        className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-violet-500/30 rounded-tl-lg"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cyan-500/30 rounded-tr-lg"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0.5,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-emerald-500/30 rounded-bl-lg"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-amber-500/30 rounded-br-lg"
        animate={{
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1.5,
          ease: 'easeInOut',
        }}
      />

      {/* Data Stream Effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`stream-${i}`}
          className="absolute h-20 w-[1px]"
          style={{
            left: `${10 + i * 12}%`,
            background: 'linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.5), transparent)',
          }}
          animate={{
            y: ['-100%', '1000%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
