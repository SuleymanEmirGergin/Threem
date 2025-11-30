import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Grid, Mic, Upload, Square, CheckCircle2, Key, Image as ImageIcon } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';
import { ZKService } from '../services/zk';
import { SecurityService } from '../services/security';
import { ZKBadge } from '../components/ZKBadge';
import { MobileSimulator } from '../components/MobileSimulator';

export const Send: React.FC = () => {
    const navigate = useNavigate();
    const { wallet, sendTransaction, isLoading, securitySettings } = useWalletStore();

    const [step, setStep] = useState<'input' | 'zk' | 'method-select' | 'security' | 'confirm'>('input');
    const [formData, setFormData] = useState({ to: '', amount: '' });
    const [zkProof, setZkProof] = useState<string | null>(null);

    // Security Verification State
    const [selectedMethod, setSelectedMethod] = useState<'pin' | 'password' | 'pattern' | 'image' | 'audio' | null>(null);
    const [input, setInput] = useState<any>(null);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Media Refs
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    const handleSend = async () => {
        if (!wallet || !isVerified) return;
        await sendTransaction(formData.to, Number(formData.amount), zkProof || undefined, selectedMethod as any);
        navigate('/dashboard');
    };

    const generateProof = async () => {
        if (!wallet) return;
        try {
            const proof = await ZKService.generateBalanceProof(wallet.balance, Number(formData.amount));
            setZkProof(proof);
            setStep('method-select');
        } catch (err) {
            alert('Failed to generate ZK Proof: Insufficient balance');
        }
    };

    const verifySecurity = async () => {
        if (!selectedMethod) return;

        if (!input) {
            setError('Please provide input.');
            return;
        }

        setIsProcessing(true);
        try {
            const storedHash = securitySettings.secrets[selectedMethod];
            if (!storedHash) {
                setError('Security configuration error. Method not set up.');
                return;
            }

            const isValid = await SecurityService.verifySecret(input, storedHash, selectedMethod);
            if (isValid) {
                setIsVerified(true);
                setStep('confirm');
            } else {
                setError('Verification failed. Invalid secret.');
            }
        } catch (err) {
            setError('Verification error.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Audio Recording Logic
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const file = new File([blob], "recording.webm", { type: 'audio/webm' });
                setInput(file);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            setError("Microphone access denied");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const renderMethodSelection = () => {
        const methods = [
            { id: 'pin', label: 'PIN Code', icon: Grid },
            { id: 'password', label: 'Password', icon: Key },
            { id: 'pattern', label: 'Pattern', icon: Lock },
            { id: 'image', label: 'Image Key', icon: ImageIcon },
            { id: 'audio', label: 'Voice/Audio', icon: Mic },
        ] as const;

        return (
            <div className="grid grid-cols-2 gap-4">
                {methods.map((m) => {
                    const isConfigured = !!securitySettings.secrets[m.id];
                    return (
                        <button
                            key={m.id}
                            onClick={() => {
                                if (isConfigured) {
                                    setSelectedMethod(m.id);
                                    setStep('security');
                                    setError(null);
                                    setInput(null);
                                }
                            }}
                            disabled={!isConfigured}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${isConfigured
                                    ? 'bg-slate-950 border-slate-800 hover:border-indigo-500 hover:bg-slate-900 text-white'
                                    : 'bg-slate-950/50 border-slate-900 text-slate-600 cursor-not-allowed'
                                }`}
                        >
                            <m.icon className={`w-8 h-8 ${isConfigured ? 'text-indigo-400' : 'text-slate-700'}`} />
                            <span className="font-medium">{m.label}</span>
                            {!isConfigured && <span className="text-xs text-slate-700">Not Set</span>}
                        </button>
                    );
                })}
            </div>
        );
    };

    const renderSecurityInput = () => {
        switch (selectedMethod) {
            case 'pin':
                return (
                    <input
                        type="password"
                        maxLength={6}
                        value={input || ''}
                        onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-center text-2xl tracking-widest text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="******"
                    />
                );
            case 'password':
                return (
                    <input
                        type="password"
                        value={input || ''}
                        onChange={(e) => setInput(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="Enter password"
                    />
                );
            case 'pattern':
                return (
                    <div className="grid grid-cols-3 gap-4 max-w-[200px] mx-auto">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <button
                                key={i}
                                onClick={() => {
                                    // Mock pattern input
                                    const pattern = [0, 1, 2, 4, 6, 8];
                                    setInput(pattern);
                                }}
                                className={`w-12 h-12 rounded-full ${input?.includes(i) ? 'bg-indigo-500' : 'bg-slate-800'}`}
                            />
                        ))}
                        <p className="col-span-3 text-xs text-center text-slate-500 mt-2">Tap to simulate pattern</p>
                    </div>
                );
            case 'image':
                return (
                    <label className="cursor-pointer p-8 bg-slate-950 border border-slate-800 border-dashed rounded-xl flex flex-col items-center gap-2 hover:bg-slate-900 transition-colors">
                        <ImageIcon className="w-8 h-8 text-indigo-400" />
                        <span className="text-sm text-slate-400">Upload Secret Image</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files?.[0]) setInput(e.target.files[0]);
                            }}
                        />
                        {input && <span className="text-emerald-400 text-xs">{input.name}</span>}
                    </label>
                );
            case 'audio':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <label className="cursor-pointer p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-900">
                                <Upload className="w-6 h-6 text-indigo-400" />
                                <span className="text-xs text-slate-400">Upload</span>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        if (e.target.files?.[0]) setInput(e.target.files[0]);
                                    }}
                                />
                            </label>
                            <button
                                onClick={isRecording ? stopRecording : startRecording}
                                className={`p-4 rounded-xl border flex flex-col items-center gap-2 ${isRecording ? 'bg-red-900/20 border-red-500 text-red-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'}`}
                            >
                                {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
                                <span className="text-xs">{isRecording ? 'Stop' : 'Record'}</span>
                            </button>
                        </div>
                        {input && <p className="text-sm text-emerald-400 text-center">Selected: {input.name}</p>}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Send USDT</h2>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                {step === 'input' && (
                    <>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Recipient Address</label>
                                <input
                                    type="text"
                                    value={formData.to}
                                    onChange={e => setFormData({ ...formData, to: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="0x..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Amount (USDT)</label>
                                <input
                                    type="number"
                                    value={formData.amount}
                                    onChange={e => setFormData({ ...formData, amount: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>
                        <button
                            onClick={() => setStep('zk')}
                            disabled={!formData.to || !formData.amount}
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors disabled:opacity-50"
                        >
                            Next
                        </button>
                    </>
                )}

                {step === 'zk' && (
                    <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                            <ShieldCheck className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Generating ZK Proof</h3>
                            <p className="text-slate-400">
                                Creating Zero-Knowledge proof of funds.
                            </p>
                        </div>
                        <button
                            onClick={generateProof}
                            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 transition-colors"
                        >
                            Generate Proof & Continue
                        </button>
                    </div>
                )}

                {step === 'method-select' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2">Select Authorization Method</h3>
                            <p className="text-slate-400">
                                Choose how you want to authorize this transfer.
                            </p>
                        </div>
                        {renderMethodSelection()}
                    </div>
                )}

                {step === 'security' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                {selectedMethod === 'pin' && <Grid className="w-8 h-8 text-indigo-500" />}
                                {selectedMethod === 'password' && <Key className="w-8 h-8 text-indigo-500" />}
                                {selectedMethod === 'pattern' && <Lock className="w-8 h-8 text-blue-500" />}
                                {selectedMethod === 'image' && <ImageIcon className="w-8 h-8 text-purple-500" />}
                                {selectedMethod === 'audio' && <Mic className="w-8 h-8 text-pink-500" />}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Authorize Transfer</h3>
                            <p className="text-slate-400">
                                Provide your {selectedMethod} secret to confirm.
                            </p>
                        </div>

                        <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
                            {renderSecurityInput()}
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button
                                onClick={() => setStep('method-select')}
                                className="flex-1 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={verifySecurity}
                                disabled={isProcessing}
                                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors disabled:opacity-50"
                            >
                                {isProcessing ? 'Verifying...' : 'Verify & Continue'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 'confirm' && (
                    <div className="space-y-6">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Ready to Send</h3>
                        </div>

                        <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <div className="flex justify-between">
                                <span className="text-slate-400">To</span>
                                <span className="text-white font-mono">{formData.to}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Amount</span>
                                <span className="text-white font-bold">{formData.amount} USDT</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400">Privacy</span>
                                <ZKBadge type="balance" />
                            </div>
                            <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                                <span className="text-slate-400">Authorization</span>
                                <span className="text-emerald-400 font-medium capitalize flex items-center gap-1">
                                    <CheckCircle2 className="w-4 h-4" /> {selectedMethod} Verified
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleSend}
                            disabled={isLoading}
                            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2"
                        >
                            {isLoading ? 'Broadcasting...' : 'Confirm & Send'}
                        </button>
                    </div>
                )}
            </div>
            <MobileSimulator />
        </div>
    );
};
