import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TapPoint {
  id: number;
  x: number;
  y: number;
}

interface StegoUnlockProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function StegoUnlock({ onConfirm, onCancel }: StegoUnlockProps) {
  const [taps, setTaps] = useState<TapPoint[]>([]);

  const handleImageTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newTap = {
      id: Date.now(),
      x,
      y,
    };

    setTaps((prev) => [...prev, newTap]);

    // Remove tap ripple after animation
    setTimeout(() => {
      setTaps((prev) => prev.filter((tap) => tap.id !== newTap.id));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-between p-6">
      {/* Header */}
      <motion.div
        className="pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[#1a1a1a] mb-3">Steganographic Unlock</h1>
        <p className="text-[#888] text-sm">
          Tap the secret pattern to confirm your payment.
        </p>
      </motion.div>

      {/* Main Image Canvas */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Interactive Image */}
          <div
            className="relative w-full h-[260px] rounded-3xl overflow-hidden cursor-pointer bg-white shadow-sm border border-[#e0e0e0]"
            onClick={handleImageTap}
          >
            {/* Image with Vignette */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758551033055-2f60c8c5d963?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1pbmltYWwlMjBncmF5c2NhbGV8ZW58MXx8fHwxNzY0NDU2NzkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Stego pattern"
              className="w-full h-full object-cover grayscale"
            />

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 pointer-events-none" />

            {/* Tap Ripples */}
            <AnimatePresence>
              {taps.map((tap) => (
                <motion.div
                  key={tap.id}
                  className="absolute w-12 h-12 -ml-6 -mt-6 border-2 border-[#2a2a2a] rounded-full pointer-events-none"
                  style={{
                    left: tap.x,
                    top: tap.y,
                  }}
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              ))}
            </AnimatePresence>

            {/* Example Tap Markers (Static for Design) */}
            <div className="absolute top-[35%] left-[30%] w-3 h-3 bg-[#2a2a2a]/20 rounded-full" />
            <div className="absolute top-[55%] right-[25%] w-3 h-3 bg-[#2a2a2a]/20 rounded-full" />
          </div>

          {/* Note Text */}
          <motion.p
            className="text-center text-[#888] text-xs mt-5 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your taps are encoded into a hidden verification signal.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="w-full max-w-md space-y-4 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Primary Button */}
        <button
          onClick={onConfirm}
          className="w-full py-[18px] px-6 bg-[#2a2a2a] text-white rounded-full hover:bg-[#1a1a1a] transition-colors active:scale-[0.98] transition-transform"
        >
          Confirm Payment
        </button>

        {/* Secondary Link */}
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
