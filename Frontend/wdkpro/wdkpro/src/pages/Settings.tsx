import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ChevronRight, ArrowLeft, Smartphone, Plus } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';
import { useTwoFactorStore } from '../store/useTwoFactorStore';
import { SecuritySetup } from '../components/SecuritySetup';
import { MobileSimulator } from '../components/MobileSimulator';

export const Settings: React.FC = () => {
    const navigate = useNavigate();
    const { securitySettings } = useWalletStore();
    const { devices, registerDevice, toggleMobileSimulator } = useTwoFactorStore();
    const [showSecuritySetup, setShowSecuritySetup] = useState(false);

    // Reset state when navigating to settings
    React.useEffect(() => {
        setShowSecuritySetup(false);
    }, []);

    const mobileDevice = devices.find(d => d.type === 'mobile');

    const handleRegisterDevice = () => {
        registerDevice("My iPhone 15", "mobile");
        toggleMobileSimulator(true);
    };

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="flex items-center gap-4 mb-6">
                <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-white">Settings</h2>
            </div>

            {showSecuritySetup ? (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <button
                        onClick={() => setShowSecuritySetup(false)}
                        className="mb-6 text-sm text-slate-400 hover:text-white flex items-center gap-1"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Settings
                    </button>
                    <SecuritySetup onContinue={() => setShowSecuritySetup(false)} />
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Transfer Authorization */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-slate-800 bg-slate-950">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Shield className="w-5 h-5 text-indigo-400" />
                                Security & Authorization
                            </h3>
                        </div>

                        <button
                            onClick={() => setShowSecuritySetup(true)}
                            className="w-full p-4 flex items-center justify-between hover:bg-slate-800 transition-colors text-left"
                        >
                            <div>
                                <h4 className="text-white font-medium">Transfer Authorization</h4>
                                <p className="text-sm text-slate-400">
                                    {securitySettings.activeMethod
                                        ? `Active: ${securitySettings.activeMethod.toUpperCase()}`
                                        : 'Not configured'}
                                </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-500" />
                        </button>
                    </div>

                    {/* Device Management */}
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-slate-800 bg-slate-950">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Smartphone className="w-5 h-5 text-indigo-400" />
                                Device Management (2FA)
                            </h3>
                        </div>

                        <div className="p-4">
                            {mobileDevice ? (
                                <div className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${mobileDevice.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                            <Smartphone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium">{mobileDevice.name}</h4>
                                            <p className={`text-xs capitalize ${mobileDevice.status === 'active' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {mobileDevice.status}
                                            </p>
                                        </div>
                                    </div>
                                    <button onClick={() => toggleMobileSimulator(true)} className="text-sm text-indigo-400 hover:text-indigo-300">
                                        Open Simulator
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleRegisterDevice}
                                    className="w-full py-3 border-2 border-dashed border-slate-700 rounded-xl flex items-center justify-center gap-2 text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-all"
                                >
                                    <Plus className="w-5 h-5" />
                                    Register Mobile Device
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <MobileSimulator />
        </div>
    );
};
