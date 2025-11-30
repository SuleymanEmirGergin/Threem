import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CreateWalletConfirmationProps {
  onContinue: () => void;
}

export function CreateWalletConfirmation({ onContinue }: CreateWalletConfirmationProps) {
  const [showCheck, setShowCheck] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowCheck(true), 500);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="relative z-10 max-w-md w-full text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: showCheck ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="mb-8 inline-block relative"
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
            <CheckCircle2 className="w-20 h-20 text-white" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 blur-2xl opacity-50"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="mb-4">Wallet Created!</h2>
          <p className="text-white/60 mb-8">
            Your wallet has been successfully created.<br />
            Let's set up your security methods.
          </p>
          
          <div className="glass-card p-6 mb-8 text-left">
            <p className="text-white/80 mb-2">Your Wallet Address:</p>
            <div className="bg-black/30 p-3 rounded-lg break-all font-mono">
              0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8
            </div>
          </div>
          
          <Button onClick={onContinue} fullWidth>
            Continue to Security Setup
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
