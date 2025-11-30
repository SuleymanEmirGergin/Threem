import React, { useState, useRef } from 'react';
import { Smartphone, Lock, Mic, Upload, Check, X, Square } from 'lucide-react';
import { StegoService } from '../services/stego';
import { GeminiService } from '../services/gemini';

interface StegoSetupProps {
    mode: 'pattern' | 'pin' | 'audio';
    onComplete: (secret: any) => void;
    onCancel: () => void;
}

export const StegoSetup: React.FC<StegoSetupProps> = ({ mode, onComplete, onCancel }) => {
    const [step, setStep] = useState<'intro' | 'input' | 'confirm' | 'success'>('intro');
    const [secret, setSecret] = useState<any>(null);
    const [confirmInput, setConfirmInput] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [explanation, setExplanation] = useState<string>('');

    // Audio specific state
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    React.useEffect(() => {
        GeminiService.explainStego(mode).then(setExplanation);
    }, [mode]);

    const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setAudioFile(file);
            setIsProcessing(true);
            try {
                const fp = await StegoService.generateAudioFingerprint(file);
                if (step === 'input') setSecret(fp);
                else if (step === 'confirm') setConfirmInput(fp);
            } finally {
                setIsProcessing(false);
            }
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const file = new File([blob], "recording.webm", { type: 'audio/webm' });
                setAudioFile(file);

                setIsProcessing(true);
                try {
                    const fp = await StegoService.generateAudioFingerprint(file);
                    if (step === 'input') setSecret(fp);
                    else if (step === 'confirm') setConfirmInput(fp);
                } finally {
                    setIsProcessing(false);
                }

                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (err) {
            setError("Microphone access denied or not available.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleNext = () => {
        if (step === 'intro') setStep('input');
        else if (step === 'input') {
            if (!secret) {
                setError("Please provide an input first.");
                return;
            }
            setStep('confirm');
            setError(null);
            setAudioFile(null);
        }
        else if (step === 'confirm') {
            if (JSON.stringify(secret) !== JSON.stringify(confirmInput)) {
                setError("Inputs do not match. Try again.");
                return;
            }
            setStep('success');
            setTimeout(() => onComplete(secret), 1500);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {mode === 'pattern' && <Smartphone className="w-5 h-5 text-indigo-400" />}
                        {mode === 'pin' && <Lock className="w-5 h-5 text-indigo-400" />}
                        {mode === 'audio' && <Mic className="w-5 h-5 text-indigo-400" />}
                        Setup {mode.charAt(0).toUpperCase() + mode.slice(1)} Auth
                    </h3>
                    <button onClick={onCancel} className="text-slate-400 hover:text-white">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    {step === 'intro' && (
                        <div className="space-y-4">
                            <div className="p-4 bg-indigo-900/20 border border-indigo-900/50 rounded-xl">
                                <p className="text-indigo-200 text-sm leading-relaxed">{explanation}</p>
                            </div>
                            <p className="text-slate-400">
                                You will define a secret {mode} that will be required to authorize every transaction.
                            </p>
                        </div>
                    )}

                    {(step === 'input' || step === 'confirm') && (
                        <div className="space-y-6">
                            <p className="text-white font-medium text-center">
                                {step === 'input' ? `Set your ${mode}` : `Confirm your ${mode}`}
                            </p>

                            {mode === 'audio' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <label className="cursor-pointer p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 border-dashed flex flex-col items-center gap-2 transition-colors">
                                            <Upload className="w-6 h-6 text-indigo-400" />
                                            <span className="text-sm font-medium text-slate-300">Upload File</span>
                                            <input type="file" accept="audio/*" onChange={handleAudioUpload} className="hidden" />
                                        </label>

                                        <button
                                            onClick={isRecording ? stopRecording : startRecording}
                                            className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-colors ${isRecording
                                                    ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
                                                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
                                                }`}
                                        >
                                            {isRecording ? <Square className="w-6 h-6" /> : <Mic className="w-6 h-6 text-indigo-400" />}
                                            <span className="text-sm font-medium">{isRecording ? 'Stop Rec' : 'Record'}</span>
                                        </button>
                                    </div>

                                    {audioFile && (
                                        <div className="p-3 bg-slate-800 rounded-lg flex items-center justify-between">
                                            <span className="text-sm text-slate-300 truncate max-w-[200px]">{audioFile.name}</span>
                                            <span className="text-xs text-slate-500">{(audioFile.size / 1024).toFixed(1)} KB</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {mode === 'pattern' && (
                                <div className="aspect-square max-w-[250px] mx-auto bg-slate-950 rounded-xl p-4 grid grid-cols-3 gap-4">
                                    {/* Mock Pattern Grid */}
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                // Simple mock: just setting a dummy pattern for demo
                                                const val = [0, 1, 2, 4, 6, 8];
                                                if (step === 'input') setSecret(val);
                                                else setConfirmInput(val);
                                            }}
                                            className={`w-full h-full rounded-full ${(step === 'input' && secret?.includes(i)) || (step === 'confirm' && confirmInput?.includes(i))
                                                    ? 'bg-indigo-500'
                                                    : 'bg-slate-800 hover:bg-slate-700'
                                                }`}
                                        />
                                    ))}
                                </div>
                            )}

                            {mode === 'pin' && (
                                <div className="text-center">
                                    <input
                                        type="password"
                                        maxLength={6}
                                        className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center text-2xl tracking-widest text-white focus:ring-2 focus:ring-indigo-500 outline-none w-full"
                                        placeholder="******"
                                        onChange={(e) => {
                                            if (step === 'input') setSecret(e.target.value);
                                            else setConfirmInput(e.target.value);
                                        }}
                                    />
                                </div>
                            )}

                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Setup Complete</h3>
                            <p className="text-slate-400">Your steganographic authorization is ready.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-800 bg-slate-950 flex justify-end gap-3">
                    {step !== 'success' && (
                        <>
                            <button
                                onClick={onCancel}
                                className="px-4 py-2 text-slate-400 hover:text-white font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={isProcessing || (step === 'input' && !secret) || (step === 'confirm' && !confirmInput)}
                                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {step === 'intro' ? 'Start Setup' : step === 'confirm' ? 'Finish' : 'Next'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
