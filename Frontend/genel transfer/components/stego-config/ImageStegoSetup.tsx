import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { unsplash_tool } from '../../tools/unsplash';

interface ImageStegoSetupProps {
  onSave: (config: any) => void;
  onBack: () => void;
}

interface TapPoint {
  x: number;
  y: number;
  id: number;
}

export function ImageStegoSetup({ onSave, onBack }: ImageStegoSetupProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [tapPoints, setTapPoints] = useState<TapPoint[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadSampleImage = async () => {
    setIsLoading(true);
    // Load a neutral abstract image for demonstration
    const sampleUrl = 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80';
    setImageUrl(sampleUrl);
    setIsLoading(false);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageUrl || tapPoints.length >= 5) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPoint: TapPoint = {
      x,
      y,
      id: Date.now(),
    };

    setTapPoints([...tapPoints, newPoint]);
  };

  const handleClear = () => {
    setTapPoints([]);
  };

  const handleSave = () => {
    if (imageUrl && tapPoints.length >= 2) {
      onSave({ type: 'image', imageUrl, tapPoints });
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <motion.div
        className="pt-16 pb-8 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white mb-3">Image-Based Stego</h1>
        <p className="text-white/60 text-sm px-4">
          Upload an image and tap 2-5 secret points
        </p>
      </motion.div>

      {/* Image Area */}
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {!imageUrl ? (
            <div className="glass-card rounded-3xl p-8 glow-border">
              <button
                onClick={handleLoadSampleImage}
                disabled={isLoading}
                className="w-full aspect-square bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center hover:border-cyan-400/60 transition-all"
              >
                <Upload className="w-12 h-12 text-white/40 mb-4" />
                <p className="text-white/60 text-sm">
                  {isLoading ? 'Loading...' : 'Load Sample Image'}
                </p>
                <p className="text-white/40 text-xs mt-2">
                  Click to use a demo image
                </p>
              </button>
            </div>
          ) : (
            <div className="glass-card rounded-3xl p-6 glow-border">
              <div
                className="relative aspect-square rounded-2xl overflow-hidden cursor-crosshair"
                onClick={handleImageClick}
              >
                <img
                  src={imageUrl}
                  alt="Stego"
                  className="w-full h-full object-cover"
                />

                {/* Tap points */}
                <AnimatePresence>
                  {tapPoints.map((point, index) => (
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
                      <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-sm">
                          {index + 1}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Info */}
              <div className="mt-4 text-center space-y-2">
                <p className="text-white/60 text-sm">
                  {tapPoints.length === 0 && 'Tap 2-5 secret points on the image'}
                  {tapPoints.length === 1 && '1 point - tap at least 1 more'}
                  {tapPoints.length >= 2 && tapPoints.length < 5 && `${tapPoints.length} points selected`}
                  {tapPoints.length === 5 && 'Maximum 5 points reached'}
                </p>
                {tapPoints.length > 0 && (
                  <button
                    onClick={handleClear}
                    className="text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
                  >
                    Clear points
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="max-w-md mx-auto w-full space-y-3 pb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          onClick={handleSave}
          disabled={!imageUrl || tapPoints.length < 2}
          className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all glow-border disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save Image Pattern
        </button>
        
        <button
          onClick={onBack}
          className="w-full text-white/60 text-sm hover:text-white/80 transition-colors"
        >
          Back
        </button>
      </motion.div>
    </div>
  );
}
