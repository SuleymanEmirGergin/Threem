import { motion } from 'motion/react';
import { PINPad } from '../components/PINPad';
import { Lock } from 'lucide-react';

interface PINUnlockProps {
  onUnlock: () => void;
}

export function PINUnlock({ onUnlock }: PINUnlockProps) {
  const handlePinComplete = (pin: string) => {
    // Simulate PIN verification
    setTimeout(() => {
      onUnlock();
    }, 500);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center"
          >
            <Lock className="w-10 h-10" />
          </motion.div>
          <h2 className="mb-2">Confirm Payment</h2>
          <p className="text-white/60">
            Enter your PIN to authorize the transaction
          </p>
        </motion.div>
        
        <PINPad onComplete={handlePinComplete} title="Enter PIN" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Use different unlock method
          </button>
        </motion.div>
      </div>
    </div>
  );
}
