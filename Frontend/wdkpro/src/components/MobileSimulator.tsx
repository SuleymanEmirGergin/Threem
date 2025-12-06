import React, { useState } from 'react';
import { Smartphone, Lock, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useTwoFactorStore } from '../store/useTwoFactorStore';
import { TwoFactorService } from '../services/TwoFactorService';
import { useWalletStore } from '../store/useWalletStore';

export const MobileSimulator: React.FC = () => {
    const { isMobileSimulatorOpen, toggleMobileSimulator, activeRequest, resolveAuthRequest, devices } = useTwoFactorStore();
    const { securitySettings } = useWalletStore();
    const mobileDevice = devices.find(d => d.type === 'mobile');

    const [input, setInput] = useState('');
    const [msg, setMsg] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);

    if (!isMobileSimulatorOpen) return null;

    const handleApprove = async () => {
        if (!mobileDevice || !activeRequest) return;

        setIsProcessing(true);
        setMsg(null);

        // In a real app, the mobile device would have its own local secret storage.
        // Here we simulate it by checking against the main wallet store's secret for the active method.
        // We assume the mobile device uses the SAME method as the wallet for this demo, 
        // or we could add a specific "mobile secret" to the store. 
        // For simplicity, let's use the wallet's active method secret.

        const method = securitySettings.activeMethod;
        const storedHash = securitySettings.secrets[method || 'pin']; // Fallback

        if (!method || !storedHash) {
            setMsg("No security method configured on mobile.");
            setIsProcessing(false);
            return;
        }

        // Simulate input type matching
        let secretPayload: any = input;
        if (method === 'pattern') {
            // Mock pattern parsing if input was a string, but for simulator we might just use a text field for simplicity 
            // or a simple mock. Let's assume input is the "PIN" or "Password" for now.
            // If method is pattern, we might need a pattern grid here too.
            // For MVP 2FA Simulator, let's stick to PIN/Password input field.
        }

        const result = await TwoFactorService.verifyMobileAuth(mobileDevice.id, secretPayload, method, storedHash);

        if (result.success) {
            setMsg("Approved!");
            setTimeout(() => {
                resolveAuthRequest(activeRequest.id, true);
                setInput('');
                setMsg(null);
            }, 1000);
        } else {
            setMsg(result.message || "Failed");
        }
        setIsProcessing(false);
    };

    const handleReject = () => {
        if (activeRequest) {
            resolveAuthRequest(activeRequest.id, false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 w-80 bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden z-50 flex flex-col font-sans">
            {/* Mobile Header */}
            <div className="bg-slate-950 p-4 flex justify-between items-center border-b border-slate-800">
                <div className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-indigo-400" />
                    <span className="font-bold text-white">My iPhone 15</span>
                </div>
                <button onClick={() => toggleMobileSimulator(false)} className="text-slate-500 hover:text-white">
                    <XCircle className="w-5 h-5" />
                </button>
            </div>

            {/* Mobile Screen Content */}
            <div className="p-6 flex-1 bg-slate-900 min-h-[300px] flex flex-col relative">

                {/* Status Overlay */}
                {mobileDevice?.status === 'locked' && (
                    <div className="absolute inset-0 bg-slate-900/95 z-10 flex flex-col items-center justify-center text-center p-4">
                        <Lock className="w-12 h-12 text-orange-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Device Locked</h3>
                        <p className="text-slate-400 text-sm">Too many failed attempts. Try again later.</p>
                        {mobileDevice.lockoutUntil && (
                            <p className="text-orange-400 text-xs mt-2">
                                Unlocks at {new Date(mobileDevice.lockoutUntil).toLocaleTimeString()}
                            </p>
                        )}
                    </div>
                )}

                {mobileDevice?.status === 'blocked' && (
                    <div className="absolute inset-0 bg-red-950/95 z-10 flex flex-col items-center justify-center text-center p-4">
                        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Device Blocked</h3>
                        <p className="text-red-200 text-sm">Permanent block due to security violations. Contact support.</p>
                    </div>
                )}

                {!mobileDevice ? (
                    <div className="text-center my-auto">
                        <p className="text-slate-500">Device not registered.</p>
                    </div>
                ) : !activeRequest ? (
                    <div className="text-center my-auto">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        </div>
                        <p className="text-slate-400">System Secure</p>
                        <p className="text-xs text-slate-600 mt-2">Waiting for requests...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-white mb-1">Confirm Action</h3>
                            <p className="text-sm text-slate-400">{activeRequest.description}</p>
                        </div>

                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Enter Secret</p>
                            <input
                                type="password"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="PIN / Password"
                            />
                        </div>

                        {msg && (
                            <p className={`text-xs text-center ${msg.includes('Approved') ? 'text-emerald-400' : 'text-red-400'}`}>
                                {msg}
                            </p>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleReject}
                                className="py-3 rounded-xl bg-slate-800 text-slate-300 font-medium hover:bg-slate-700"
                            >
                                Deny
                            </button>
                            <button
                                onClick={handleApprove}
                                disabled={isProcessing}
                                className="py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 disabled:opacity-50"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Home Indicator */}
            <div className="h-1 bg-slate-800 mx-auto w-1/3 rounded-full my-2" />
        </div>
    );
};
