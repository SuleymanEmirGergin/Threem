import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, Camera, Scan, Lock } from 'lucide-react';

interface PremiumQRScanScreenProps {
  onContinue: () => void;
  onOpenSettings: () => void;
}

export function PremiumQRScanScreen({ onContinue, onOpenSettings }: PremiumQRScanScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        setIsLoading(true);

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera not supported');
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current?.play();
            setCameraReady(true);
            setIsLoading(false);
            setUseFallback(false);
          };
        }
      } catch (error) {
        setIsLoading(false);
        setUseFallback(true);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-black overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <motion.div
        className="relative z-10 pt-8 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-12">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-white/80" />
            </div>
            <div>
              <h3 className="text-white text-lg font-semibold">ZK Wallet</h3>
              <p className="text-xs text-white/40">Zero-Knowledge</p>
            </div>
          </motion.div>

          {/* Settings Button */}
          <motion.button
            onClick={onOpenSettings}
            className="w-12 h-12 rounded-xl glass-card flex items-center justify-center hover:glass-card-enhanced transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Settings className="w-5 h-5 text-white/60" />
          </motion.button>
        </div>

        {/* Title Section */}
        <div className="text-center mb-8">
          <motion.h1
            className="mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Scan QR Code
          </motion.h1>
          <motion.p
            className="text-white/50 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {cameraReady
              ? 'Position code within the frame'
              : useFallback
              ? 'Camera simulation active'
              : 'Initializing secure camera...'}
          </motion.p>
        </div>
      </motion.div>

      {/* Scanner Frame */}
      <div className="flex-1 flex items-center justify-center px-6 relative z-10">
        <motion.div
          className="relative w-full max-w-[340px] aspect-square"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Main Scanner Container */}
          <div className="relative w-full h-full">
            {/* Glass Frame */}
            <div className="absolute inset-0 glass-card-enhanced rounded-3xl glow-border-strong overflow-hidden">
              {/* Camera Feed or Fallback */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-black">
                {!useFallback && (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}

                {useFallback && (
                  <div className="absolute inset-0 bg-black">
                    {/* Minimal Grid Pattern */}
                    <motion.div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                      }}
                      animate={{
                        backgroundPosition: ['0px 0px', '40px 40px'],
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />

                    {/* Camera Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Camera className="w-32 h-32 text-white" />
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Dark Vignette */}
                {cameraReady && (
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
                )}
              </div>

              {/* Loading State */}
              <AnimatePresence>
                {isLoading && !useFallback && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <motion.div
                        className="w-12 h-12 rounded-full border-2 border-white/10 border-t-white/60"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      <p className="text-white/70 text-sm font-medium">Starting camera...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scanning Line */}
              {(cameraReady || useFallback) && (
                <motion.div
                  className="absolute left-8 right-8 h-[2px] rounded-full z-20"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(0, 255, 127, 0.8) 50%, transparent 100%)',
                    boxShadow: '0 0 20px rgba(0, 255, 127, 0.6), 0 0 40px rgba(0, 255, 127, 0.3)',
                  }}
                  animate={{
                    top: ['15%', '85%', '15%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              )}

              {/* Center Target Frame */}
              {(cameraReady || useFallback) && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="relative w-44 h-44">
                    {/* Animated Border */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-white/40"
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(255, 255, 255, 0.2)',
                          '0 0 20px rgba(0, 255, 127, 0.3)',
                          '0 0 10px rgba(255, 255, 255, 0.2)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Scan Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Scan className="w-8 h-8 text-white/50" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Status Badge */}
              {(cameraReady || useFallback) && (
                <motion.div
                  className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full glass-card-dark border border-white/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className={`w-1.5 h-1.5 rounded-full ${
                        cameraReady ? 'bg-green-400' : 'bg-white/60'
                      }`}
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-white/80 text-xs font-semibold tracking-wide">
                      {cameraReady ? 'LIVE' : 'READY'}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Corner Markers - Minimal */}
            {[
              { position: 'top-2 left-2', rotate: 0 },
              { position: 'top-2 right-2', rotate: 90 },
              { position: 'bottom-2 right-2', rotate: 180 },
              { position: 'bottom-2 left-2', rotate: 270 },
            ].map((corner, index) => (
              <motion.div
                key={index}
                className={`absolute ${corner.position} w-12 h-12 z-30 pointer-events-none`}
                style={{ rotate: corner.rotate }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <div className="relative w-full h-full">
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-white/60 via-white/40 to-transparent" />
                  <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-white/60 via-white/40 to-transparent" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="relative z-10 px-6 pb-8 space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        {/* Primary Button */}
        <motion.button
          onClick={onContinue}
          disabled={isLoading}
          className="w-full py-4 px-6 btn-gradient rounded-2xl font-semibold disabled:opacity-30 disabled:cursor-not-allowed tracking-wide"
          whileHover={{ scale: isLoading ? 1 : 1.02 }}
          whileTap={{ scale: isLoading ? 1 : 0.98 }}
        >
          Continue to Payment
        </motion.button>

        {/* Secondary Actions */}
        <div className="flex items-center justify-between pt-2">
          <motion.button
            className="text-white/40 hover:text-white/70 transition-colors text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enter Manually
          </motion.button>

          <motion.button
            onClick={onOpenSettings}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Security</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}