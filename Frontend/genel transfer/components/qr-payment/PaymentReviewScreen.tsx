import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { NeonButton } from './NeonButton';
import { Lock, Shield, Image, Volume2, Move } from 'lucide-react';

interface PaymentReviewScreenProps {
  amount: string;
  merchantName: string;
  transactionId: string;
  securityMethod: 'pin' | 'stego-image' | 'stego-sound' | 'gesture';
  onConfirm: () => void;
  onCancel: () => void;
}

export function PaymentReviewScreen({
  amount,
  merchantName,
  transactionId,
  securityMethod,
  onConfirm,
  onCancel,
}: PaymentReviewScreenProps) {
  const securityIcons = {
    pin: <Lock className="w-5 h-5" />,
    'stego-image': <Image className="w-5 h-5" />,
    'stego-sound': <Volume2 className="w-5 h-5" />,
    gesture: <Move className="w-5 h-5" />,
  };

  const securityLabels = {
    pin: 'PIN Code',
    'stego-image': 'Steganographic Image',
    'stego-sound': 'Steganographic Sound',
    gesture: 'Motion Gesture',
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
        <GlassCard neonBorder neonColor="purple" className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-white/60 text-sm mb-2">Payment Review</p>
            <h2 className="bg-gradient-to-r from-[#c084fc] to-[#60a5fa] bg-clip-text text-transparent">
              Confirm Transaction
            </h2>
          </div>

          {/* Amount - Large Display */}
          <div className="text-center mb-8 py-6 border-y border-white/10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-white/50 text-sm mb-2">Amount</p>
              <h1 className="bg-gradient-to-r from-[#22d3ee] via-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent">
                {amount}
              </h1>
            </motion.div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4 mb-8">
            <motion.div
              className="flex justify-between items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="text-white/60">Merchant</span>
              <span className="text-white">{merchantName}</span>
            </motion.div>

            <motion.div
              className="flex justify-between items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-white/60">Transaction ID</span>
              <span className="text-white text-sm font-mono">{transactionId}</span>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

          {/* Security Method Indicator */}
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-[#22d3ee]/30 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#22d3ee]/20 flex items-center justify-center text-[#22d3ee]">
                  {securityIcons[securityMethod]}
                </div>
                <div>
                  <p className="text-xs text-white/50">Verification Method</p>
                  <p className="text-white">{securityLabels[securityMethod]}</p>
                </div>
              </div>
              <Shield className="w-5 h-5 text-[#22d3ee]" />
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <NeonButton onClick={onConfirm} size="lg" className="w-full">
              Confirm Payment
            </NeonButton>
            <NeonButton onClick={onCancel} variant="secondary" size="lg" className="w-full">
              Cancel
            </NeonButton>
          </motion.div>

          {/* ZK Proof Notice */}
          <motion.p
            className="text-center text-xs text-white/40 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Protected by zero-knowledge cryptography
          </motion.p>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}
