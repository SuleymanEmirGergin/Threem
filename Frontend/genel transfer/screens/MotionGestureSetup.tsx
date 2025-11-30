import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';
import { Move, Circle, Waves, Smartphone } from 'lucide-react';

interface MotionGestureSetupProps {
  onComplete: () => void;
}

type GestureType = 'circle' | 'shake' | 'wave' | null;

export function MotionGestureSetup({ onComplete }: MotionGestureSetupProps) {
  const [selectedGesture, setSelectedGesture] = useState<GestureType>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  
  const gestures = [
    { id: 'circle', name: 'Draw Circle', icon: Circle, description: 'Draw a circle in the air' },
    { id: 'shake', name: 'Shake Pattern', icon: Smartphone, description: 'Shake in a unique pattern' },
    { id: 'wave', name: 'Wave Motion', icon: Waves, description: 'Wave in a specific pattern' }
  ];
  
  const handleRecord = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setRecorded(true);
    }, 3000);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 p-6">
      <div className="max-w-2xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="mb-2">Motion Gesture Unlock</h2>
          <p className="text-white/60">
            Choose a gesture type and record your unique motion pattern
          </p>
        </motion.div>
        
        {/* Gesture Selection */}
        {!selectedGesture && (
          <div className="grid gap-4 mb-8">
            {gestures.map((gesture, index) => {
              const Icon = gesture.icon;
              return (
                <motion.div
                  key={gesture.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard 
                    className="p-6 cursor-pointer"
                    onClick={() => setSelectedGesture(gesture.id as GestureType)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                        <Icon className="w-8 h-8" />
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-1">{gesture.name}</h4>
                        <p className="text-white/60">{gesture.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        )}
        
        {/* Recording View */}
        {selectedGesture && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard className="p-8 mb-8">
              <div className="text-center">
                {/* Motion Visualization */}
                <div className="relative w-64 h-64 mx-auto mb-8">
                  <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                  <div className="absolute inset-8 rounded-full border-2 border-white/10" />
                  <div className="absolute inset-16 rounded-full border-2 border-white/10" />
                  
                  {isRecording && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-cyan-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute top-1/2 left-1/2 w-4 h-4 bg-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2"
                        animate={{
                          x: selectedGesture === 'circle' ? [0, 50, 0, -50, 0] : [0, 20, -20, 0],
                          y: selectedGesture === 'circle' ? [0, 50, 100, 50, 0] : [0, -20, 0, 20, 0]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </>
                  )}
                  
                  {recorded && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
                        <Move className="w-10 h-10" />
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {/* Instructions */}
                <p className="text-white/80 mb-6">
                  {isRecording 
                    ? 'Perform your gesture now...' 
                    : recorded 
                    ? 'Gesture recorded successfully!'
                    : 'Hold your device and tap Record'}
                </p>
                
                {/* Record Button */}
                {!recorded && (
                  <Button 
                    onClick={handleRecord}
                    disabled={isRecording}
                    variant={isRecording ? 'secondary' : 'primary'}
                  >
                    {isRecording ? 'Recording...' : 'Record Gesture'}
                  </Button>
                )}
              </div>
            </GlassCard>
            
            {/* Actions */}
            <div className="flex gap-4">
              <Button 
                variant="secondary" 
                onClick={() => {
                  setSelectedGesture(null);
                  setRecorded(false);
                }} 
                fullWidth
              >
                Choose Different
              </Button>
              <Button 
                onClick={onComplete} 
                fullWidth
                disabled={!recorded}
              >
                Save & Continue
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
