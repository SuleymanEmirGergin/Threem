import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface PaymentSuccessScreenProps {
  onDone: () => void;
}

export function PaymentSuccessScreen({ onDone }: PaymentSuccessScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      {/* Success Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Checkmark Icon */}
          <div className="w-20 h-20 rounded-full border-3 border-[#1a1a1a] flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-[#1a1a1a]" strokeWidth={2.5} />
          </div>

          {/* Title */}
          <h1 className="text-[#1a1a1a] mb-4">Payment Successful</h1>
          
          {/* Details */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-[#888] text-sm">0.05 ETH sent to Coffee Shop</p>
            <p className="text-[#999] text-xs">Transaction ID: 0x7a2f...9c8d</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Action */}
      <motion.div
        className="w-full max-w-md pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <button
          onClick={onDone}
          className="w-full py-4 px-6 bg-[#1a1a1a] text-white rounded-full hover:bg-[#2a2a2a] transition-colors"
        >
          Done
        </button>
      </motion.div>
    </div>
  );
}
