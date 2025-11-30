import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface QRScannerFrameProps {
  onScanComplete?: () => void;
}

export function QRScannerFrame({ onScanComplete }: QRScannerFrameProps) {
  const [scanProgress, setScanProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          if (onScanComplete) {
            setTimeout(onScanComplete, 500);
          }
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [onScanComplete]);
  
  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      {/* Camera preview mockup */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>
      
      {/* Scanning frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-64 h-64">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-cyan-400 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-cyan-400 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-cyan-400 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-cyan-400 rounded-br-2xl" />
          
          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/50"
            animate={{ y: [0, 256, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="cyan" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
            initial={{ width: 0 }}
            animate={{ width: `${scanProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </div>
    </div>
  );
}
