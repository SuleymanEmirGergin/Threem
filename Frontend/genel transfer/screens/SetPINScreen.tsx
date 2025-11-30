import { motion } from 'motion/react';
import { useState } from 'react';
import { PINPad } from '../components/PINPad';
import { Shield } from 'lucide-react';

interface SetPINScreenProps {
  onComplete: (pin: string) => void;
}

export function SetPINScreen({ onComplete }: SetPINScreenProps) {
  const [step, setStep] = useState<'create' | 'confirm'>('create');
  const [firstPin, setFirstPin] = useState('');
  
  const handleFirstPin = (pin: string) => {
    setFirstPin(pin);
    setTimeout(() => setStep('confirm'), 300);
  };
  
  const handleConfirmPin = (pin: string) => {
    if (pin === firstPin) {
      onComplete(pin);
    } else {
      alert('PINs do not match. Please try again.');
      setStep('create');
      setFirstPin('');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="relative z-10 max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
            <Shield className="w-10 h-10" />
          </div>
          <h2 className="mb-2">
            {step === 'create' ? 'Create Your PIN' : 'Confirm Your PIN'}
          </h2>
          <p className="text-white/60">
            {step === 'create' 
              ? 'Choose a 6-digit PIN for secure payments'
              : 'Enter your PIN again to confirm'}
          </p>
        </motion.div>
        
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <PINPad
            onComplete={step === 'create' ? handleFirstPin : handleConfirmPin}
            title={step === 'create' ? 'Enter PIN' : 'Confirm PIN'}
          />
        </motion.div>
        
        {/* Security indicators */}
        <div className="mt-12 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 shadow-lg shadow-green-400/50" />
            <span className="text-white/60">Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50" />
            <span className="text-white/60">Zero-Knowledge</span>
          </div>
        </div>
      </div>
    </div>
  );
}
