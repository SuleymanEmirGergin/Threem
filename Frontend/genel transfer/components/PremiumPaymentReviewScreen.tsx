import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Lock, AlertCircle } from 'lucide-react';

interface PremiumPaymentReviewScreenProps {
  onAuthorize: () => void;
  onBack: () => void;
}

export function PremiumPaymentReviewScreen({ onAuthorize, onBack }: PremiumPaymentReviewScreenProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-black">
      {/* Header */}
      <motion.div
        className="relative z-10 pt-12 pb-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="mb-8 p-3 rounded-xl glass-card hover:glass-card-enhanced transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-5 h-5 text-white/60"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
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
            <span className="text-white/70 text-sm font-semibold tracking-wide">SECURE TRANSACTION</span>
          </motion.div>

          <motion.h1
            className="mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Confirm Payment
          </motion.h1>
          <motion.p
            className="text-white/40 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Review transaction details before authorization
          </motion.p>
        </div>
      </motion.div>

      {/* Payment Card */}
      <div className="flex-1 flex items-start justify-center px-6 relative z-10 overflow-y-auto">
        <motion.div
          className="w-full max-w-md pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Main Card */}
          <div className="glass-card-enhanced rounded-3xl p-8 glow-border-strong relative overflow-hidden">
            {/* Subtle Shimmer */}
            <motion.div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent)',
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <div className="relative z-10 space-y-6">
              {/* Amount Display */}
              <motion.div
                className="text-center py-8 border-b border-white/10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-white/40 text-xs font-semibold mb-4 uppercase tracking-widest">
                  Payment Amount
                </p>
                <div className="mb-4">
                  <motion.span
                    className="text-6xl font-bold text-white tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    0.05
                  </motion.span>
                  <motion.span
                    className="text-2xl text-white/50 ml-3 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    ETH
                  </motion.span>
                </div>

                {/* USD Equivalent */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-dark border border-white/10"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse" />
                  <p className="text-white/60 font-medium text-sm">≈ $125.00 USD</p>
                </motion.div>
              </motion.div>

              {/* Transaction Details */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                {/* Recipient */}
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-white/40 font-medium text-sm">Recipient</span>
                  <span className="text-white font-semibold">Coffee Shop</span>
                </div>

                {/* Address */}
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-white/40 font-medium text-sm">Address</span>
                  <div className="px-3 py-1.5 rounded-lg glass-card-dark border border-white/10">
                    <span className="text-white/80 text-sm font-mono">0x742d...8f3c</span>
                  </div>
                </div>

                {/* Network */}
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-white/40 font-medium text-sm">Network</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="text-white/80 font-medium text-sm">Ethereum</span>
                  </div>
                </div>

                {/* Network Fee */}
                <div className="flex justify-between items-center py-3 border-b border-white/5">
                  <span className="text-white/40 font-medium text-sm">Network Fee</span>
                  <span className="text-white/80 font-medium text-sm">0.0003 ETH</span>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-5">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white font-bold text-xl">0.0503 ETH</span>
                </div>
              </motion.div>

              {/* Privacy Badge */}
              <motion.div
                className="mt-6 p-5 rounded-2xl glass-card-dark border border-white/10 relative overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <div className="relative z-10 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                      <Shield className="w-5 h-5 text-white/60" />
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-semibold mb-1 text-sm">Zero-Knowledge Privacy</p>
                    <p className="text-white/50 text-xs leading-relaxed">
                      Transaction secured with ZK proofs. Balance verified without revealing total amount.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="relative z-10 px-6 pb-8 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="max-w-md mx-auto w-full space-y-3">
          {/* Authorize Button */}
          <motion.button
            onClick={onAuthorize}
            className="w-full py-4 px-6 btn-gradient rounded-2xl font-semibold flex items-center justify-center gap-3 tracking-wide"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Lock className="w-5 h-5" />
            <span>Authorize Payment</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Cancel Button */}
          <motion.button
            onClick={onBack}
            className="w-full py-3 text-white/40 hover:text-white/70 transition-colors font-medium text-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Cancel Transaction
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
