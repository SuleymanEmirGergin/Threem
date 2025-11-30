import React from 'react';
import { motion } from 'motion/react';
import { Lock, Zap, Shield } from 'lucide-react';

export function PremiumProcessingScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-black">
      {/* Main Content */}
      <motion.div
        className="relative z-10 text-center px-6 w-full max-w-md"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Minimal Animated Loader */}
        <div className="relative w-40 h-40 mx-auto mb-12">
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/10"
          />

          {/* Spinning Ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: 'rgba(255, 255, 255, 0.6)',
              borderRightColor: 'rgba(255, 255, 255, 0.3)',
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Inner Pulsing Circle */}
          <motion.div
            className="absolute inset-8 rounded-full glass-card-enhanced flex items-center justify-center"
            animate={{
              boxShadow: [
                '0 0 20px rgba(255, 255, 255, 0.1)',
                '0 0 40px rgba(255, 255, 255, 0.15)',
                '0 0 20px rgba(255, 255, 255, 0.1)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Zap className="w-10 h-10 text-white/80" />
            </motion.div>
          </motion.div>

          {/* Orbiting Dots */}
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 rounded-full bg-white/40"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                rotate: 360,
                x: [0, Math.cos((index * 2 * Math.PI) / 3) * 70],
                y: [0, Math.sin((index * 2 * Math.PI) / 3) * 70],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: index * 0.3,
              }}
            />
          ))}
        </div>

        {/* Title and Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-white mb-3">Processing Payment</h2>
          <p className="text-white/50 mb-8 text-sm">
            Generating zero-knowledge proof...
          </p>
        </motion.div>

        {/* Status Steps - Minimal */}
        <motion.div
          className="space-y-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { icon: Lock, label: 'Verifying credentials', delay: 0 },
            { icon: Shield, label: 'Creating ZK proof', delay: 0.8 },
            { icon: Zap, label: 'Broadcasting transaction', delay: 1.6 },
          ].map((step, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 px-5 py-3 glass-card rounded-2xl border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.15 }}
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: step.delay,
                }}
              >
                <step.icon className="w-4 h-4 text-white/60" />
              </motion.div>
              
              <span className="text-white/70 text-sm font-medium flex-1 text-left">
                {step.label}
              </span>
              
              <motion.div
                className="flex gap-1"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: step.delay,
                }}
              >
                {[0, 1, 2].map((dotIndex) => (
                  <motion.div
                    key={dotIndex}
                    className="w-1 h-1 rounded-full bg-white/60"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: step.delay + dotIndex * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Bar - Minimal */}
        <motion.div
          className="w-full h-1 rounded-full bg-white/5 border border-white/10 overflow-hidden"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full rounded-full bg-white/60"
            style={{
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
            }}
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>

        {/* Security Notice */}
        <motion.div
          className="mt-8 p-4 glass-card-dark rounded-2xl border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center justify-center gap-2 text-white/40 text-xs">
            <Shield className="w-4 h-4" />
            <span>End-to-end encrypted • Privacy preserved</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
