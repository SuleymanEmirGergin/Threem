import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function SimpleDemo() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
            >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                
                {/* Card Content */}
                <div className="relative px-7 py-6 bg-black ring-1 ring-white/10 rounded-xl leading-none flex items-top justify-start space-x-6">
                    <div className="space-y-4 max-w-md">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <Sparkles className="w-6 h-6 text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                                Premium Demo Component
                            </h2>
                        </div>
                        
                        <p className="text-slate-400 text-sm leading-relaxed">
                            This is a demonstration of a high-quality, glassmorphic UI component. 
                            It features smooth animations, gradient glows, and interactive elements.
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div className="text-white/60 text-sm">
                                Interaction Count: <span className="text-cyan-400 font-mono ml-1">{count}</span>
                            </div>
                            
                            <button 
                                onClick={() => setCount(c => c + 1)}
                                className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-white text-sm transition-colors border border-white/10"
                            >
                                <span>Interact</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
