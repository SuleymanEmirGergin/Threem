import React from 'react';
import { motion } from 'motion/react';
import { Check, Download, Share2, ExternalLink } from 'lucide-react';

interface PremiumSuccessScreenProps {
  onDone: () => void;
}

export function PremiumSuccessScreen({ onDone }: PremiumSuccessScreenProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-black">
      {/* Success Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Icon Animation */}
          <motion.div
            className="relative mb-12"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              duration: 0.6,
            }}
          >
            {/* Outer Pulse Rings */}
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid rgba(0, 255, 127, 0.3)',
                }}
                animate={{
                  scale: [1, 2.5],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.4,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Success Circle - Neon Green */}
            <motion.div
              className="relative w-32 h-32 rounded-full mx-auto glow-green"
              style={{
                background: 'linear-gradient(135deg, #00ff7f 0%, #00e676 100%)',
              }}
              animate={{
                boxShadow: [
                  '0 0 30px rgba(0, 255, 127, 0.4)',
                  '0 0 50px rgba(0, 255, 127, 0.6)',
                  '0 0 30px rgba(0, 255, 127, 0.4)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Inner Circle */}
              <div className="absolute inset-2 rounded-full bg-black/20" />

              {/* Checkmark */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3,
                  type: 'spring',
                  stiffness: 200,
                  damping: 10,
                }}
              >
                <Check className="w-16 h-16 text-black" strokeWidth={3} />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Success Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h1 className="mb-3 neon-text-green">Payment Complete</h1>
            <p className="text-white/50">
              Transaction confirmed successfully
            </p>
          </motion.div>

          {/* Transaction Details Card */}
          <motion.div
            className="mt-10 glass-card-enhanced rounded-3xl p-6 glow-border relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="relative z-10 space-y-4">
              {/* Amount */}
              <div className="pb-4 border-b border-white/10">
                <p className="text-white/40 text-xs font-semibold mb-3 uppercase tracking-widest">
                  Amount Sent
                </p>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-4xl font-bold text-white">0.05</span>
                  <span className="text-xl text-white/60 font-semibold">ETH</span>
                </div>
                <p className="text-white/40 text-sm mt-2">≈ $125.00 USD</p>
              </div>

              {/* Details */}
              <div className="space-y-3 py-2">
                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm font-medium">Recipient</span>
                  <span className="text-white font-semibold">Coffee Shop</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm font-medium">Network Fee</span>
                  <span className="text-white/80 font-medium">0.0003 ETH</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-white/40 text-sm font-medium">Network</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    <span className="text-white/80 font-medium text-sm">Ethereum</span>
                  </div>
                </div>
              </div>

              {/* Transaction Hash */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                    Transaction ID
                  </span>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full status-approved">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-green-400"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-xs font-semibold">CONFIRMED</span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4 py-2.5 rounded-xl glass-card-dark border border-white/10">
                  <span className="text-white/70 text-sm font-mono">0x7a2f...9c8d</span>
                  <button className="text-white/40 hover:text-white/70 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="mt-6 flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              className="flex-1 p-4 glass-card rounded-2xl hover:glass-card-enhanced transition-all duration-300 flex items-center justify-center gap-2 border border-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-5 h-5 text-white/60" />
              <span className="text-white/70 font-semibold">Receipt</span>
            </motion.button>

            <motion.button
              className="flex-1 p-4 glass-card rounded-2xl hover:glass-card-enhanced transition-all duration-300 flex items-center justify-center gap-2 border border-white/10"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Share2 className="w-5 h-5 text-white/60" />
              <span className="text-white/70 font-semibold">Share</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Action */}
      <motion.div
        className="relative z-10 px-6 pb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-md mx-auto">
          <motion.button
            onClick={onDone}
            className="w-full py-4 px-6 btn-gradient rounded-2xl font-semibold tracking-wide"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back to Wallet
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
