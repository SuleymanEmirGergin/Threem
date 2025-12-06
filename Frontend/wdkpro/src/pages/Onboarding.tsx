import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet, Import, ArrowRight, ShieldCheck } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';
import { SecuritySetup } from '../components/SecuritySetup';

export const Onboarding: React.FC = () => {
    const navigate = useNavigate();
    const { createWallet, importWallet, isLoading } = useWalletStore();
    const [step, setStep] = useState<'welcome' | 'create' | 'import' | 'security'>('welcome');
    const [mnemonic, setMnemonic] = useState('');

    const handleCreate = async () => {
        await createWallet();
        setStep('security');
    };

    const handleImport = async () => {
        if (!mnemonic) return;
        await importWallet(mnemonic);
        setStep('security');
    };

    const handleSecurityComplete = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">

                {/* Logo/Header */}
                <div className="text-center">
                    <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/30">
                        <ShieldCheck className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">ZK Wallet</h1>
                    <p className="text-slate-400 text-lg">Privacy-first crypto transactions.</p>
                </div>

                {/* Main Content */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
                    {step === 'welcome' && (
                        <div className="space-y-4">
                            <button
                                onClick={() => setStep('create')}
                                className="w-full p-6 bg-indigo-600 hover:bg-indigo-500 rounded-xl flex items-center justify-between group transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <Wallet className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-white text-lg">Create New Wallet</h3>
                                        <p className="text-indigo-200 text-sm">Generate a new ZK-enabled wallet</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>

                            <button
                                onClick={() => setStep('import')}
                                className="w-full p-6 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-between group transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white/5 rounded-lg">
                                        <Import className="w-6 h-6 text-slate-300" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-slate-200 text-lg">Import Wallet</h3>
                                        <p className="text-slate-400 text-sm">Use your recovery phrase</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        </div>
                    )}

                    {step === 'create' && (
                        <div className="space-y-6 text-center">
                            <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto">
                                <Wallet className="w-8 h-8 text-indigo-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Creating your secure wallet...</h3>
                            <p className="text-slate-400">We are generating your cryptographic keys and ZK circuits.</p>

                            <button
                                onClick={handleCreate}
                                disabled={isLoading}
                                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Generating...' : 'Continue'}
                            </button>

                            <button onClick={() => setStep('welcome')} className="text-slate-500 hover:text-white text-sm">Cancel</button>
                        </div>
                    )}

                    {step === 'import' && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-2">Recovery Phrase</label>
                                <textarea
                                    value={mnemonic}
                                    onChange={e => setMnemonic(e.target.value)}
                                    className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                                    placeholder="Enter your 12 or 24 word phrase..."
                                />
                            </div>

                            <button
                                onClick={handleImport}
                                disabled={isLoading || !mnemonic}
                                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Importing...' : 'Import Wallet'}
                            </button>

                            <button onClick={() => setStep('welcome')} className="w-full text-slate-500 hover:text-white text-sm">Cancel</button>
                        </div>
                    )}

                    {step === 'security' && (
                        <SecuritySetup onContinue={handleSecurityComplete} />
                    )}
                </div>
            </div>
        </div>
    );
};
