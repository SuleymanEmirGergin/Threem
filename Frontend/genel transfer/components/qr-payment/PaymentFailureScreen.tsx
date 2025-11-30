import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { NeonButton } from './NeonButton';
import { XCircle, AlertTriangle, RotateCcw } from 'lucide-react';

interface PaymentFailureScreenProps {
  amount: string;
  merchantName: string;
  errorReason?: string;
  onTryAgain: () => void;
  onCancel: () => void;
}

export function PaymentFailureScreen({
  amount,
  merchantName,
  errorReason = 'Proof verification failed',
  onTryAgain,
  onCancel,
}: PaymentFailureScreenProps) {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
      >
        <GlassCard neonBorder neonColor="pink" className="p-8 border-[#ef4444]">
          {/* Error Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-full bg-[#ef4444]/20 flex items-center justify-center border-2 border-[#ef4444]"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(239, 68, 68, 0.4)',
                    '0 0 40px rgba(239, 68, 68, 0.6)',
                    '0 0 20px rgba(239, 68, 68, 0.4)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <XCircle className="w-12 h-12 text-[#ef4444]" />
              </motion.div>

              {/* Pulsing Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#ef4444]"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.3, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-2 text-[#ef4444]">Payment Failed</h2>
            <p className="text-white/60">Unable to complete your transaction</p>
          </motion.div>

          {/* Error Reason */}
          <motion.div
            className="mb-6 p-4 bg-[#ef4444]/10 rounded-2xl border border-[#ef4444]/30"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-[#ef4444] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white/90 mb-1">Error Details</p>
                <p className="text-sm text-white/60">{errorReason}</p>
              </div>
            </div>
          </motion.div>

          {/* Transaction Details */}
          <motion.div
            className="mb-8 space-y-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/60">Merchant</span>
              <span className="text-white">{merchantName}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/60">Attempted Amount</span>
              <span className="text-white">{amount}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-white/60">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#ef4444] shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
                <span className="text-[#ef4444]">Failed</span>
              </div>
            </div>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            className="mb-8 p-4 bg-white/5 rounded-xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-white/70 mb-2">Possible solutions:</p>
            <ul className="text-sm text-white/60 space-y-1 ml-4">
              <li className="list-disc">Check your network connection</li>
              <li className="list-disc">Verify your account balance</li>
              <li className="list-disc">Try again in a few moments</li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <NeonButton onClick={onTryAgain} size="lg" className="w-full">
              <RotateCcw className="w-4 h-4 mr-2 inline" />
              Try Again
            </NeonButton>
            <NeonButton onClick={onCancel} variant="secondary" size="lg" className="w-full">
              Cancel Payment
            </NeonButton>
          </motion.div>

          {/* Support Link */}
          <motion.p
            className="text-center text-xs text-white/40 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Need help?{' '}
            <button className="text-[#60a5fa] hover:text-[#22d3ee] underline transition-colors">
              Contact Support
            </button>
          </motion.p>
        </GlassCard>
      </motion.div>

      {/* Error Particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#ef4444] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
