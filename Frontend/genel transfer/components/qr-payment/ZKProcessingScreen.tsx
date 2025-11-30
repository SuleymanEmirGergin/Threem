import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Spinner } from './Spinner';
import { Shield } from 'lucide-react';

interface ZKProcessingScreenProps {
  onProcessingComplete: (success: boolean) => void;
}

const PROCESSING_STEPS = [
  'Initializing zero-knowledge circuit...',
  'Generating cryptographic proof...',
  'Verifying proof with network...',
  'Confirming transaction...',
];

export function ZKProcessingScreen({ onProcessingComplete }: ZKProcessingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 60);

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= PROCESSING_STEPS.length - 1) {
          clearInterval(stepInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);

    // Complete after processing
    const completeTimeout = setTimeout(() => {
      onProcessingComplete(true);
    }, 6000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(completeTimeout);
    };
  }, [onProcessingComplete]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Spinner */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Spinner />
      </motion.div>

      {/* Main Status Text */}
      <motion.h2
        className="mt-12 text-center bg-gradient-to-r from-[#c084fc] via-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Processing Payment
      </motion.h2>

      {/* Current Step */}
      <motion.div
        className="mt-6 text-center"
        key={currentStep}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-white/80">{PROCESSING_STEPS[currentStep]}</p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mt-8 w-full max-w-md">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            className="h-full bg-gradient-to-r from-[#a855f7] via-[#3b82f6] to-[#06b6d4]"
            style={{
              width: `${progress}%`,
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.6)',
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-center text-white/40 text-sm mt-2">{progress}%</p>
      </div>

      {/* Technical Info Card */}
      <motion.div
        className="mt-12 max-w-md bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-[#60a5fa]/30"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-[#22d3ee]/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-[#22d3ee]" />
          </div>
          <div>
            <h3 className="text-white/90 mb-2">Privacy Protected</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Your identity and balance remain completely private. The network verifies your transaction
              without revealing sensitive information.
            </p>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-white/40">Protocol</p>
              <p className="text-[#22d3ee] font-mono mt-1">zkSNARK</p>
            </div>
            <div>
              <p className="text-white/40">Security Level</p>
              <p className="text-[#10b981] mt-1">256-bit</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#c084fc] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
