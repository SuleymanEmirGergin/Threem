import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';

interface PaymentProcessingProps {
  onComplete: () => void;
}

export function PaymentProcessing({ onComplete }: PaymentProcessingProps) {
  const [stage, setStage] = useState<'proof' | 'verify' | 'complete'>('proof');
  
  useEffect(() => {
    const timer1 = setTimeout(() => setStage('verify'), 2000);
    const timer2 = setTimeout(() => setStage('complete'), 4000);
    const timer3 = setTimeout(() => onComplete(), 5000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-purple-600/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <div className="relative z-10 max-w-md w-full text-center">
        {/* Spinning Ring Animation */}
        <div className="relative w-64 h-64 mx-auto mb-12">
          {/* Outer spinning ring */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="3"
                strokeDasharray="20 10"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          {/* Inner spinning ring */}
          <motion.div
            className="absolute inset-8"
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="2"
                strokeDasharray="15 15"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
          
          {/* Center Icon */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {stage === 'complete' ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center"
              >
                <CheckCircle2 className="w-16 h-16" />
              </motion.div>
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                <Shield className="w-16 h-16" />
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Status Text */}
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <h3 className="mb-2">
            {stage === 'proof' && 'Generating Zero-Knowledge Proof...'}
            {stage === 'verify' && 'Verifying Proof with Network...'}
            {stage === 'complete' && 'Payment Confirmed!'}
          </h3>
          <p className="text-white/60">
            {stage === 'proof' && 'Creating cryptographic proof of transaction'}
            {stage === 'verify' && 'Validating proof on blockchain'}
            {stage === 'complete' && 'Transaction complete and secure'}
          </p>
        </motion.div>
        
        {/* Progress Steps */}
        <div className="flex justify-center gap-4 mt-12">
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            stage === 'proof' || stage === 'verify' || stage === 'complete' 
              ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
              : 'bg-white/20'
          }`} />
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            stage === 'verify' || stage === 'complete' 
              ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50' 
              : 'bg-white/20'
          }`} />
          <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
            stage === 'complete' 
              ? 'bg-green-400 shadow-lg shadow-green-400/50' 
              : 'bg-white/20'
          }`} />
        </div>
      </div>
    </div>
  );
}
