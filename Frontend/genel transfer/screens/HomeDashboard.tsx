import { motion } from 'motion/react';
import { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Button } from '../components/Button';
import { TransactionRow } from '../components/TransactionRow';
import { QrCode, Download, TrendingUp, Eye, EyeOff, Settings } from 'lucide-react';

interface HomeDashboardProps {
  onScanQR: () => void;
  onSettings: () => void;
}

export function HomeDashboard({ onScanQR, onSettings }: HomeDashboardProps) {
  const [balanceVisible, setBalanceVisible] = useState(true);
  
  const transactions = [
    { type: 'receive' as const, amount: '0.5 ETH', merchant: 'From Alice', timestamp: '2 hours ago' },
    { type: 'payment' as const, amount: '0.12 ETH', merchant: 'Coffee Shop', timestamp: '5 hours ago' },
    { type: 'send' as const, amount: '1.2 ETH', merchant: 'To Bob', timestamp: '1 day ago' },
    { type: 'purchase' as const, amount: '0.08 ETH', merchant: 'Gas Fee', timestamp: '2 days ago' },
    { type: 'receive' as const, amount: '2.5 ETH', merchant: 'Payment received', timestamp: '3 days ago' }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse-glow" />
      
      <div className="relative z-10 max-w-4xl mx-auto p-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h3 className="text-white/60 mb-1">Welcome back</h3>
            <h2>ZKrypt Wallet</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSettings}
            className="w-12 h-12 glass-card flex items-center justify-center"
          >
            <Settings className="w-6 h-6" />
          </motion.button>
        </motion.div>
        
        {/* Balance Card */}
        <GlassCard neonBorder="purple" className="p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-white/60 mb-2">Total Balance</p>
              <div className="flex items-center gap-4">
                {balanceVisible ? (
                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent"
                  >
                    12.847 ETH
                  </motion.h1>
                ) : (
                  <h1>••••••</h1>
                )}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="text-white/60 hover:text-white"
                >
                  {balanceVisible ? <Eye className="w-6 h-6" /> : <EyeOff className="w-6 h-6" />}
                </motion.button>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-green-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>+12.5%</span>
              </div>
              <p className="text-white/60">≈ $24,531.00</p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-3 gap-4">
            <Button variant="secondary" onClick={onScanQR} fullWidth>
              <QrCode className="w-5 h-5 mr-2 inline" />
              Scan
            </Button>
            <Button variant="secondary" fullWidth>
              <Download className="w-5 h-5 mr-2 inline" />
              Receive
            </Button>
            <Button variant="secondary" fullWidth>
              <TrendingUp className="w-5 h-5 mr-2 inline" />
              Trade
            </Button>
          </div>
        </GlassCard>
        
        {/* Transactions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h3>Recent Transactions</h3>
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors">
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {transactions.map((tx, index) => (
              <TransactionRow key={index} {...tx} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
