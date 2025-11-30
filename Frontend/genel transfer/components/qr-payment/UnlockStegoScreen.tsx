import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from './GlassCard';
import { NeonButton } from './NeonButton';
import { Eye, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface UnlockStegoScreenProps {
  amount: string;
  merchantName: string;
  onUnlockSuccess: () => void;
  onCancel: () => void;
}

interface TapPoint {
  x: number;
  y: number;
  id: number;
}

export function UnlockStegoScreen({ amount, merchantName, onUnlockSuccess, onCancel }: UnlockStegoScreenProps) {
  const [taps, setTaps] = useState<TapPoint[]>([]);
  const [showRipple, setShowRipple] = useState<{ x: number; y: number } | null>(null);
  const REQUIRED_TAPS = 3;

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Show ripple effect
    setShowRipple({ x, y });
    setTimeout(() => setShowRipple(null), 600);

    // Add tap point
    if (taps.length < REQUIRED_TAPS) {
      setTaps([...taps, { x, y, id: Date.now() }]);
    }
  };

  const handleConfirm = () => {
    if (taps.length === REQUIRED_TAPS) {
      onUnlockSuccess();
    }
  };

  const handleReset = () => {
    setTaps([]);
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard neonBorder neonColor="pink" className="p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#ec4899]/20 to-[#a855f7]/20 flex items-center justify-center border border-[#f472b6]/30"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(244, 114, 182, 0.3)',
                  '0 0 40px rgba(244, 114, 182, 0.5)',
                  '0 0 20px rgba(244, 114, 182, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Eye className="w-8 h-8 text-[#f472b6]" />
            </motion.div>
            <h2 className="mb-2 bg-gradient-to-r from-[#f472b6] to-[#c084fc] bg-clip-text text-transparent">
              Steganographic Unlock
            </h2>
            <p className="text-white/60 text-sm">Tap your secret pattern to authorize</p>
          </div>

          {/* Payment Info */}
          <div className="text-center mb-6 py-3 bg-white/5 rounded-xl border border-white/10">
            <p className="text-white/50 text-sm">Paying {amount} to {merchantName}</p>
          </div>

          {/* Steganographic Image */}
          <motion.div
            className="relative mb-6 rounded-2xl overflow-hidden border-2 border-[#f472b6]/50 shadow-[0_0_30px_rgba(244,114,182,0.3)] cursor-pointer"
            onClick={handleImageClick}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Image */}
            <div className="relative aspect-square">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1641007820537-ac57e28aa502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGZ1dHVyaXN0aWMlMjBwYXR0ZXJufGVufDF8fHx8MTc2NDQ1NDk3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Steganographic unlock pattern"
                className="w-full h-full object-cover"
              />

              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 via-transparent to-[#06b6d4]/10" />

              {/* Hologram Grid Overlay */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={`grid-${i}`}
                    className="absolute left-0 right-0 h-px bg-[#f472b6]"
                    style={{ top: `${i * 10}%` }}
                  />
                ))}
              </div>

              {/* Tap Points */}
              <AnimatePresence>
                {taps.map((tap) => (
                  <motion.div
                    key={tap.id}
                    className="absolute w-12 h-12 -ml-6 -mt-6 pointer-events-none"
                    style={{ left: `${tap.x}%`, top: `${tap.y}%` }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <div className="w-full h-full rounded-full bg-[#22d3ee]/30 border-2 border-[#22d3ee] shadow-[0_0_20px_rgba(34,211,238,0.6)] flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-[#22d3ee]" />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Ripple Effect */}
              <AnimatePresence>
                {showRipple && (
                  <motion.div
                    className="absolute w-24 h-24 -ml-12 -mt-12 pointer-events-none"
                    style={{ left: `${showRipple.x}%`, top: `${showRipple.y}%` }}
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 2, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-[#22d3ee]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Tap Counter Overlay */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-4 py-2 border border-[#f472b6]/30">
              <p className="text-sm">
                <span className="text-[#22d3ee]">{taps.length}</span>
                <span className="text-white/60"> / {REQUIRED_TAPS}</span>
              </p>
            </div>
          </motion.div>

          {/* Instruction */}
          <motion.div
            className="text-center mb-6 p-4 bg-[#f472b6]/10 rounded-xl border border-[#f472b6]/20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-white/70">
              Tap {REQUIRED_TAPS} points in your secret pattern
            </p>
          </motion.div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <NeonButton
              onClick={handleConfirm}
              disabled={taps.length !== REQUIRED_TAPS}
              size="lg"
              className="w-full"
            >
              Confirm Pattern
            </NeonButton>
            <div className="flex gap-3">
              <NeonButton onClick={handleReset} variant="secondary" size="lg" className="flex-1">
                Reset
              </NeonButton>
              <NeonButton onClick={onCancel} variant="secondary" size="lg" className="flex-1">
                Cancel
              </NeonButton>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
