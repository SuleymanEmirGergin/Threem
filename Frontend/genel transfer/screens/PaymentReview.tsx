import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';
import { Store, ArrowRight, Shield, Clock } from 'lucide-react';

interface PaymentReviewProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function PaymentReview({ onConfirm, onCancel }: PaymentReviewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="mb-2">Review Payment</h2>
          <p className="text-white/60">
            Verify the details before confirming
          </p>
        </motion.div>
        
        {/* Merchant Info */}
        <GlassCard neonBorder="purple" className="p-6 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <Store className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h4>Cosmic Coffee</h4>
              <p className="text-white/60">Downtown Location</p>
            </div>
          </div>
          
          {/* Amount */}
          <div className="text-center py-8 border-y border-white/10">
            <p className="text-white/60 mb-2">Amount</p>
            <h1 className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              0.042 ETH
            </h1>
            <p className="text-white/60 mt-2">≈ $85.23</p>
          </div>
          
          {/* Transaction Details */}
          <div className="space-y-4 mt-6">
            <div className="flex justify-between">
              <span className="text-white/60">Network Fee</span>
              <span>0.0008 ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Transaction ID</span>
              <span className="font-mono">0x7f3a...9b2c</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Timestamp</span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Just now
              </span>
            </div>
          </div>
        </GlassCard>
        
        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 mb-6 flex items-center gap-3"
        >
          <Shield className="w-5 h-5 text-cyan-400" />
          <div className="flex-1">
            <p className="text-white/80">Zero-Knowledge Protected</p>
            <p className="text-white/40">Your identity remains private</p>
          </div>
        </motion.div>
        
        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="secondary" onClick={onCancel} fullWidth>
            Cancel
          </Button>
          <Button onClick={onConfirm} fullWidth>
            Confirm Payment
            <ArrowRight className="w-4 h-4 ml-2 inline" />
          </Button>
        </div>
      </div>
    </div>
  );
}
