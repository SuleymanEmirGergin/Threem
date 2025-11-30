import React from 'react';
import { motion } from 'motion/react';

export function ProcessingScreen() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Spinner */}
        <motion.div
          className="w-16 h-16 border-3 border-[#e0e0e0] border-t-[#1a1a1a] rounded-full mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />

        {/* Text */}
        <h2 className="text-[#1a1a1a] mb-3">Processing...</h2>
        <p className="text-[#888] text-sm">
          Generating zero-knowledge proof.
        </p>
      </motion.div>
    </div>
  );
}
