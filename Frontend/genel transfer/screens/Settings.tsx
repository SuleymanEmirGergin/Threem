import { motion } from 'motion/react';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Shield, Palette, Database, Info, ChevronRight } from 'lucide-react';

interface SettingsProps {
  onBack: () => void;
  onManageSecurity: () => void;
}

export function Settings({ onBack, onManageSecurity }: SettingsProps) {
  const sections = [
    {
      title: 'Security',
      icon: Shield,
      items: [
        { label: 'Security Methods', action: onManageSecurity },
        { label: 'Backup Wallet', action: () => {} },
        { label: 'Recovery Phrase', action: () => {} }
      ]
    },
    {
      title: 'Preferences',
      icon: Palette,
      items: [
        { label: 'Theme', value: 'Dark', action: () => {} },
        { label: 'Currency', value: 'USD', action: () => {} },
        { label: 'Language', value: 'English', action: () => {} }
      ]
    },
    {
      title: 'Data',
      icon: Database,
      items: [
        { label: 'Export Transactions', action: () => {} },
        { label: 'Clear Cache', action: () => {} }
      ]
    },
    {
      title: 'About',
      icon: Info,
      items: [
        { label: 'Version', value: '1.0.0', action: () => {} },
        { label: 'Terms of Service', action: () => {} },
        { label: 'Privacy Policy', action: () => {} }
      ]
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 p-6">
      <div className="max-w-2xl mx-auto py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="w-10 h-10 glass-card flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <h2>Settings</h2>
        </motion.div>
        
        {/* Settings Sections */}
        <div className="space-y-6">
          {sections.map((section, sectionIndex) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4>{section.title}</h4>
                </div>
                
                <GlassCard className="overflow-hidden">
                  {section.items.map((item, index) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                      onClick={item.action}
                      className={`p-4 flex justify-between items-center cursor-pointer ${
                        index !== section.items.length - 1 ? 'border-b border-white/10' : ''
                      }`}
                    >
                      <span>{item.label}</span>
                      <div className="flex items-center gap-2">
                        {item.value && (
                          <span className="text-white/60">{item.value}</span>
                        )}
                        <ChevronRight className="w-4 h-4 text-white/40" />
                      </div>
                    </motion.div>
                  ))}
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
        
        {/* Wallet Address */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <GlassCard className="p-6">
            <p className="text-white/60 mb-3">Your Wallet Address</p>
            <div className="bg-black/30 p-3 rounded-lg break-all font-mono">
              0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb8
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
