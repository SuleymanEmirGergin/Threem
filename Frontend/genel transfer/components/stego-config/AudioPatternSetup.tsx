import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, Square } from 'lucide-react';

interface AudioPatternSetupProps {
  onSave: (config: any) => void;
  onBack: () => void;
}

export function AudioPatternSetup({ onSave, onBack }: AudioPatternSetupProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>([]);

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setHasRecorded(true);
    } else {
      // Start recording
      setIsRecording(true);
      setHasRecorded(false);
      
      // Simulate waveform data
      const interval = setInterval(() => {
        setWaveformData((prev) => {
          if (prev.length > 50) return prev;
          return [...prev, Math.random() * 100];
        });
      }, 50);

      setTimeout(() => {
        clearInterval(interval);
      }, 3000);
    }
  };

  const handleClear = () => {
    setWaveformData([]);
    setHasRecorded(false);
  };

  const handleSave = () => {
    if (hasRecorded) {
      onSave({ type: 'audio', waveform: waveformData });
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
        <h1 className="text-white mb-3">Record Audio Pattern</h1>
        <p className="text-white/60 text-sm px-4">
          Record a short audio pattern (2-3 seconds)
        </p>
      </motion.div>

      {/* Recording Area */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="glass-card rounded-3xl p-8 glow-border">
            {/* Waveform Display */}
            <div className="h-32 bg-white/5 rounded-2xl mb-8 flex items-end justify-center gap-1 px-4 overflow-hidden">
              {waveformData.length > 0 ? (
                waveformData.map((height, index) => (
                  <motion.div
                    key={index}
                    className="w-1 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-full"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.1 }}
                  />
                ))
              ) : (
                <p className="text-white/40 text-sm mb-8">
                  {isRecording ? 'Recording...' : 'Waveform will appear here'}
                </p>
              )}
            </div>

            {/* Record Button */}
            <div className="flex justify-center">
              <button
                onClick={handleRecord}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-400'
                    : 'bg-gradient-to-br from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 glow-border'
                }`}
              >
                {isRecording ? (
                  <Square className="w-8 h-8 text-white" fill="white" />
                ) : (
                  <Mic className="w-8 h-8 text-white" />
                )}
              </button>
            </div>

            <p className="text-center text-white/60 text-sm mt-4">
              {isRecording
                ? 'Tap to stop recording'
                : hasRecorded
                ? 'Recording complete'
                : 'Tap to start recording'}
            </p>

            {hasRecorded && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleClear}
                  className="text-cyan-300 text-sm hover:text-cyan-200 transition-colors"
                >
                  Clear & re-record
                </button>
              </div>
            )}
          </div>
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
          disabled={!hasRecorded}
          className="w-full py-4 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-400 hover:to-blue-400 transition-all glow-border disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save Audio Pattern
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
