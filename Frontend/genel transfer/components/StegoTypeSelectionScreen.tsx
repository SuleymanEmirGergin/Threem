import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Grid3x3, Image, Hash, AudioLines, PenTool, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { CryptoWalletBackground } from './CryptoWalletBackground';

export type StegoType = 'shape' | 'click' | 'image' | 'pin' | 'audio' | null;

interface StegoTypeSelectionScreenProps {
  onContinue: (type: StegoType) => void;
}

interface StegoOption {
  id: StegoType;
  title: string;
  description: string;
  icon: typeof Grid3x3;
  color: string;
  gradient: string;
}

const stegoOptions: StegoOption[] = [
  {
    id: 'shape',
    title: 'Pattern',
    description: 'Connect dots',
    icon: Grid3x3,
    color: '#8b5cf6',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    id: 'click',
    title: 'Tap Grid',
    description: 'Tap sequence',
    icon: PenTool,
    color: '#3b82f6',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    id: 'image',
    title: 'Image',
    description: 'Hidden points',
    icon: Image,
    color: '#06b6d4',
    gradient: 'from-cyan-500/20 to-teal-500/20',
  },
  {
    id: 'pin',
    title: 'PIN',
    description: 'Digit code',
    icon: Hash,
    color: '#10b981',
    gradient: 'from-emerald-500/20 to-green-500/20',
  },
  {
    id: 'audio',
    title: 'Voice',
    description: 'Audio pattern',
    icon: AudioLines,
    color: '#f59e0b',
    gradient: 'from-amber-500/20 to-orange-500/20',
  },
];

