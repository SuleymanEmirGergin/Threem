import { motion } from 'motion/react';
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, Zap } from 'lucide-react';

interface TransactionRowProps {
  type: 'send' | 'receive' | 'purchase' | 'payment';
  amount: string;
  merchant: string;
  timestamp: string;
  index: number;
}

export function TransactionRow({ type, amount, merchant, timestamp, index }: TransactionRowProps) {
  const icons = {
    send: <ArrowUpRight className="w-5 h-5" />,
    receive: <ArrowDownLeft className="w-5 h-5" />,
    purchase: <ShoppingBag className="w-5 h-5" />,
    payment: <Zap className="w-5 h-5" />
  };
  
  const colors = {
    send: 'bg-red-500/20 text-red-400',
    receive: 'bg-green-500/20 text-green-400',
    purchase: 'bg-blue-500/20 text-blue-400',
    payment: 'bg-purple-500/20 text-purple-400'
  };
  
  const isNegative = type === 'send' || type === 'purchase' || type === 'payment';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-4 p-4 glass-card hover:bg-white/10 transition-all cursor-pointer"
    >
      <div className={`w-12 h-12 rounded-2xl ${colors[type]} flex items-center justify-center`}>
        {icons[type]}
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="truncate">{merchant}</p>
        <p className="text-white/40">{timestamp}</p>
      </div>
      
      <div className="text-right">
        <p className={isNegative ? 'text-red-400' : 'text-green-400'}>
          {isNegative ? '-' : '+'}{amount}
        </p>
      </div>
    </motion.div>
  );
}
