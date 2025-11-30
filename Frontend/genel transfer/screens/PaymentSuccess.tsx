import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';
import { CheckCircle2, Share2, Download } from 'lucide-react';

interface PaymentSuccessProps {
  onBackToHome: () => void;
}

export function PaymentSuccess({ onBackToHome }: PaymentSuccessProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/20 to-cyan-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Success glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 bg-green-600/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      <div className="relative z-10 max-w-md w-full">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center">
              <CheckCircle2 className="w-20 h-20" />
            </div>
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500 to-cyan-500 blur-2xl opacity-50"
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
          <h2 className="mb-2">Payment Successful!</h2>
          <p className="text-white/60">
            Your transaction has been confirmed
          </p>
        </motion.div>
        
        {/* Transaction Details */}
        <GlassCard neonBorder="cyan" className="p-6 mb-6">
          <div className="text-center mb-6 pb-6 border-b border-white/10">
            <p className="text-white/60 mb-2">Amount Sent</p>
            <h3 className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              0.042 ETH
            </h3>
            <p className="text-white/60 mt-1">≈ $85.23</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-white/60">To</span>
              <span>Cosmic Coffee</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Network Fee</span>
              <span>0.0008 ETH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Transaction Hash</span>
              <span className="font-mono text-cyan-400">0x7f3a...9b2c</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/60">Status</span>
              <span className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
                Confirmed
              </span>
            </div>
          </div>
        </GlassCard>
        
        {/* Actions */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Button variant="secondary" fullWidth>
            <Share2 className="w-4 h-4 mr-2 inline" />
            Share
          </Button>
          <Button variant="secondary" fullWidth>
            <Download className="w-4 h-4 mr-2 inline" />
            Receipt
          </Button>
        </div>
        
        <Button onClick={onBackToHome} fullWidth>
          Back to Home
        </Button>
      </div>
    </div>
  );
}
