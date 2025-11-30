import React from 'react';
import { motion } from 'motion/react';

interface PaymentReviewScreenProps {
  onAuthorize: () => void;
  onBack: () => void;
}

export function PaymentReviewScreen({ onAuthorize, onBack }: PaymentReviewScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center p-6">
      {/* Header */}
      <motion.div
        className="pt-16 pb-8 text-center w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[#1a1a1a]">Confirm Payment</h1>
      </motion.div>

      {/* Payment Details Card */}
      <motion.div
        className="w-full max-w-md mt-8 mb-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="bg-white border border-[#e0e0e0] rounded-2xl p-6 space-y-5">
          {/* Amount */}
          <div className="text-center py-4 border-b border-[#f0f0f0]">
            <p className="text-[#888] text-sm mb-1">Amount</p>
            <p className="text-3xl text-[#1a1a1a]">0.05 ETH</p>
            <p className="text-[#999] text-sm mt-1">≈ $125.00 USD</p>
          </div>

          {/* Recipient */}
          <div className="flex justify-between items-center py-3">
            <span className="text-[#888] text-sm">Recipient</span>
            <span className="text-[#1a1a1a] text-sm">Coffee Shop</span>
          </div>

          {/* Address */}
          <div className="flex justify-between items-center py-3">
            <span className="text-[#888] text-sm">Address</span>
            <span className="text-[#1a1a1a] text-sm font-mono">0x742d...8f3c</span>
          </div>

          {/* Network Fee */}
          <div className="flex justify-between items-center py-3">
            <span className="text-[#888] text-sm">Network Fee</span>
            <span className="text-[#1a1a1a] text-sm">0.0003 ETH</span>
          </div>

          {/* Privacy Note */}
          <div className="mt-6 p-4 bg-[#f7f7f7] rounded-xl">
            <p className="text-[#666] text-xs leading-relaxed">
              A zero-knowledge proof will confirm you have sufficient balance without revealing your total balance.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Actions */}
      <motion.div
        className="w-full max-w-md space-y-3 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          onClick={onAuthorize}
          className="w-full py-4 px-6 bg-[#1a1a1a] text-white rounded-full hover:bg-[#2a2a2a] transition-colors"
        >
          Authorize with Pattern
        </button>
        
        <button
          onClick={onBack}
          className="w-full text-[#888] text-sm hover:text-[#666] transition-colors"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
