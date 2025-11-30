import React from 'react';
import { motion } from 'motion/react';

export function CryptoWalletBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Deep Dark Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050510] to-black" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="crypto-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crypto-grid)" />
        </svg>
      </div>
      
      {/* Floating Bitcoin Symbol - Moving Down */}
      {[...Array(4)].map((_, i) => {
        const startLeft = 10 + i * 25;
        // Staggered delays - each starts at different time
        const delay = (i * 3.7) % 12;
        
        return (
          <motion.div
            key={`btc-${i}`}
            className="absolute opacity-[0.15]"
            style={{
              left: `${startLeft}%`,
            }}
            animate={{
              y: ['-120px', 'calc(100vh + 120px)'],
              rotateZ: [0, 360],
            }}
            transition={{
              duration: 15 + i * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: delay,
            }}
          >
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 10.5c0-1.5-1-2.5-3-2.5H10v5h3.5c2 0 3-1 3-2.5zm-3 5H10v5h3.5c2 0 3.5-1 3.5-2.5s-1.5-2.5-3.5-2.5z" fill="url(#btc-gradient-1)" />
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 13.5c0 2-1.5 3.5-4 3.5h-1v1.5h-1.5V19H9v-1.5H7.5v-11H9V5h1v1.5h1.5V5H13v1.5h.5c2.5 0 4 1.5 4 3.5 0 1-.5 2-1.5 2.5 1 .5 1.5 1.5 1.5 2.5z" fill="url(#btc-gradient-1)" />
              <defs>
                <linearGradient id="btc-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f7931a" />
                  <stop offset="100%" stopColor="#f7931a" stopOpacity="0.8" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        );
      })}
      
      {/* Floating Ethereum Symbol - Moving Down */}
      {[...Array(4)].map((_, i) => {
        const startLeft = 15 + i * 28;
        // Different stagger pattern
        const delay = (i * 4.3 + 1.5) % 14;
        
        return (
          <motion.div
            key={`eth-${i}`}
            className="absolute opacity-[0.14]"
            style={{
              left: `${startLeft}%`,
            }}
            animate={{
              y: ['-100px', 'calc(100vh + 100px)'],
              rotateZ: [0, -360],
            }}
            transition={{
              duration: 18 + i * 4,
              repeat: Infinity,
              ease: 'linear',
              delay: delay,
            }}
          >
            <svg width="80" height="80" viewBox="0 0 256 417" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M127.961 0L125.468 8.352v277.39l2.493 2.492 114.339-67.632L127.961 0z" fill="url(#eth-gradient-1)" />
              <path d="M127.962 0L13.623 220.602l114.339 67.632V0z" fill="url(#eth-gradient-2)" />
              <path d="M127.961 312.188l-1.405 1.709v87.802l1.405 4.105 114.394-161.178-114.394 67.562z" fill="url(#eth-gradient-1)" />
              <path d="M127.962 405.804v-93.616L13.623 244.626l114.339 161.178z" fill="url(#eth-gradient-2)" />
              <defs>
                <linearGradient id="eth-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#627eea" />
                  <stop offset="100%" stopColor="#627eea" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="eth-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8a92b2" />
                  <stop offset="100%" stopColor="#8a92b2" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        );
      })}
      
      {/* Wallet Icons - Moving Down */}
      {[...Array(5)].map((_, i) => {
        const startLeft = 5 + i * 20;
        // Unique stagger pattern
        const delay = (i * 2.9 + 0.8) % 13;
        
        return (
          <motion.div
            key={`wallet-${i}`}
            className="absolute opacity-[0.12]"
            style={{
              left: `${startLeft}%`,
            }}
            animate={{
              y: ['-80px', 'calc(100vh + 80px)'],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 16 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: delay,
            }}
          >
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="6" width="18" height="13" rx="2" stroke="url(#wallet-gradient)" strokeWidth="2" />
              <path d="M3 10h18M7 15h2" stroke="url(#wallet-gradient)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="17" cy="13" r="2" fill="url(#wallet-gradient)" />
              <defs>
                <linearGradient id="wallet-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        );
      })}
      
      {/* Blockchain Network Nodes - Moving Down */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        
        {/* Network Lines */}
        {[...Array(12)].map((_, i) => {
          const x1 = (i * 15) % 100;
          const y1 = (i * 20) % 100;
          const x2 = ((i + 1) * 18) % 100;
          const y2 = ((i + 1) * 25) % 100;
          
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#node-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          );
        })}
        
        {/* Network Nodes */}
        {[...Array(16)].map((_, i) => {
          const cx = (i * 15 + 10) % 90 + 5;
          const cy = (i * 18 + 5) % 90 + 5;
          
          return (
            <motion.circle
              key={`node-${i}`}
              cx={`${cx}%`}
              cy={`${cy}%`}
              r="4"
              fill="url(#node-gradient)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 0.7, 0.4] }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          );
        })}
      </svg>
      
      {/* Floating QR Code Icons - Moving Down */}
      {[...Array(3)].map((_, i) => {
        const startLeft = 12 + i * 35;
        // Different stagger for QR codes
        const delay = (i * 5.1 + 2.2) % 11;
        
        return (
          <motion.div
            key={`qr-${i}`}
            className="absolute opacity-[0.1]"
            style={{
              left: `${startLeft}%`,
            }}
            animate={{
              y: ['-60px', 'calc(100vh + 60px)'],
              rotateZ: [0, 15, 0],
            }}
            transition={{
              duration: 14 + i * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: delay,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="url(#qr-gradient)" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="url(#qr-gradient)" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="url(#qr-gradient)" strokeWidth="2" />
              <rect x="5" y="5" width="3" height="3" fill="url(#qr-gradient)" />
              <rect x="16" y="5" width="3" height="3" fill="url(#qr-gradient)" />
              <rect x="5" y="16" width="3" height="3" fill="url(#qr-gradient)" />
              <rect x="14" y="14" width="3" height="3" fill="url(#qr-gradient)" />
              <rect x="18" y="14" width="3" height="3" fill="url(#qr-gradient)" />
              <rect x="14" y="18" width="3" height="3" fill="url(#qr-gradient)" />
              <defs>
                <linearGradient id="qr-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff7f" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        );
      })}
      
      {/* Crypto Coin Symbols - Moving Down */}
      {[...Array(6)].map((_, i) => {
        const coins = ['₿', 'Ξ', '₳', '◎', 'Ł', '₿'];
        const startLeft = 8 + i * 16;
        const colors = ['#f7931a', '#627eea', '#0033ad', '#00d4aa', '#345d9d', '#f7931a'];
        // More varied delays for coins
        const delay = (i * 3.4 + 1.1) % 10;
        
        return (
          <motion.div
            key={`coin-${i}`}
            className="absolute text-5xl font-bold opacity-[0.1]"
            style={{ 
              left: `${startLeft}%`,
              color: colors[i],
              textShadow: `0 0 30px ${colors[i]}80`,
            }}
            animate={{
              y: ['-60px', 'calc(100vh + 60px)'],
              rotateZ: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: delay,
            }}
          >
            {coins[i]}
          </motion.div>
        );
      })}
      
      {/* Lock/Security Icons - Moving Down */}
      {[...Array(4)].map((_, i) => {
        const startLeft = 18 + i * 22;
        // Different stagger for locks
        const delay = (i * 4.7 + 2.8) % 15;
        
        return (
          <motion.div
            key={`lock-${i}`}
            className="absolute opacity-[0.11]"
            style={{
              left: `${startLeft}%`,
            }}
            animate={{
              y: ['-70px', 'calc(100vh + 70px)'],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 13 + i * 2.5,
              repeat: Infinity,
              ease: 'linear',
              delay: delay,
            }}
          >
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="11" width="14" height="10" rx="2" stroke="url(#lock-gradient)" strokeWidth="2" />
              <path d="M8 11V7a4 4 0 018 0v4" stroke="url(#lock-gradient)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="16" r="2" fill="url(#lock-gradient)" />
              <defs>
                <linearGradient id="lock-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff7f" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        );
      })}
      
      {/* Floating Particles - Moving Down Fast */}
      {[...Array(20)].map((_, i) => {
        const size = 3 + Math.random() * 5;
        const startLeft = (i * 5) % 95;
        const colors = ['#8b5cf6', '#06b6d4', '#3b82f6', '#00ff7f'];
        const color = colors[i % 4];
        
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full opacity-[0.15]"
            style={{
              left: `${startLeft}%`,
              width: size,
              height: size,
              background: color,
              boxShadow: `0 0 ${size * 4}px ${color}`,
            }}
            animate={{
              y: ['-20px', 'calc(100vh + 20px)'],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 8 + i % 6,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 0.3,
            }}
          />
        );
      })}
      
      {/* Subtle Ambient Glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{
          top: '20%',
          left: '10%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[150px]"
        style={{
          bottom: '15%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}