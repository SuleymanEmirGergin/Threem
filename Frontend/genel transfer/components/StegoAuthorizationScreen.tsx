import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StegoAuthorizationScreenProps {
  onConfirm: () => void;
  onCancel: () => void;
}

interface Ripple {
  id: number;
  index: number;
}

export function StegoAuthorizationScreen({ onConfirm, onCancel }: StegoAuthorizationScreenProps) {
  const [selectedDots, setSelectedDots] = useState<number[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleDotTap = (index: number) => {
    // Add to selected pattern
    if (!selectedDots.includes(index)) {
      setSelectedDots([...selectedDots, index]);
    }

    // Create ripple effect
    const newRipple = { id: Date.now(), index };
    setRipples([...ripples, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  const handleClearPattern = () => {
    setSelectedDots([]);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      {/* Header */}
      <motion.div
        className="pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[#1a1a1a] mb-3">Steganographic Authorization</h1>
        <p className="text-[#888] text-sm px-4">
          Reproduce your hidden pattern to confirm this payment.
        </p>
      </motion.div>

      {/* Main Interaction Area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* 3x3 Pattern Grid */}
          <div className="grid grid-cols-3 gap-6 p-8 bg-white border border-[#e0e0e0] rounded-2xl">
            {Array.from({ length: 9 }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotTap(index)}
                className="relative w-16 h-16 rounded-full border-2 border-[#dcdcdc] hover:border-[#999] transition-colors bg-white"
              >
                {/* Selected indicator */}
                {selectedDots.includes(index) && (
                  <motion.div
                    className="absolute inset-2 bg-[#1a1a1a] rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}

                {/* Ripple effects */}
                <AnimatePresence>
                  {ripples
                    .filter((r) => r.index === index)
                    .map((ripple) => (
                      <motion.div
                        key={ripple.id}
                        className="absolute inset-0 border-2 border-[#1a1a1a] rounded-full"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    ))}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Pattern indicator */}
          <div className="mt-6 text-center">
            <p className="text-[#888] text-xs mb-2">
              Pattern: {selectedDots.length} {selectedDots.length === 1 ? 'point' : 'points'}
            </p>
            {selectedDots.length > 0 && (
              <button
                onClick={handleClearPattern}
                className="text-[#888] text-xs hover:text-[#666] underline"
              >
                Clear pattern
              </button>
            )}
          </div>

          {/* Helper Text */}
          <motion.p
            className="text-center text-[#999] text-xs mt-8 max-w-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your pattern is converted into a secure hidden signature.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="w-full max-w-md space-y-3 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          onClick={onConfirm}
          disabled={selectedDots.length === 0}
          className="w-full py-4 px-6 bg-[#1a1a1a] text-white rounded-full hover:bg-[#2a2a2a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm Payment
        </button>
        
        <button
          onClick={onCancel}
          className="w-full text-[#888] text-sm hover:text-[#666] transition-colors"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
