import React from 'react';
import { motion } from 'motion/react';
import { GlassCard } from './GlassCard';
import { NeonButton } from './NeonButton';
import { CheckCircle2, ExternalLink, Download } from 'lucide-react';

interface PaymentSuccessScreenProps {
  amount: string;
  merchantName: string;
  transactionId: string;
  onDone: () => void;
}

export function PaymentSuccessScreen({ amount, merchantName, transactionId, onDone }: PaymentSuccessScreenProps) {
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
        <GlassCard neonBorder neonColor="cyan" className="p-8">
          {/* Success Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 10 }}
          >
            <div className="relative">
              <motion.div
                className="w-24 h-24 rounded-full bg-gradient-to-br from-[#10b981]/20 to-[#22d3ee]/20 flex items-center justify-center border-2 border-[#22d3ee]"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(34, 211, 238, 0.4)',
                    '0 0 40px rgba(34, 211, 238, 0.6)',
                    '0 0 20px rgba(34, 211, 238, 0.4)',
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <CheckCircle2 className="w-12 h-12 text-[#22d3ee]" />
              </motion.div>

              {/* Expanding Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-[#22d3ee]"
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            className="text-center mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="mb-2 bg-gradient-to-r from-[#10b981] to-[#22d3ee] bg-clip-text text-transparent">
              Payment Successful
            </h2>
            <p className="text-white/60">Your transaction has been verified</p>
          </motion.div>

          {/* Amount Display */}
          <motion.div
            className="text-center py-6 mb-6 bg-white/5 rounded-2xl border border-white/10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white/50 text-sm mb-2">Amount Paid</p>
            <h1 className="bg-gradient-to-r from-[#22d3ee] to-[#60a5fa] bg-clip-text text-transparent">
              {amount}
            </h1>
          </motion.div>

          {/* Transaction Details */}
          <motion.div
            className="space-y-3 mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/60">Merchant</span>
              <span className="text-white">{merchantName}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10">
              <span className="text-white/60">Transaction ID</span>
              <div className="flex items-center gap-2">
                <span className="text-white text-sm font-mono">{transactionId}</span>
                <button className="text-[#60a5fa] hover:text-[#22d3ee] transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-white/60">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
                <span className="text-[#10b981]">Confirmed</span>
              </div>
            </div>
          </motion.div>

          {/* Privacy Badge */}
          <motion.div
            className="mb-8 p-4 bg-gradient-to-r from-[#c084fc]/10 to-[#22d3ee]/10 rounded-xl border border-[#c084fc]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-sm text-center text-white/70">
              ✓ Transaction verified with zero-knowledge proof
              <br />
              <span className="text-white/50">Your privacy is protected</span>
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="space-y-3"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <NeonButton onClick={onDone} size="lg" className="w-full">
              Back to Home
            </NeonButton>
            <NeonButton variant="secondary" size="lg" className="w-full">
              <Download className="w-4 h-4 mr-2 inline" />
              Download Receipt
            </NeonButton>
          </motion.div>
        </GlassCard>
      </motion.div>

      {/* Celebration Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-5%',
              background: ['#22d3ee', '#60a5fa', '#c084fc', '#10b981'][Math.floor(Math.random() * 4)],
            }}
            initial={{ y: 0, opacity: 1, rotate: 0 }}
            animate={{
              y: window.innerHeight + 50,
              opacity: [1, 1, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 0.5,
              ease: 'easeIn',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
