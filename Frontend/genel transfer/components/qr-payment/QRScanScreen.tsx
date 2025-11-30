import React from 'react';
import { motion } from 'motion/react';
import { QRScannerFrame } from './QRScannerFrame';
import { NeonButton } from './NeonButton';

interface QRScanScreenProps {
  onScanComplete: () => void;
}

export function QRScanScreen({ onScanComplete }: QRScanScreenProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="mb-4 bg-gradient-to-r from-[#c084fc] via-[#60a5fa] to-[#22d3ee] bg-clip-text text-transparent">
          Scan QR to Pay
        </h1>
        <p className="text-white/60">
          Position the merchant QR code within the frame
        </p>
      </motion.div>

      {/* Scanner Frame */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <QRScannerFrame />
      </motion.div>

      {/* Helper Text */}
      <motion.div
        className="mt-12 max-w-md text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-[#60a5fa]/30">
          <p className="text-sm text-white/70">
            🔒 This payment will be verified using{' '}
            <span className="text-[#22d3ee]">zero-knowledge proofs</span>.
            Your identity and balance remain private.
          </p>
        </div>
      </motion.div>

      {/* Dev Button */}
      <motion.div
        className="mt-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <NeonButton onClick={onScanComplete}>
          Simulate QR Scan
        </NeonButton>
      </motion.div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 bg-gradient-to-br from-[#a855f7]/10 to-[#06b6d4]/10 rounded-full blur-3xl"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 25}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
