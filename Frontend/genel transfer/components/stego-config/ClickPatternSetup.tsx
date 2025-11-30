import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ClickPatternSetupProps {
  onSave: (config: any) => void;
  onBack: () => void;
}

interface Ripple {
  id: number;
  index: number;
}

export function ClickPatternSetup({ onSave, onBack }: ClickPatternSetupProps) {
  const [pattern, setPattern] = useState<number[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const gridSize = 3;

  const handleDotTap = (index: number) => {
    if (!pattern.includes(index)) {
      setPattern([...pattern, index]);
    }

    const newRipple = { id: Date.now(), index };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  const handleClear = () => {
    setPattern([]);
  };

  const handleSave = () => {
    if (pattern.length >= 3) {
      onSave({ type: 'click', pattern, gridSize });
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <motion.div
        className="pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white mb-3">Set Your Tap Pattern</h1>
        <p className="text-white/60 text-sm px-4">
          Tap a sequence on the grid (at least 3 points)
        </p>
      </motion.div>

      {/* Pattern Grid */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="glass-card rounded-3xl p-8 glow-border">
            {/* 3x3 Grid */}
            <div className="grid grid-cols-3 gap-5">
              {Array.from({ length: gridSize * gridSize }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotTap(index)}
                  className="relative w-20 h-20 rounded-full bg-white/5 border border-white/20 hover:border-cyan-400/60 transition-all"
                >
                  {/* Show number in sequence */}
                  {pattern.includes(index) && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, type: 'spring' }}
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white">
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
                          className="absolute inset-0 border-2 border-cyan-400 rounded-full"
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

            {/* Pattern Info */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-white/60 text-sm">
                {pattern.length === 0 && 'Tap at least 3 points'}
                {pattern.length > 0 && pattern.length < 3 && `${pattern.length} point${pattern.length === 1 ? '' : 's'} - need ${3 - pattern.length} more`}
                {pattern.length >= 3 && `${pattern.length} points selected`}
              </p>
              {pattern.length > 0 && (
                <button
                  onClick={handleClear}
                  className="text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
                >
                  Clear pattern
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="max-w-md mx-auto w-full space-y-3 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          onClick={handleSave}
          disabled={pattern.length < 3}
          className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all glow-border disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save Tap Pattern
        </button>
        
        <button
          onClick={onBack}
          className="w-full text-white/60 text-sm hover:text-white/80 transition-colors"
        >
          Back
        </button>
      </motion.div>
    </div>
  );
}
