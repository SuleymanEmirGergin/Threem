import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';
import { XCircle, AlertTriangle } from 'lucide-react';

interface PaymentFailedProps {
  onTryAgain: () => void;
  onCancel: () => void;
}

export function PaymentFailed({ onTryAgain, onCancel }: PaymentFailedProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-purple-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Error glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-red-600/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <div className="relative z-10 max-w-md w-full">
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <XCircle className="w-20 h-20" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 to-orange-500 blur-2xl opacity-50"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="mb-2">Payment Failed</h2>
          <p className="text-white/60">
            The transaction could not be completed
          </p>
        </motion.div>
        
        {/* Error Details */}
        <GlassCard className="p-6 mb-6 border-red-500/30">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h4 className="mb-2 text-red-400">Insufficient Balance</h4>
              <p className="text-white/60">
                Your wallet does not have enough funds to complete this transaction including network fees.
              </p>
            </div>
          </div>
          
          <div className="space-y-3 pt-6 border-t border-white/10">
            <div className="flex justify-between">
              <span className="text-white/60">Required Amount</span>
              <span>0.0428 ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Your Balance</span>
              <span className="text-red-400">0.0320 ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Shortfall</span>
              <span className="text-red-400">0.0108 ETH</span>
            </div>
          </div>
        </GlassCard>
        
        {/* Suggestions */}
        <GlassCard className="p-4 mb-6">
          <p className="text-white/80 mb-2">Suggestions:</p>
          <ul className="text-white/60 space-y-1 list-disc list-inside">
            <li>Add funds to your wallet</li>
            <li>Try a smaller amount</li>
            <li>Check your network connection</li>
          </ul>
        </GlassCard>
        
        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="secondary" onClick={onCancel} fullWidth>
            Cancel
          </Button>
          <Button onClick={onTryAgain} fullWidth>
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
