import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PatternAuthorizationScreenProps {
  savedPattern: number[];
  onConfirm: () => void;
  onCancel: () => void;
}

interface Ripple {
  id: number;
  index: number;
}

export function PatternAuthorizationScreen({ savedPattern, onConfirm, onCancel }: PatternAuthorizationScreenProps) {
  const [enteredPattern, setEnteredPattern] = useState<number[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [error, setError] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDotTap = (index: number) => {
    // Don't allow duplicate taps in sequence
    if (enteredPattern.includes(index)) {
      return;
    }

    const newPattern = [...enteredPattern, index];
    setEnteredPattern(newPattern);
    setError('');

    // Create ripple effect
    const newRipple = { id: Date.now(), index };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  // Check pattern when user completes entry
  useEffect(() => {
    if (enteredPattern.length === savedPattern.length) {
      const isMatch = enteredPattern.every((val, idx) => val === savedPattern[idx]);
      
      if (isMatch) {
        setIsCorrect(true);
        setError('');
      } else {
        setError('Incorrect pattern. Try again.');
        // Clear after delay
        setTimeout(() => {
          setEnteredPattern([]);
          setError('');
        }, 1500);
      }
    }
  }, [enteredPattern, savedPattern]);

  const handleClear = () => {
    setEnteredPattern([]);
    setError('');
    setIsCorrect(false);
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
        <h1 className="text-[#1a1a1a] mb-3">Enter Your Pattern</h1>
        <p className="text-[#888] text-sm px-4">
          Tap your secret sequence to authorize this payment.
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
                disabled={isCorrect}
                className="relative w-16 h-16 rounded-full border border-[#d0d0d0] hover:border-[#888] transition-colors bg-white disabled:cursor-not-allowed"
              >
                {/* Show filled state (no numbers during auth) */}
                {enteredPattern.includes(index) && (
                  <motion.div
                    className="absolute inset-2 bg-[#1a1a1a] rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.15 }}
                  />
                )}

                {/* Ripple effects (minimal) */}
                <AnimatePresence>
                  {ripples
                    .filter((r) => r.index === index)
                    .map((ripple) => (
                      <motion.div
                        key={ripple.id}
                        className="absolute inset-0 border border-[#888] rounded-full"
                        initial={{ scale: 1, opacity: 0.4 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />
                    ))}
                </AnimatePresence>
              </button>
            ))}
          </div>

          {/* Status Messages */}
          <div className="mt-6 text-center min-h-[40px]">
            {error && (
              <motion.p
                className="text-red-600 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.p>
            )}
            {isCorrect && (
              <motion.p
                className="text-green-600 text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Pattern verified
              </motion.p>
            )}
            {!error && !isCorrect && enteredPattern.length > 0 && (
              <p className="text-[#888] text-xs">
                {enteredPattern.length} / {savedPattern.length} points
              </p>
            )}
            {enteredPattern.length > 0 && !isCorrect && (
              <button
                onClick={handleClear}
                className="text-[#888] text-xs hover:text-[#666] underline mt-2"
              >
                Clear
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
          onClick={onConfirm}
          disabled={!isCorrect}
          className="w-full py-4 px-6 bg-[#1a1a1a] text-white rounded-full hover:bg-[#2a2a2a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
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
