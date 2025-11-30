import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Mic, MicOff, CheckCircle2 } from 'lucide-react';

interface StegoSoundSetupProps {
  onComplete: () => void;
}

export function StegoSoundSetup({ onComplete }: StegoSoundSetupProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [waveformBars, setWaveformBars] = useState<number[]>(Array(40).fill(10));
  
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setWaveformBars(prev => 
          prev.map(() => Math.random() * 80 + 20)
        );
      }, 50);
      
      return () => clearInterval(interval);
    } else {
      setWaveformBars(Array(40).fill(10));
    }
  }, [isRecording]);
  
  const handleRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecorded(true);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="relative z-10 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="mb-2">Sound Pattern Unlock</h2>
          <p className="text-white/60">
            Record a unique sound pattern (voice, whistle, tap rhythm)
          </p>
        </motion.div>
        
        {/* Waveform Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex items-end justify-center gap-1 h-48 mb-8">
            {waveformBars.map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-full bg-gradient-to-t from-purple-500 via-blue-500 to-cyan-400"
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  minHeight: '10%',
                  boxShadow: isRecording ? '0 0 10px rgba(6, 182, 212, 0.5)' : 'none'
                }}
              />
            ))}
          </div>
          
          {/* Recording Button */}
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRecord}
              disabled={isRecording || recorded}
              className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording
                  ? 'bg-red-500 shadow-lg shadow-red-500/50'
                  : recorded
                  ? 'bg-green-500 shadow-lg shadow-green-500/50'
                  : 'bg-gradient-to-br from-purple-600 to-cyan-500 shadow-lg shadow-purple-500/50'
              }`}
            >
              {recorded ? (
                <CheckCircle2 className="w-12 h-12" />
              ) : isRecording ? (
                <MicOff className="w-12 h-12" />
              ) : (
                <Mic className="w-12 h-12" />
              )}
            </motion.button>
          </div>
          
          {/* Status Text */}
          <p className="text-center mt-6 text-white/60">
            {isRecording ? 'Recording...' : recorded ? 'Pattern recorded!' : 'Tap to record'}
          </p>
        </motion.div>
        
        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="glass-card p-4 text-center">
            <p className="text-white/60 mb-1">Duration</p>
            <p>2-3 sec</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-white/60 mb-1">Quality</p>
            <p>High</p>
          </div>
          <div className="glass-card p-4 text-center">
            <p className="text-white/60 mb-1">Encrypted</p>
            <p>Yes</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-4">
          <Button 
            variant="secondary" 
            onClick={() => setRecorded(false)} 
            fullWidth
            disabled={!recorded}
          >
            Record Again
          </Button>
          <Button 
            onClick={onComplete} 
            fullWidth
            disabled={!recorded}
          >
            Save & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
