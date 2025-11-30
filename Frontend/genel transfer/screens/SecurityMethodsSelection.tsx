import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';
import { ToggleSwitch } from '../components/ToggleSwitch';
import { StatusBadge } from '../components/StatusBadge';
import { Lock, Image, Music, Move, ChevronRight } from 'lucide-react';

interface SecurityMethod {
  id: string;
  name: string;
  description: string;
  icon: any;
  enabled: boolean;
  configured: boolean;
}

interface SecurityMethodsSelectionProps {
  methods: SecurityMethod[];
  onToggle: (id: string) => void;
  onConfigure: (id: string) => void;
  onContinue: () => void;
  isSetup?: boolean;
}

export function SecurityMethodsSelection({ 
  methods, 
  onToggle, 
  onConfigure, 
  onContinue,
  isSetup = true 
}: SecurityMethodsSelectionProps) {
  const icons = {
    pin: Lock,
    image: Image,
    sound: Music,
    motion: Move
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 p-6">
      <div className="max-w-2xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="mb-2">{isSetup ? 'Security Setup' : 'Security Methods'}</h2>
          <p className="text-white/60">
            {isSetup 
              ? 'Configure your unlock methods for payments'
              : 'Manage your security methods'}
          </p>
        </motion.div>
        
        <div className="space-y-4 mb-8">
          {methods.map((method, index) => {
            const Icon = icons[method.id as keyof typeof icons];
            
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      method.enabled 
                        ? 'bg-gradient-to-br from-purple-500 to-cyan-500' 
                        : 'bg-white/10'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4>{method.name}</h4>
                        <StatusBadge status={method.configured ? 'configured' : 'not-set'} />
                      </div>
                      <p className="text-white/60 mb-4">{method.description}</p>
                      
                      {method.enabled && (
                        <Button 
                          variant="secondary" 
                          onClick={() => onConfigure(method.id)}
                        >
                          {method.configured ? 'Reconfigure' : 'Configure'}
                          <ChevronRight className="w-4 h-4 ml-2 inline" />
                        </Button>
                      )}
                    </div>
                    
                    <ToggleSwitch 
                      enabled={method.enabled} 
                      onChange={() => onToggle(method.id)} 
                    />
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
        
        {isSetup && (
          <Button onClick={onContinue} fullWidth>
            Continue to Dashboard
          </Button>
        )}
      </div>
    </div>
  );
}
