import React from 'react';
import { motion } from 'motion/react';

interface QRPaymentScanProps {
  onContinue: () => void;
}

export function QRPaymentScan({ onContinue }: QRPaymentScanProps) {
  return (
    <div className="min-h-screen bg-[#f8f8f8] flex flex-col items-center justify-between p-6">
      {/* Header */}
      <motion.div
        className="pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[#1a1a1a] mb-3">Scan QR to Pay</h1>
        <p className="text-[#888] text-sm">
          This payment requires a hidden stego confirmation.
        </p>
      </motion.div>

      {/* Main QR Frame */}
      <div className="flex-1 flex items-center justify-center w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* QR Scanning Frame */}
          <div className="relative w-[280px] h-[280px]">
            {/* Main Border */}
            <div className="absolute inset-0 border border-[#d0d0d0] rounded-3xl bg-white shadow-sm" />

            {/* Corner Markings */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[#2a2a2a] rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-[#2a2a2a] rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-[#2a2a2a] rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[#2a2a2a] rounded-br-lg" />

            {/* Inner Content Area */}
            <div className="absolute inset-4 bg-[#fafafa] rounded-2xl overflow-hidden">
              {/* Simple Scanning Line */}
              <div
                className="absolute left-0 right-0 h-[1px] bg-[#2a2a2a]"
                style={{ top: '50%' }}
              />

              {/* Center Guide Box */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 border border-[#d0d0d0] rounded-lg" />
              </div>
            </div>
          </div>

          {/* Helper Text */}
          <motion.p
            className="text-center text-[#888] text-sm mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Align the QR inside the frame.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="w-full max-w-md space-y-5 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Primary Button */}
        <button
          onClick={onContinue}
          className="w-full py-[18px] px-6 bg-[#2a2a2a] text-white rounded-full hover:bg-[#1a1a1a] transition-colors active:scale-[0.98] transition-transform"
        >
          Continue
        </button>

        {/* Footer */}
        <p className="text-center text-[#aaa] text-xs">
          Enhanced privacy mode enabled.
        </p>
      </motion.div>
    </div>
  );
}
