import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ImageStegoAuthProps {
  config: any;
  onConfirm: () => void;
  onCancel: () => void;
}

interface TapPoint {
  x: number;
  y: number;
  id: number;
}

export function ImageStegoAuth({ config, onConfirm, onCancel }: ImageStegoAuthProps) {
  const [enteredPoints, setEnteredPoints] = useState<TapPoint[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState('');

  const imageUrl = config.imageUrl || '';
  const savedPoints = config.tapPoints || [];

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isCorrect || enteredPoints.length >= savedPoints.length) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPoint: TapPoint = { x, y, id: Date.now() };
    setEnteredPoints([...enteredPoints, newPoint]);
    setError('');
  };

  useEffect(() => {
    if (enteredPoints.length === savedPoints.length) {
      // Simple verification - check if points are within tolerance
      let allMatch = true;
      const tolerance = 10; // 10% tolerance

      for (let i = 0; i < savedPoints.length; i++) {
        const saved = savedPoints[i];
        const entered = enteredPoints[i];
        const dx = Math.abs(saved.x - entered.x);
        const dy = Math.abs(saved.y - entered.y);

        if (dx > tolerance || dy > tolerance) {
          allMatch = false;
          break;
        }
      }

      if (allMatch) {
        setIsCorrect(true);
      } else {
        setError('Points do not match. Try again.');
        setTimeout(() => {
          setEnteredPoints([]);
          setError('');
        }, 1500);
      }
    }
  }, [enteredPoints, savedPoints]);

  const handleClear = () => {
    setEnteredPoints([]);
    setError('');
    setIsCorrect(false);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      <motion.div
        className="pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white mb-3">Confirm Your Pattern</h1>
        <p className="text-white/60 text-sm px-4">
          Tap your secret points to authorize
        </p>
      </motion.div>

      <div className="flex-1 flex items-center justify-center">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="glass-card rounded-3xl p-6 glow-border">
            <div
              className="relative aspect-square rounded-2xl overflow-hidden cursor-crosshair"
              onClick={handleImageClick}
            >
              <img src={imageUrl} alt="Stego" className="w-full h-full object-cover" />

              <AnimatePresence>
                {enteredPoints.map((point, index) => (
                  <motion.div
                    key={point.id}
                    className="absolute w-12 h-12"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                  >
                    <div className="absolute inset-0 bg-cyan-400/30 rounded-full blur-sm" />
                    <div className={`absolute inset-2 rounded-full flex items-center justify-center shadow-lg ${
                      isCorrect ? 'bg-gradient-to-br from-green-400 to-green-500' : error ? 'bg-gradient-to-br from-red-400 to-red-500' : 'bg-gradient-to-br from-cyan-400 to-blue-500'
                    }`}>
                      <span className="text-white text-sm">{index + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="mt-4 text-center min-h-[40px]">
              {error && (
                <motion.p className="text-red-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  {error}
                </motion.p>
              )}
              {isCorrect && (
                <motion.p className="text-green-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  Pattern verified!
                </motion.p>
              )}
              {!error && !isCorrect && enteredPoints.length > 0 && (
                <>
                  <p className="text-white/60 text-sm mb-2">
                    {enteredPoints.length} / {savedPoints.length} points
                  </p>
                  <button onClick={handleClear} className="text-cyan-300 text-sm hover:text-cyan-200">
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="max-w-md mx-auto w-full space-y-3 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          onClick={onConfirm}
          disabled={!isCorrect}
          className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all glow-border disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Confirm Payment
        </button>
        
        <button onClick={onCancel} className="w-full text-white/60 text-sm hover:text-white/80 transition-colors">
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
