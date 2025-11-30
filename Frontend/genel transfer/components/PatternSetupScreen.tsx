import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PatternSetupScreenProps {
  onSave: (pattern: number[]) => void;
  onCancel: () => void;
}

interface Ripple {
  id: number;
  index: number;
}

export function PatternSetupScreen({ onSave, onCancel }: PatternSetupScreenProps) {
  const [pattern, setPattern] = useState<number[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleDotTap = (index: number) => {
    // Add to pattern if not already selected
    if (!pattern.includes(index)) {
      setPattern([...pattern, index]);
    }

    // Create ripple effect
    const newRipple = { id: Date.now(), index };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  const handleClear = () => {
    setPattern([]);
  };

  const handleSave = () => {
    if (pattern.length >= 3) {
      onSave(pattern);
    }
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
        <h1 className="text-[#1a1a1a] mb-3">Create Your Secret Pattern</h1>
        <p className="text-[#888] text-sm px-4">
          Tap a sequence on the grid. This will be your hidden authorization pattern.
        </p>
      </motion.div>

      {/* Pattern Grid */}
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* 3x3 Grid */}
          <div className="grid grid-cols-3 gap-6 p-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotTap(index)}
                className="relative w-16 h-16 rounded-full border border-[#d0d0d0] hover:border-[#888] transition-colors bg-white"
              >
                {/* Show number in sequence */}
                {pattern.includes(index) && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-10 h-10 bg-[#1a1a1a] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">
                        {pattern.indexOf(index) + 1}
                      </span>
                    </div>
                  </motion.div>
                )}

                {/* Ripple effects */}
                <AnimatePresence>
                  {ripples
                    .filter((r) => r.index === index)
                    .map((ripple) => (
                      <motion.div
                        key={ripple.id}
                        className="absolute inset-0 border border-[#888] rounded-full"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.8, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    ))}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Pattern Info */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-[#888] text-xs">
              {pattern.length === 0 && 'Tap at least 3 points'}
              {pattern.length > 0 && pattern.length < 3 && `${pattern.length} point${pattern.length === 1 ? '' : 's'} - need ${3 - pattern.length} more`}
              {pattern.length >= 3 && `${pattern.length} points selected`}
            </p>
            {pattern.length > 0 && (
              <button
                onClick={handleClear}
                className="text-[#888] text-xs hover:text-[#666] underline"
              >
                Clear and start over
              </button>
            )}
          </div>
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
          onClick={handleSave}
          disabled={pattern.length < 3}
          className="w-full py-4 px-6 bg-[#1a1a1a] text-white rounded-full hover:bg-[#2a2a2a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Save Pattern
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
