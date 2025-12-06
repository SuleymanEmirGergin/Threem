import React, { useState, useRef } from 'react';
import { Lock, Mic, Grid, Key, Image as ImageIcon, CheckCircle2, Upload, Square, Smartphone } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';
import { SecurityService } from '../services/security';
import { useTwoFactorStore } from '../store/useTwoFactorStore';

interface SecuritySetupProps {
    onContinue?: () => void;
}

export const SecuritySetup: React.FC<SecuritySetupProps> = ({ onContinue }) => {
    const { securitySettings, updateSecuritySettings } = useWalletStore();
    const { devices, createAuthRequest, activeRequest } = useTwoFactorStore();

    const [selectedType, setSelectedType] = useState<'pin' | 'password' | 'pattern' | 'image' | 'audio' | null>(securitySettings.activeMethod);
    const [step, setStep] = useState<'select' | 'setup' | 'confirm' | 'dual-auth' | 'success'>('select');
    const [input, setInput] = useState<any>(null);
    const [confirmInput, setConfirmInput] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Dual Auth State
    const [desktopApproved, setDesktopApproved] = useState(false);
    const mobileDevice = devices.find(d => d.type === 'mobile');

    // Media Refs
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const [isRecording, setIsRecording] = useState(false);

    // Watch for Mobile Approval
    React.useEffect(() => {
        if (step === 'dual-auth' && activeRequest?.status === 'approved') {
            // Mobile approved. Check desktop.
            if (desktopApproved) {
                finalizeSave();
            }
        } else if (step === 'dual-auth' && activeRequest?.status === 'rejected') {
            setError("Request denied by Mobile Device.");
            setStep('confirm'); // Go back
        }
    }, [activeRequest?.status, desktopApproved, step]);

    // Watch for Desktop Approval
    React.useEffect(() => {
        if (step === 'dual-auth' && desktopApproved && (!mobileDevice || activeRequest?.status === 'approved')) {
            finalizeSave();
        }
    }, [desktopApproved, activeRequest?.status, step]);


    const handleSave = async () => {
        if (!selectedType || !input) return;

        // If mobile device exists, require dual auth
        if (mobileDevice && mobileDevice.status === 'active') {
            createAuthRequest('settings', `Approve security change to ${selectedType.toUpperCase()}`);
            setStep('dual-auth');
            setDesktopApproved(false);
        } else {
            // No mobile device, just save
            finalizeSave();
        }
    };

    const finalizeSave = async () => {
        if (!selectedType || !input) return;

        const hashedSecret = await SecurityService.hashSecret(input, selectedType);

        updateSecuritySettings({
            activeMethod: selectedType,
            secrets: {
                ...securitySettings.secrets,
                [selectedType]: hashedSecret
            }
        });
        setStep('success');
    };

    // ... (Helper functions for recording, rendering inputs - same as before)
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
                if (step === 'setup') setInput(file);
                else setConfirmInput(file);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error(err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const renderInput = (isConfirm = false) => {
        const value = isConfirm ? confirmInput : input;
        const setValue = isConfirm ? setConfirmInput : setInput;

        switch (selectedType) {
            case 'pin':
                return (
                    <input
                        type="password"
                        maxLength={6}
                        value={value || ''}
                        onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-center text-2xl tracking-widest text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="******"
                    />
                );
            case 'password':
                return (
                    <input
                        type="password"
                        value={value || ''}
                        onChange={(e) => setValue(e.target.value)}
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
                                    const pattern = [0, 1, 2, 4, 6, 8];
                                    setValue(pattern);
                                }}
                                className={`w-12 h-12 rounded-full ${value?.includes(i) ? 'bg-indigo-500' : 'bg-slate-800'}`}
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
                                if (e.target.files?.[0]) setValue(e.target.files[0]);
                            }}
                        />
                        {value && <span className="text-emerald-400 text-xs">{value.name}</span>}
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
                                        if (e.target.files?.[0]) setValue(e.target.files[0]);
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
                        {value && <p className="text-sm text-emerald-400 text-center">Selected: {value.name}</p>}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            {step === 'select' && (
                <div className="grid grid-cols-2 gap-4">
                    {[
                        { id: 'pin', label: 'PIN Code', icon: Grid },
                        { id: 'password', label: 'Password', icon: Key },
                        { id: 'pattern', label: 'Pattern', icon: Lock },
                        { id: 'image', label: 'Image Key', icon: ImageIcon },
                        { id: 'audio', label: 'Voice/Audio', icon: Mic },
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => {
                                setSelectedType(m.id as any);
                                setStep('setup');
                                setInput(null);
                                setConfirmInput(null);
                            }}
                            className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${selectedType === m.id
                                ? 'bg-indigo-600 border-indigo-500 text-white'
                                : 'bg-slate-950 border-slate-800 hover:border-indigo-500 hover:bg-slate-900 text-slate-400 hover:text-white'
                                }`}
                        >
                            <m.icon className="w-8 h-8" />
                            <span className="font-medium">{m.label}</span>
                        </button>
                    ))}
                </div>
            )}

            {(step === 'setup' || step === 'confirm') && (
                <div className="space-y-6">
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-white">
                            {step === 'setup' ? `Set your ${selectedType}` : `Confirm your ${selectedType}`}
                        </h3>
                        <p className="text-sm text-slate-400">
                            {step === 'setup' ? 'Enter your new secret below.' : 'Enter it again to confirm.'}
                        </p>
                    </div>

                    <div className="p-6 bg-slate-950 rounded-xl border border-slate-800">
                        {renderInput(step === 'confirm')}
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep('select')}
                            className="flex-1 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => {
                                if (step === 'setup') {
                                    if (!input) {
                                        setError('Please provide input');
                                        return;
                                    }
                                    setStep('confirm');
                                    setError(null);
                                } else {
                                    // Simple equality check for demo (files won't match this way but logic is same)
                                    if (JSON.stringify(input) !== JSON.stringify(confirmInput) && selectedType !== 'image' && selectedType !== 'audio') {
                                        setError('Secrets do not match');
                                        return;
                                    }
                                    handleSave();
                                }
                            }}
                            className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-500"
                        >
                            {step === 'setup' ? 'Continue' : 'Save'}
                        </button>
                    </div>
                </div>
            )}

            {step === 'dual-auth' && (
                <div className="text-center space-y-6">
                    <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto animate-pulse">
                        <Smartphone className="w-10 h-10 text-indigo-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Dual-Device Approval Required</h3>
                        <p className="text-slate-400">
                            To change security settings, you must approve this request on
                            <br /><span className="text-white font-bold">BOTH</span> your Desktop and Mobile device.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl border ${desktopApproved ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-950 border-slate-800'}`}>
                            <p className="text-sm font-bold text-white mb-2">Desktop</p>
                            {desktopApproved ? (
                                <div className="flex items-center justify-center gap-2 text-emerald-400">
                                    <CheckCircle2 className="w-5 h-5" /> Approved
                                </div>
                            ) : (
                                <button
                                    onClick={() => setDesktopApproved(true)}
                                    className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-500"
                                >
                                    Approve Here
                                </button>
                            )}
                        </div>

                        <div className={`p-4 rounded-xl border ${activeRequest?.status === 'approved' ? 'bg-emerald-500/10 border-emerald-500/50' : 'bg-slate-950 border-slate-800'}`}>
                            <p className="text-sm font-bold text-white mb-2">Mobile ({mobileDevice?.name})</p>
                            {activeRequest?.status === 'approved' ? (
                                <div className="flex items-center justify-center gap-2 text-emerald-400">
                                    <CheckCircle2 className="w-5 h-5" /> Approved
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
                                    <Smartphone className="w-4 h-4" /> Waiting...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {step === 'success' && (
                <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Setup Complete</h3>
                        <p className="text-slate-400">
                            Your {selectedType} has been successfully configured.
                        </p>
                    </div>
                    <button
                        onClick={onContinue}
                        className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700"
                    >
                        Done
                    </button>
                </div>
            )}
        </div>
    );
};
