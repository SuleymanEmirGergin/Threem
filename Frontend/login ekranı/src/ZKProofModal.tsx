import React, { useState, useEffect } from 'react';
import { X, Shield, CheckCircle, Lock, Cpu, EyeOff } from 'lucide-react';

interface ZKProofModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ZKProofModal({ isOpen, onClose }: ZKProofModalProps) {
    const [step, setStep] = useState<'idle' | 'processing' | 'verified'>('idle');
    const [progress, setProgress] = useState(0);
    const [log, setLog] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            setStep('idle');
            setProgress(0);
            setLog([]);
        }
    }, [isOpen]);

    const startProof = () => {
        setStep('processing');
        setProgress(0);
        setLog([]);

        const steps = [
            { msg: 'Initializing ZK-SNARK circuit...', time: 500 },
            { msg: 'Fetching encrypted asset data...', time: 1500 },
            { msg: 'Generating witness...', time: 2500 },
            { msg: 'Computing polynomial commitments...', time: 3500 },
            { msg: 'Generating proof π...', time: 4500 },
            { msg: 'Verifying proof on-chain...', time: 5500 },
        ];

        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep >= steps.length) {
                clearInterval(interval);
                setStep('verified');
                return;
            }

            setLog(prev => [...prev, steps[currentStep].msg]);
            setProgress(((currentStep + 1) / steps.length) * 100);
            currentStep++;
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-[#0a0c15] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">ZK Proof of Assets</h3>
                            <p className="text-xs text-cyan-400">Zero-Knowledge Solvency Verification</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    {step === 'idle' && (
                        <div className="space-y-6">
                            <div className="p-4 rounded-xl bg-cyan-900/10 border border-cyan-500/20">
                                <h4 className="text-cyan-400 font-medium mb-2 flex items-center gap-2">
                                    <Lock size={16} /> Privacy Guarantee
                                </h4>
                                <p className="text-sm text-gray-300">
                                    This process will prove you hold <strong>&gt; 1.0 ETH</strong> without revealing your:
                                </p>
                                <ul className="mt-2 space-y-1 text-sm text-gray-400 list-disc list-inside">
                                    <li>Exact balance</li>
                                    <li>Transaction history</li>
                                    <li>Wallet address</li>
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                    <span className="text-gray-300">Circuit</span>
                                    <span className="text-white font-mono text-sm">Groth16</span>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                                    <span className="text-gray-300">Curve</span>
                                    <span className="text-white font-mono text-sm">bn128</span>
                                </div>
                            </div>

                            <button
                                onClick={startProof}
                                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/25 transition-all active:scale-[0.98]"
                            >
                                Generate Proof
                            </button>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="space-y-6 py-4">
                            <div className="relative w-32 h-32 mx-auto">
                                <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
                                <div
                                    className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Cpu className="w-12 h-12 text-cyan-400 animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-xs text-gray-400 uppercase tracking-wider">
                                    <span>Progress</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-cyan-500 transition-all duration-300 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="h-32 p-4 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-green-400 overflow-y-auto space-y-1">
                                {log.map((line, i) => (
                                    <div key={i} className="flex gap-2">
                                        <span className="text-gray-600">[{new Date().toLocaleTimeString()}]</span>
                                        <span>{line}</span>
                                    </div>
                                ))}
                                <div className="animate-pulse">_</div>
                            </div>
                        </div>
                    )}

                    {step === 'verified' && (
                        <div className="text-center space-y-6 py-4">
                            <div className="w-24 h-24 mx-auto rounded-full bg-green-500/10 border-2 border-green-500/50 flex items-center justify-center relative">
                                <div className="absolute inset-0 rounded-full bg-green-500/20 animate-ping"></div>
                                <CheckCircle className="w-12 h-12 text-green-400 relative z-10" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Solvency Verified</h2>
                                <p className="text-gray-400">
                                    Zero-Knowledge Proof successfully generated and verified on-chain.
                                </p>
                            </div>

                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Proof Hash</span>
                                    <span className="text-xs font-mono text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">
                                        0x7f...3a9c
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-400">Public Inputs</span>
                                    <span className="text-xs font-mono text-gray-300">
                                        [hash(balance &gt; 1.0)]
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-green-400 mt-2 pt-2 border-t border-white/10">
                                    <EyeOff size={12} />
                                    <span>No private data was revealed during this process.</span>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/5 text-white transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