export function StegoTypeSelectionScreen({ onContinue }: StegoTypeSelectionScreenProps) {
  const [ghostModeEnabled, setGhostModeEnabled] = useState(false);
  const [selectedType, setSelectedType] = useState<StegoType>(null);
  const [additionalType, setAdditionalType] = useState<StegoType>(null);

  const handleMethodSelect = (type: StegoType) => {
    if (ghostModeEnabled) {
      // Ghost mode: Pattern is always selected, select additional method
      if (type === 'shape') return; // Pattern is locked
      setAdditionalType(additionalType === type ? null : type);
    } else {
      // Normal mode: single selection
      setSelectedType(selectedType === type ? null : type);
      setAdditionalType(null);
    }
  };

  const isMethodSelected = (type: StegoType) => {
    if (ghostModeEnabled) {
      return type === 'shape' || type === additionalType;
    }
    return type === selectedType;
  };

  const canContinue = () => {
    if (ghostModeEnabled) return additionalType !== null; // Need pattern + 1 additional
    return selectedType !== null; // Need 1 selection
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-black overflow-hidden">
      {/* Ambient Background Effects */}
      <CryptoWalletBackground />

      {/* Header */}
      <motion.div
        className="relative z-10 pt-16 pb-8 px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          {/* Logo/Badge */}
          <motion.div
            className="inline-flex items-center justify-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-2xl blur-xl opacity-50" />
              <div className="relative w-16 h-16 rounded-2xl glass-card-enhanced border border-white/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            className="mb-3 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Security Method
          </motion.h1>
          <motion.p
            className="text-white/50 text-sm px-4 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Choose your steganographic protection
          </motion.p>
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-white/60 text-xs font-medium">Zero-Knowledge Security</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Methods Grid */}
      <div className="flex-1 flex items-center justify-center px-6 pb-6 relative z-10">
        <motion.div
          className="max-w-lg mx-auto w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {/* Toggle Controls */}
          <div className="mb-6 space-y-3">
            {/* Ghost Mode Toggle */}
            <motion.div
              className="glass-card-enhanced rounded-2xl p-4 border border-white/20"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl glass-card flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">Ghost Mode</h4>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setGhostModeEnabled(!ghostModeEnabled);
                    if (!ghostModeEnabled) {
                      setSelectedType(null);
                      setAdditionalType(null);
                    }
                  }}
                  className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                    ghostModeEnabled ? 'bg-gradient-to-r from-violet-500 to-purple-500' : 'bg-white/10'
                  }`}
                >
                  <motion.div
                    className="absolute top-1 w-6 h-6 rounded-full bg-white shadow-lg"
                    animate={{ left: ghostModeEnabled ? '28px' : '4px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Custom Layout: 3 top, 2 bottom */}
          <div className="flex flex-col items-center gap-4 mb-6">
            {/* Top Row - 3 items */}
            <div className="flex gap-4 justify-center">
              {stegoOptions.slice(0, 3).map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleMethodSelect(option.id)}
                  className={`relative group`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isMethodSelected(option.id)
                      ? 'glass-card-enhanced border-white/30'
                      : 'glass-card border-white/10 hover:border-white/20'
                  }`}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Selected Glow */}
                    {isMethodSelected(option.id) && (
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          boxShadow: `0 0 30px ${option.color}40, inset 0 0 30px ${option.color}15`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Content */}
                    <div className="relative p-6 flex flex-col items-center w-28">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                        isMethodSelected(option.id)
                          ? 'glass-card-enhanced'
                          : 'glass-card'
                      }`}
                      style={{
                        backgroundColor: isMethodSelected(option.id) ? `${option.color}20` : undefined,
                      }}>
                        <option.icon 
                          className="w-7 h-7 transition-colors duration-300" 
                          style={{ 
                            color: isMethodSelected(option.id) ? option.color : 'rgba(255,255,255,0.6)' 
                          }}
                        />
                      </div>
                      
                      {/* Title */}
                      <h3 className={`font-bold text-sm transition-colors duration-300 text-center leading-tight ${
                        isMethodSelected(option.id) ? 'text-white' : 'text-white/80'
                      }`}>
                        {option.title}
                      </h3>
                      
                      {/* Check Indicator */}
                      {isMethodSelected(option.id) && (
                        <motion.div
                          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${option.color}30`, border: `1.5px solid ${option.color}` }}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: option.color }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          />
                        </motion.div>
                      )}
                      
                      {/* Ghost Mode Lock Indicator */}
                      {ghostModeEnabled && option.id === 'shape' && (
                        <motion.div
                          className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center bg-violet-500/30 border border-violet-400"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Sparkles className="w-3 h-3 text-violet-400" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Bottom Row - 2 items */}
            <div className="flex gap-4 justify-center">
              {stegoOptions.slice(3, 5).map((option, index) => (
                <motion.button
                  key={option.id}
                  onClick={() => handleMethodSelect(option.id)}
                  className={`relative group`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + (index + 3) * 0.08, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
                    isMethodSelected(option.id)
                      ? 'glass-card-enhanced border-white/30'
                      : 'glass-card border-white/10 hover:border-white/20'
                  }`}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Selected Glow */}
                    {isMethodSelected(option.id) && (
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          boxShadow: `0 0 30px ${option.color}40, inset 0 0 30px ${option.color}15`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    {/* Content */}
                    <div className="relative p-6 flex flex-col items-center w-28">
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                        isMethodSelected(option.id)
                          ? 'glass-card-enhanced'
                          : 'glass-card'
                      }`}
                      style={{
                        backgroundColor: isMethodSelected(option.id) ? `${option.color}20` : undefined,
                      }}>
                        <option.icon 
                          className="w-7 h-7 transition-colors duration-300" 
                          style={{ 
                            color: isMethodSelected(option.id) ? option.color : 'rgba(255,255,255,0.6)' 
                          }}
                        />
                      </div>
                      
                      {/* Title */}
                      <h3 className={`font-bold text-sm transition-colors duration-300 text-center leading-tight ${
                        isMethodSelected(option.id) ? 'text-white' : 'text-white/80'
                      }`}>
                        {option.title}
                      </h3>
                      
                      {/* Check Indicator */}
                      {isMethodSelected(option.id) && (
                        <motion.div
                          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${option.color}30`, border: `1.5px solid ${option.color}` }}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: option.color }}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.1 }}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Selected Method Details */}
          {selectedType && (
            <motion.div
              className="glass-card-enhanced rounded-2xl p-5 border border-white/20"
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${stegoOptions.find(o => o.id === selectedType)?.color}20`,
                  }}
                >
                  {React.createElement(
                    stegoOptions.find(o => o.id === selectedType)?.icon || Shield,
                    { 
                      className: "w-5 h-5",
                      style: { color: stegoOptions.find(o => o.id === selectedType)?.color }
                    }
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-semibold text-sm mb-0.5">
                    {stegoOptions.find(o => o.id === selectedType)?.title}
                  </h4>
                  <p className="text-white/50 text-xs">
                    Selected as your security method
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="relative z-10 px-6 pb-8 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="w-full max-w-md space-y-3">
          {/* Continue Button */}
          <motion.button
            onClick={() => onContinue(selectedType)}
            disabled={!canContinue()}
            className="w-full py-4 px-6 rounded-2xl font-semibold tracking-wide flex items-center justify-center gap-3 relative overflow-hidden group disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: selectedType 
                ? `linear-gradient(135deg, ${stegoOptions.find(o => o.id === selectedType)?.color}ee 0%, ${stegoOptions.find(o => o.id === selectedType)?.color}aa 100%)`
                : 'rgba(255, 255, 255, 0.05)',
            }}
            whileHover={{ scale: selectedType ? 1.02 : 1 }}
            whileTap={{ scale: selectedType ? 0.98 : 1 }}
          >
            {selectedType && (
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              />
            )}
            <span className="relative z-10 text-black font-bold">Continue Setup</span>
            <ArrowRight className="w-5 h-5 relative z-10 text-black" />
          </motion.button>

          {/* Skip Button */}
          <div className="flex justify-center">
            <motion.button
              onClick={() => onContinue(null)}
              className="py-3 text-white/40 hover:text-white/70 transition-colors font-medium text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Skip for Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}