import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Delete, ArrowLeft, Lock } from 'lucide-react';

interface PINSetupProps {
  onSave: (config: any) => void;
  onBack: () => void;
}

export function PINSetup({ onSave, onBack }: PINSetupProps) {
  const [pin, setPin] = useState<string>('');
  const [confirmPin, setConfirmPin] = useState<string>('');
  const [isConfirming, setIsConfirming] = useState(false);
  const [error, setError] = useState('');

  const maxLength = 6;

  const handleNumberPress = (num: string) => {
    setError('');
    if (isConfirming) {
      if (confirmPin.length < maxLength) {
        setConfirmPin(confirmPin + num);
      }
    } else {
      if (pin.length < maxLength) {
        setPin(pin + num);
      }
    }
  };

  const handleDelete = () => {
    setError('');
    if (isConfirming) {
      setConfirmPin(confirmPin.slice(0, -1));
    } else {
      setPin(pin.slice(0, -1));
    }
  };

  const handleContinue = () => {
    if (!isConfirming && pin.length >= 4) {
      setIsConfirming(true);
    } else if (isConfirming) {
      if (confirmPin === pin) {
        onSave({ type: 'pin', pin });
      } else {
        setError('PINs do not match');
        setConfirmPin('');
      }
    }
  };

  const currentPin = isConfirming ? confirmPin : pin;
  const canContinue = isConfirming ? confirmPin.length >= 4 : pin.length >= 4;

  return (
    <div className="min-h-screen flex flex-col relative bg-black">
      {/* Header */}
      <motion.div
        className="relative z-10 pt-8 pb-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <motion.button
          onClick={isConfirming ? () => { setIsConfirming(false); setConfirmPin(''); setError(''); } : onBack}
          className="mb-8 p-3 rounded-xl glass-card hover:glass-card-enhanced transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-white/60" />
        </motion.button>

        {/* Title */}
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark border border-white/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Lock className="w-4 h-4 text-white/60" />
            <span className="text-white/70 text-sm font-semibold tracking-wide">PIN SETUP</span>
          </motion.div>

          <motion.h1
            className="mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isConfirming ? 'Confirm PIN' : 'Create PIN'}
          </motion.h1>
          <motion.p
            className="text-white/40 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {isConfirming ? 'Re-enter your PIN' : 'Enter 4-6 digits'}
          </motion.p>
        </div>
      </motion.div>

      {/* PIN Display */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {/* PIN Dots */}
          <div className="flex justify-center gap-4 mb-12">
            {Array.from({ length: maxLength }).map((_, index) => (
              <motion.div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index < currentPin.length
                    ? 'bg-white border-2 border-white/20 glow-white'
                    : 'border-2 border-white/20'
                }`}
                animate={index < currentPin.length ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="mb-6 px-4 py-3 rounded-xl status-rejected"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="text-sm text-center font-semibold">{error}</p>
            </motion.div>
          )}

          {/* Keypad */}
          <div className="glass-card-enhanced rounded-3xl p-6 glow-border-strong border border-white/10">
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <motion.button
                  key={num}
                  onClick={() => handleNumberPress(num.toString())}
                  disabled={currentPin.length >= maxLength}
                  className="aspect-square glass-card rounded-xl text-white text-xl font-semibold hover:glass-card-enhanced transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                  whileHover={{ scale: currentPin.length < maxLength ? 1.05 : 1 }}
                  whileTap={{ scale: currentPin.length < maxLength ? 0.95 : 1 }}
                >
                  {num}
                </motion.button>
              ))}
              
              <div /> {/* Empty space */}
              
              <motion.button
                onClick={() => handleNumberPress('0')}
                disabled={currentPin.length >= maxLength}
                className="aspect-square glass-card rounded-xl text-white text-xl font-semibold hover:glass-card-enhanced transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                whileHover={{ scale: currentPin.length < maxLength ? 1.05 : 1 }}
                whileTap={{ scale: currentPin.length < maxLength ? 0.95 : 1 }}
              >
                0
              </motion.button>
              
              <motion.button
                onClick={handleDelete}
                disabled={currentPin.length === 0}
                className="aspect-square glass-card rounded-xl flex items-center justify-center hover:glass-card-enhanced transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10"
                whileHover={{ scale: currentPin.length > 0 ? 1.05 : 1 }}
                whileTap={{ scale: currentPin.length > 0 ? 0.95 : 1 }}
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
        <div className="max-w-md mx-auto">
          <motion.button
            onClick={handleContinue}
            disabled={!canContinue}
            className="w-full py-4 px-6 btn-gradient rounded-2xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed tracking-wide"
            whileHover={{ scale: canContinue ? 1.02 : 1 }}
            whileTap={{ scale: canContinue ? 0.98 : 1 }}
          >
            {isConfirming ? 'Save PIN' : 'Continue'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
