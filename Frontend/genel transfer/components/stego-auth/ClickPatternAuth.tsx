import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ClickPatternAuthProps {
  config: any;
  onConfirm: () => void;
  onCancel: () => void;
}

interface Ripple {
  id: number;
  index: number;
}

export function ClickPatternAuth({ config, onConfirm, onCancel }: ClickPatternAuthProps) {
  const [enteredPattern, setEnteredPattern] = useState<number[]>([]);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const gridSize = config.gridSize || 3;
  const savedPattern = config.pattern || [];

  const handleDotTap = (index: number) => {
    if (enteredPattern.includes(index) || isCorrect) return;

    const newPattern = [...enteredPattern, index];
    setEnteredPattern(newPattern);
    setError('');

    const newRipple = { id: Date.now(), index };
    setRipples([...ripples, newRipple]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 800);
  };

  useEffect(() => {
    if (enteredPattern.length === savedPattern.length) {
      const isMatch = enteredPattern.every((val, idx) => val === savedPattern[idx]);
      
      if (isMatch) {
        setIsCorrect(true);
        setError('');
      } else {
        setError('Incorrect pattern. Try again.');
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
    <div className="min-h-screen flex flex-col p-6">
      <motion.div
        className="pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white mb-3">Confirm Your Pattern</h1>
        <p className="text-white/60 text-sm px-4">
          Tap your sequence to authorize payment
        </p>
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="glass-card rounded-3xl p-8 glow-border">
            <div className="grid grid-cols-3 gap-5">
              {Array.from({ length: gridSize * gridSize }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotTap(index)}
                  disabled={isCorrect}
                  className="relative w-20 h-20 rounded-full bg-white/5 border border-white/20 hover:border-cyan-400/60 transition-all disabled:cursor-not-allowed"
                >
                  {enteredPattern.includes(index) && (
                    <motion.div
                      className="absolute inset-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}

                  <AnimatePresence>
                    {ripples.filter((r) => r.index === index).map((ripple) => (
                      <motion.div
                        key={ripple.id}
                        className="absolute inset-0 border-2 border-cyan-400 rounded-full"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 2, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      />
                    ))}
                  </AnimatePresence>
                </button>
              ))}
            </div>

            <div className="mt-6 text-center min-h-[40px]">
              {error && (
                <motion.p className="text-red-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {error}
                </motion.p>
              )}
              {isCorrect && (
                <motion.p className="text-green-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Pattern verified!
                </motion.p>
              )}
              {!error && !isCorrect && enteredPattern.length > 0 && (
                <>
                  <p className="text-white/60 text-sm mb-2">
                    {enteredPattern.length} / {savedPattern.length} points
                  </p>
                  <button onClick={handleClear} className="text-cyan-300 text-sm hover:text-cyan-200">
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="max-w-md mx-auto w-full space-y-3 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          onClick={onConfirm}
          disabled={!isCorrect}
          className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all glow-border disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm Payment
        </button>
        
        <button onClick={onCancel} className="w-full text-white/60 text-sm hover:text-white/80 transition-colors">
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
