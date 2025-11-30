import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface StegoImageUnlockProps {
  onUnlock: () => void;
}

interface TapPoint {
  x: number;
  y: number;
  id: number;
}

export function StegoImageUnlock({ onUnlock }: StegoImageUnlockProps) {
  const [tapPoints, setTapPoints] = useState<TapPoint[]>([]);
  
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tapPoints.length >= 4) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newTapPoints = [...tapPoints, { x, y, id: Date.now() }];
    setTapPoints(newTapPoints);
    
    if (newTapPoints.length === 4) {
      setTimeout(() => {
        onUnlock();
      }, 500);
    }
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h3 className="mb-2">Image Pattern Unlock</h3>
        <p className="text-white/60">
          Tap your secret locations ({tapPoints.length}/4)
        </p>
      </motion.div>
      
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-2xl aspect-video rounded-2xl overflow-hidden cursor-pointer"
        onClick={handleImageClick}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
          alt="Unlock image"
          className="w-full h-full object-cover"
        />
        
        {/* Tap Ripples */}
        {tapPoints.map((point) => (
          <motion.div
            key={point.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-cyan-400"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          />
        ))}
        
        {/* Progress Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i < tapPoints.length
                  ? 'bg-cyan-400 shadow-lg shadow-cyan-400/50'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </motion.div>
      
      {/* Reset */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setTapPoints([])}
        className="mt-6 text-white/60 hover:text-white transition-colors"
      >
        Reset Pattern
      </motion.button>
    </div>
  );
}
