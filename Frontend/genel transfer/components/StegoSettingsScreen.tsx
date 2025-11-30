import React from 'react';
import { motion } from 'motion/react';
import { Grid3x3, Image, Hash, AudioLines, PenTool, Settings, Shield, RefreshCw, Trash2, ArrowLeft } from 'lucide-react';
import { StegoType } from './StegoTypeSelectionScreen';

interface StegoSettingsScreenProps {
  currentType: StegoType;
  onReconfigure: () => void;
  onRemoveMethod: () => void;
  onSwitchMethod: (type: StegoType) => void;
  onBack: () => void;
}

interface StegoOption {
  id: StegoType;
  title: string;
  description: string;
  icon: typeof Grid3x3;
}

const stegoOptions: StegoOption[] = [
  {
    id: 'shape',
    title: 'Connection Pattern',
    description: 'Connect dots to create unique pattern',
    icon: Grid3x3,
  },
  {
    id: 'click',
    title: 'Tap Pattern',
    description: '3×3 or 4×4 grid tap sequence',
    icon: PenTool,
  },
  {
    id: 'image',
    title: 'Image-Based Stego',
    description: 'Upload an image & set hidden tap points',
    icon: Image,
  },
  {
    id: 'pin',
    title: 'PIN',
    description: 'Hidden PIN sequence',
    icon: Hash,
  },
  {
    id: 'audio',
    title: 'Audio Pattern',
    description: 'Record audio & save signature',
    icon: AudioLines,
  },
];

export function StegoSettingsScreen({ 
  currentType, 
  onReconfigure, 
  onRemoveMethod, 
  onSwitchMethod,
  onBack 
}: StegoSettingsScreenProps) {
  const currentMethod = stegoOptions.find(opt => opt.id === currentType);
  const otherMethods = stegoOptions.filter(opt => opt.id !== currentType);

  return (
    <div className="min-h-screen flex flex-col relative bg-black">
      {/* Header */}
      <motion.div
        className="relative z-10 pt-8 pb-6 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <motion.button
          onClick={onBack}
          className="mb-8 p-3 rounded-xl glass-card hover:glass-card-enhanced transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 text-white/60" />
        </motion.button>

        {/* Title */}
        <div className="text-center">
          <motion.div
            className="inline-flex items-center gap-3 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Settings className="w-6 h-6 text-white/70" />
            </div>
          </motion.div>
          
          <motion.h1
            className="mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Security Settings
          </motion.h1>
          <motion.p
            className="text-white/40 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Manage steganographic authentication
          </motion.p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 relative z-10">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Current Method Section */}
          {currentType && currentMethod ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-white/60" />
                <h3 className="text-white/70 font-semibold uppercase tracking-wide text-xs">
                  Active Method
                </h3>
              </div>

              {/* Active Method Card */}
              <div className="glass-card-enhanced rounded-3xl p-6 glow-border-strong border border-white/10 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                        <currentMethod.icon className="w-7 h-7 text-white/70" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-white font-semibold text-lg">{currentMethod.title}</h3>
                        <div className="status-approved px-2 py-0.5 rounded-full">
                          <span className="text-xs font-semibold">ACTIVE</span>
                        </div>
                      </div>
                      <p className="text-white/50 text-sm">{currentMethod.description}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      onClick={onReconfigure}
                      className="w-full py-3 px-4 glass-card rounded-xl hover:glass-card-enhanced transition-all duration-300 flex items-center justify-center gap-3 border border-white/10"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <RefreshCw className="w-4 h-4 text-white/60" />
                      <span className="text-white/80 font-semibold">Reconfigure</span>
                    </motion.button>

                    <motion.button
                      onClick={onRemoveMethod}
                      className="w-full py-3 px-4 glass-card-dark rounded-xl hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center gap-3 border border-white/10 hover:border-red-500/30"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 font-semibold">Remove Method</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}

          {/* Other Methods Section */}
          {otherMethods.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {/* Section Label */}
              <div className="flex items-center gap-2 mb-4">
                <Grid3x3 className="w-4 h-4 text-white/60" />
                <h3 className="text-white/70 font-semibold uppercase tracking-wide text-xs">
                  Available Methods
                </h3>
              </div>

              {/* Methods List */}
              <div className="space-y-3">
                {otherMethods.map((method, index) => (
                  <motion.button
                    key={method.id}
                    onClick={() => onSwitchMethod(method.id)}
                    className="w-full p-5 glass-card rounded-2xl hover:glass-card-enhanced transition-all duration-300 border border-white/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                          <method.icon className="w-6 h-6 text-white/60" />
                        </div>
                      </div>

                      {/* Info */}
                      <div className="flex-1 text-left">
                        <h4 className="text-white font-semibold mb-1">{method.title}</h4>
                        <p className="text-white/40 text-sm">{method.description}</p>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0">
                        <motion.div
                          className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center"
                          whileHover={{ x: 4 }}
                        >
                          <svg
                            className="w-4 h-4 text-white/40"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Security Notice */}
          <motion.div
            className="mt-8 p-5 glass-card-dark rounded-2xl border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Shield className="w-5 h-5 text-white/60" />
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-1 text-sm">Steganographic Security</h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  Your authentication method is hidden from observers. Change regularly for maximum security.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
