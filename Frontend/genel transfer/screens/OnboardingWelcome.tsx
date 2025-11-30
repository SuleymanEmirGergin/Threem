import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { Shield, Lock, Eye } from 'lucide-react';

interface OnboardingWelcomeProps {
  onGetStarted: () => void;
}

export function OnboardingWelcome({ onGetStarted }: OnboardingWelcomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background blurs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-md w-full text-center">
        {/* Hero Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1 }}
          className="mb-8 inline-block relative"
        >
          <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-0.5">
            <div className="w-full h-full bg-gray-900 rounded-3xl flex items-center justify-center">
              <Shield className="w-16 h-16 text-cyan-400" />
            </div>
          </div>
          <motion.div
            className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 blur-2xl opacity-50"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            ZKrypt Wallet
          </h1>
          <p className="text-white/60 mb-2">
            Zero-knowledge protected.<br />You own your privacy.
          </p>
        </motion.div>
        
        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-6 justify-center my-12"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Lock className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-white/60">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-white/60">Private</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <Eye className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="text-white/60">Anonymous</span>
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Button onClick={onGetStarted} fullWidth>
            Create Wallet
          </Button>
          <p className="text-white/40 mt-6">
            By continuing, you agree to our{' '}
            <span className="text-cyan-400 cursor-pointer hover:underline">Terms</span>
            {' '}and{' '}
            <span className="text-cyan-400 cursor-pointer hover:underline">Privacy Policy</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
