import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Upload, CheckCircle2 } from 'lucide-react';

interface StegoImageSetupProps {
  onComplete: () => void;
}

interface TapPoint {
  x: number;
  y: number;
  id: number;
}

export function StegoImageSetup({ onComplete }: StegoImageSetupProps) {
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80');
  const [tapPoints, setTapPoints] = useState<TapPoint[]>([]);
  const [showMarkers, setShowMarkers] = useState(true);
  
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tapPoints.length >= 4) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setTapPoints([...tapPoints, { x, y, id: Date.now() }]);
    setShowMarkers(true);
    
    setTimeout(() => {
      if (tapPoints.length === 3) {
        setShowMarkers(false);
      }
    }, 2000);
  };
  
  const handleReset = () => {
    setTapPoints([]);
    setShowMarkers(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 p-6">
      <div className="max-w-2xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="mb-2">Steganographic Image Unlock</h2>
          <p className="text-white/60">
            Choose an image and tap 4 secret locations in sequence
          </p>
        </motion.div>
        
        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-4 mb-6"
        >
          <div 
            className="relative aspect-video rounded-xl overflow-hidden cursor-crosshair"
            onClick={handleImageClick}
          >
            <ImageWithFallback
              src={imageUrl}
              alt="Steganographic unlock image"
              className="w-full h-full object-cover"
            />
            
            {/* Tap points */}
            {showMarkers && tapPoints.map((point, index) => (
              <motion.div
                key={point.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/30 backdrop-blur-sm border-2 border-cyan-400 flex items-center justify-center">
                    <span className="text-white">{index + 1}</span>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}
            
            {/* Instruction overlay */}
            {tapPoints.length === 0 && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                  <p className="text-white/80">Tap 4 secret locations</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Progress */}
          <div className="mt-4 flex gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  i < tapPoints.length
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500'
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Status */}
        {tapPoints.length === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 mb-6 flex items-center gap-3 text-green-400"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Secret pattern saved!</span>
          </motion.div>
        )}
        
        {/* Actions */}
        <div className="flex gap-4">
          <Button variant="secondary" onClick={handleReset} fullWidth>
            Reset Pattern
          </Button>
          <Button 
            onClick={onComplete} 
            fullWidth
            disabled={tapPoints.length < 4}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
