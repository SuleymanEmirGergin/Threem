import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Move } from 'lucide-react';

interface MotionUnlockProps {
  onUnlock: () => void;
}

export function MotionUnlock({ onUnlock }: MotionUnlockProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => onUnlock(), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 30);
      
      return () => clearInterval(interval);
    }
  }, [isRecording, onUnlock]);
  
  const handleStart = () => {
    setIsRecording(true);
    setProgress(0);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="relative z-10 max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="mb-2">Motion Gesture Unlock</h2>
          <p className="text-white/60">
            {isRecording ? 'Perform your gesture now!' : 'Tap to start gesture recognition'}
          </p>
        </motion.div>
        
        {/* Motion Visualization */}
        <motion.div
          className="relative w-80 h-80 mx-auto mb-12"
          onClick={!isRecording ? handleStart : undefined}
        >
          {/* Outer rings */}
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-8 rounded-full border-2 border-white/10" />
          <div className="absolute inset-16 rounded-full border-2 border-white/10" />
          
          {/* Center icon */}
          <motion.div
            animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${
              isRecording 
                ? 'bg-gradient-to-br from-purple-500 to-cyan-500' 
                : 'bg-white/10 cursor-pointer'
            }`}>
              <Move className="w-12 h-12" />
            </div>
          </motion.div>
          
          {/* Animated pulse rings */}
          {isRecording && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-cyan-400"
                animate={{ scale: [1, 1.3, 1.6], opacity: [0.8, 0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-purple-400"
                animate={{ scale: [1, 1.3, 1.6], opacity: [0.8, 0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              
              {/* Moving dot */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-cyan-400/50"
                animate={{
                  x: [0, 80, 0, -80, 0],
                  y: [0, 80, 160, 80, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </>
          )}
          
          {/* Progress ring */}
          {isRecording && (
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="48%"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="4"
                strokeDasharray={`${progress * 9.42} 942`}
                className="transition-all duration-100"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          )}
        </motion.div>
        
        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isRecording ? (
            <p className="text-cyan-400">{progress.toFixed(0)}% Complete</p>
          ) : (
            <button className="text-white/60 hover:text-white transition-colors">
              Use different unlock method
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
