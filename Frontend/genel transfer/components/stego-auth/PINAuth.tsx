import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Delete, Lock, Check, X } from 'lucide-react';

interface PINAuthProps {
  config: any;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PINAuth({ config, onConfirm, onCancel }: PINAuthProps) {
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [error, setError] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const savedPin = config.pin || '';
  const maxLength = savedPin.length;

  const handleNumberPress = (num: string) => {
    setError('');
    if (enteredPin.length < maxLength) {
      setEnteredPin(enteredPin + num);
    }
  };

  const handleDelete = () => {
    setError('');
    setEnteredPin(enteredPin.slice(0, -1));
  };

  useEffect(() => {
    if (enteredPin.length === maxLength) {
      if (enteredPin === savedPin) {
        setIsCorrect(true);
        setError('');
      } else {
        setError('Incorrect PIN');
        setTimeout(() => {
          setEnteredPin('');
          setError('');
        }, 1500);
      }
    }
  }, [enteredPin, savedPin, maxLength]);

  return (
    <div className="min-h-screen flex flex-col relative bg-black">
      {/* Header */}
      <motion.div
        className="relative z-10 pt-12 pb-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark border border-white/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Lock className="w-4 h-4 text-white/60" />
            <span className="text-white/70 text-sm font-semibold tracking-wide">AUTHORIZATION</span>
          </motion.div>

          <motion.h1
            className="mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Enter PIN
          </motion.h1>
          <motion.p
            className="text-white/40 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Confirm your identity to authorize payment
          </motion.p>
        </div>
      </motion.div>

      {/* PIN Input */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* PIN Dots */}
          <div className="flex justify-center gap-4 mb-8">
            {Array.from({ length: maxLength }).map((_, index) => (
              <motion.div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index < enteredPin.length
                    ? isCorrect
                      ? 'bg-green-400 border-2 border-green-400/20 glow-green'
                      : error
                      ? 'bg-red-400 border-2 border-red-400/20 glow-red'
                      : 'bg-white border-2 border-white/20 glow-white'
                    : 'border-2 border-white/20'
                }`}
                animate={index < enteredPin.length ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>

          {/* Status Messages */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                className="mb-6 px-4 py-3 rounded-xl status-rejected flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <X className="w-4 h-4" />
                <p className="text-sm font-semibold">{error}</p>
              </motion.div>
            )}
            {isCorrect && (
              <motion.div
                key="success"
                className="mb-6 px-4 py-3 rounded-xl status-approved flex items-center justify-center gap-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Check className="w-4 h-4" />
                <p className="text-sm font-semibold">PIN Verified</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keypad */}
          <div className="glass-card-enhanced rounded-3xl p-6 glow-border-strong border border-white/10">
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  onClick={() => handleNumberPress(num.toString())}
                  disabled={enteredPin.length >= maxLength || isCorrect}
                  className="aspect-square glass-card rounded-xl text-white text-xl font-semibold hover:glass-card-enhanced transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                  whileHover={{ scale: enteredPin.length < maxLength && !isCorrect ? 1.05 : 1 }}
                  whileTap={{ scale: enteredPin.length < maxLength && !isCorrect ? 0.95 : 1 }}
                >
                  {num}
                </motion.button>
              ))}
              
              <div />
              
              <motion.button
                onClick={() => handleNumberPress('0')}
                disabled={enteredPin.length >= maxLength || isCorrect}
                className="aspect-square glass-card rounded-xl text-white text-xl font-semibold hover:glass-card-enhanced transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                whileHover={{ scale: enteredPin.length < maxLength && !isCorrect ? 1.05 : 1 }}
                whileTap={{ scale: enteredPin.length < maxLength && !isCorrect ? 0.95 : 1 }}
              >
                0
              </motion.button>
              
              <motion.button
                onClick={handleDelete}
                disabled={enteredPin.length === 0 || isCorrect}
                className="aspect-square glass-card rounded-xl flex items-center justify-center hover:glass-card-enhanced transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                whileHover={{ scale: enteredPin.length > 0 && !isCorrect ? 1.05 : 1 }}
                whileTap={{ scale: enteredPin.length > 0 && !isCorrect ? 0.95 : 1 }}
              >
                <Delete className="w-6 h-6 text-white/70" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="relative z-10 px-6 pb-8 space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="max-w-md mx-auto space-y-3">
          <motion.button
            onClick={onConfirm}
            disabled={!isCorrect}
            className="w-full py-4 px-6 btn-gradient rounded-2xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed tracking-wide"
            whileHover={{ scale: isCorrect ? 1.02 : 1 }}
            whileTap={{ scale: isCorrect ? 0.98 : 1 }}
          >
            Confirm Payment
          </motion.button>
          
          <motion.button
            onClick={onCancel}
            className="w-full py-3 text-white/40 hover:text-white/70 transition-colors font-medium text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
