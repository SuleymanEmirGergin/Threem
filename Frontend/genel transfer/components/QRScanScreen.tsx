import React from 'react';
import { motion } from 'motion/react';

interface QRScanScreenProps {
  onContinue: () => void;
}

export function QRScanScreen({ onContinue }: QRScanScreenProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between p-6">
      {/* Header */}
      <motion.div
        className="pt-16 pb-12 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[#1a1a1a] mb-2">Scan QR to Pay</h1>
        <p className="text-[#888] text-sm">
          Align the QR code inside the frame.
        </p>
      </motion.div>

      {/* QR Frame */}
      <div className="flex-1 flex items-center justify-center w-full">
        <motion.div
          className="relative w-[300px] h-[300px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Main Frame */}
          <div className="absolute inset-0 border-2 border-[#dcdcdc] rounded-xl overflow-hidden bg-[#fafafa]">
            {/* Inner camera blur effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 opacity-60" />
            
            {/* Static scanning line */}
            <div className="absolute left-8 right-8 h-[1px] bg-[#999]" style={{ top: '50%' }} />
            
            {/* Center guide box */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 border border-[#dcdcdc] rounded-lg" />
            </div>
          </div>

          {/* Corner markers */}
          <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-[#1a1a1a] rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-[#1a1a1a] rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-[#1a1a1a] rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-[#1a1a1a] rounded-br-lg" />
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="w-full max-w-md space-y-4 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          onClick={onContinue}
          className="w-full py-4 px-6 bg-[#1a1a1a] text-white rounded-full hover:bg-[#2a2a2a] transition-colors"
        >
          Continue
        </button>
        
        <button className="w-full text-[#888] text-sm hover:text-[#666] transition-colors">
          Enter manually
        </button>
      </motion.div>
    </div>
  );
}
