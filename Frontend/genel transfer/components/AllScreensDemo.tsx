import React from 'react';
import { motion } from 'motion/react';

interface AllScreensDemoProps {
  onSelectScreen: (screen: string) => void;
}

const screens = [
  { id: 'stego-selection', name: 'Stego Selection (Optional)', color: 'from-purple-500 to-pink-500' },
  { id: 'stego-config', name: 'Stego Configuration', color: 'from-blue-500 to-cyan-500' },
  { id: 'qr-scan', name: 'QR Scan (Premium)', color: 'from-cyan-500 to-teal-500' },
  { id: 'payment-review', name: 'Payment Review', color: 'from-teal-500 to-green-500' },
  { id: 'stego-auth', name: 'Stego Authorization', color: 'from-green-500 to-emerald-500' },
  { id: 'processing', name: 'Processing', color: 'from-yellow-500 to-orange-500' },
  { id: 'success', name: 'Success', color: 'from-emerald-500 to-green-600' },
  { id: 'stego-settings', name: 'Stego Settings (NEW)', color: 'from-indigo-500 to-purple-500' },
];

export function AllScreensDemo({ onSelectScreen }: AllScreensDemoProps) {
  return (
    <div className="min-h-screen p-6">
      <motion.div
        className="text-center pt-16 pb-12"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-white mb-3">Premium QR Payment Flow</h1>
        <p className="text-white/60 text-sm">
          Complete 8-screen system with Stego Management
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
        {screens.map((screen, index) => (
          <motion.button
            key={screen.id}
            onClick={() => onSelectScreen(screen.id)}
            className="glass-card rounded-2xl p-6 hover:bg-white/10 transition-all text-center group"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${screen.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
              <span className="text-white text-xl">{index + 1}</span>
            </div>
            <h3 className="text-white text-sm mb-1">{screen.name}</h3>
            {screen.id === 'stego-settings' && (
              <span className="text-cyan-400 text-xs">★ Key Screen</span>
            )}
          </motion.button>
        ))}
      </div>

      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-white/40 text-xs">
          Click any screen to view it
        </p>
      </motion.div>
    </div>
  );
}
