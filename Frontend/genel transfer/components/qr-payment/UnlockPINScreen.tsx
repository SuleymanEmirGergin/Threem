import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from './GlassCard';
import { PINKeypad } from './PINKeypad';
import { NeonButton } from './NeonButton';
import { AlertCircle } from 'lucide-react';

interface UnlockPINScreenProps {
  amount: string;
  merchantName: string;
  onUnlockSuccess: () => void;
  onCancel: () => void;
}

export function UnlockPINScreen({ amount, merchantName, onUnlockSuccess, onCancel }: UnlockPINScreenProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const CORRECT_PIN = '1234'; // Mock PIN for demo

  const handleKeyPress = (key: string) => {
    if (pin.length < 6) {
      setPin(pin + key);
      setError(false);
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
    setError(false);
  };

  const handleConfirm = () => {
    if (pin === CORRECT_PIN) {
      onUnlockSuccess();
    } else {
      setError(true);
      setPin('');
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard neonBorder neonColor="cyan" className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#22d3ee]/20 flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                  '0 0 40px rgba(34, 211, 238, 0.5)',
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="text-4xl">🔐</div>
            </motion.div>
            <h2 className="mb-2">Confirm with PIN</h2>
            <p className="text-white/60 text-sm">Enter your PIN to authorize this payment</p>
          </div>

          {/* Payment Info */}
          <div className="text-center mb-6 py-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-white/50 text-sm">Paying to {merchantName}</p>
            <p className="text-[#22d3ee] mt-1">{amount}</p>
          </div>

          {/* PIN Dots Display */}
          <div className="flex justify-center gap-3 mb-8">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`w-3 h-3 rounded-full border-2 ${
                  i < pin.length
                    ? 'bg-[#22d3ee] border-[#22d3ee] shadow-[0_0_10px_rgba(34,211,238,0.5)]'
                    : 'border-white/30'
                } ${error ? 'border-[#ef4444] bg-[#ef4444]/50' : ''}`}
                animate={
                  error
                    ? {
                        x: [-10, 10, -10, 10, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                className="flex items-center justify-center gap-2 text-[#ef4444] text-sm mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircle className="w-4 h-4" />
                <span>Incorrect PIN. Try again.</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* PIN Keypad */}
          <div className="mb-6">
            <PINKeypad onKeyPress={handleKeyPress} onDelete={handleDelete} />
          </div>

          {/* Helper Text */}
          <p className="text-center text-xs text-white/40 mb-6">
            Demo PIN: 1234
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <NeonButton
              onClick={handleConfirm}
              disabled={pin.length === 0}
              size="lg"
              className="w-full"
            >
              Confirm
            </NeonButton>
            <NeonButton onClick={onCancel} variant="secondary" size="lg" className="w-full">
              Cancel
            </NeonButton>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
