import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { Mic, Volume2 } from 'lucide-react';

interface StegoSoundUnlockProps {
  onUnlock: () => void;
}

export function StegoSoundUnlock({ onUnlock }: StegoSoundUnlockProps) {
  const [isListening, setIsListening] = useState(false);
  const [waveformBars, setWaveformBars] = useState<number[]>(Array(40).fill(10));
  
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setWaveformBars(prev => 
          prev.map(() => Math.random() * 80 + 20)
        );
      }, 50);
      
      return () => clearInterval(interval);
    } else {
      setWaveformBars(Array(40).fill(10));
    }
  }, [isListening]);
  
  const handleListen = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      onUnlock();
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="relative z-10 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ scale: isListening ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
            className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center"
          >
            {isListening ? <Volume2 className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
          </motion.div>
          <h2 className="mb-2">Sound Pattern Unlock</h2>
          <p className="text-white/60">
            {isListening ? 'Listening to your pattern...' : 'Reproduce your sound pattern'}
          </p>
        </motion.div>
        
        {/* Waveform */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-end justify-center gap-1 h-48">
            {waveformBars.map((height, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-full bg-gradient-to-t from-cyan-500 via-blue-500 to-purple-400"
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.1 }}
                style={{
                  minHeight: '10%',
                  boxShadow: isListening ? '0 0 10px rgba(6, 182, 212, 0.5)' : 'none'
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Listen Button */}
        <div className="flex justify-center">
          <Button 
            onClick={handleListen}
            disabled={isListening}
            variant={isListening ? 'secondary' : 'primary'}
          >
            {isListening ? (
              <>
                <Volume2 className="w-5 h-5 mr-2 animate-pulse" />
                Listening...
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Start Recording
              </>
            )}
          </Button>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Use different unlock method
          </button>
        </motion.div>
      </div>
    </div>
  );
}
