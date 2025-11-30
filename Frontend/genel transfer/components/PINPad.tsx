import { motion } from 'motion/react';
import { useState } from 'react';

interface PINPadProps {
  onComplete: (pin: string) => void;
  length?: number;
  title?: string;
}

export function PINPad({ onComplete, length = 6, title = 'Enter PIN' }: PINPadProps) {
  const [pin, setPin] = useState('');
  
  const handleNumberClick = (num: string) => {
    if (pin.length < length) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === length) {
        setTimeout(() => onComplete(newPin), 100);
      }
    }
  };
  
  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };
  
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'back'];
  
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="text-center">
        <p className="text-white/60 mb-4">{title}</p>
        <div className="flex gap-3 justify-center">
          {Array.from({ length }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                i < pin.length
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 border-cyan-400 shadow-lg shadow-cyan-500/50'
                  : 'border-white/20'
              }`}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 max-w-xs">
        {numbers.map((num, i) => {
          if (num === '') {
            return <div key={i} />;
          }
          
          if (num === 'back') {
            return (
              <motion.button
                key={i}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackspace}
                className="w-20 h-20 glass-card flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                ←
              </motion.button>
            );
          }
          
          return (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNumberClick(num)}
              className="w-20 h-20 glass-card flex items-center justify-center hover:bg-white/10 transition-all"
            >
              {num}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
