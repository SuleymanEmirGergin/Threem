import { useState } from 'react';
import { Eye, EyeOff, Wallet, Shield, Info } from 'lucide-react';

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberDevice, setRememberDevice] = useState(false);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#050509] via-[#0a0c15] to-[#101621] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="w-full max-w-md relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/30 mb-4">
                        <Wallet className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h1 className="text-white mb-2">Secure Wallet Login</h1>
                    <p className="text-gray-400 text-sm">
                        Access your wallet with maximum privacy and security.
                    </p>
                </div>

                {/* Main Login Card */}
                <div className="relative">
                    {/* Glassmorphism card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 relative overflow-hidden">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>

                        <div className="relative z-10">
                            <h2 className="text-white mb-2">Welcome back</h2>
                            <p className="text-gray-400 text-sm mb-6">
                                Sign in to continue to your wallet.
                            </p>

                            <form className="space-y-5">
                                {/* Email/Wallet ID Input */}
                                <div>
                                    <label htmlFor="email" className="block text-gray-300 text-sm mb-2">
                                        Email or Wallet ID
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                        placeholder="you@example.com or 0x..."
                                    />
                                </div>

                                {/* Password Input */}
                                <div>
                                    <label htmlFor="password" className="block text-gray-300 text-sm mb-2">
                                        Password / Passphrase
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all pr-12"
                                            placeholder="Enter your secure passphrase"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="w-5 h-5" />
                                            ) : (
                                                <Eye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* 2FA Code Input */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <label htmlFor="twofa" className="text-gray-300 text-sm">
                                            2FA Code (if enabled)
                                        </label>
                                        <div className="group relative">
                                            <Info className="w-4 h-4 text-gray-500 cursor-help" />
                                            <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-56 bg-gray-900 border border-white/20 rounded-lg p-2 text-xs text-gray-300">
                                                Enter your 2FA code from your authenticator app.
                                            </div>
                                        </div>
                                    </div>
                                    <input
                                        type="text"
                                        id="twofa"
                                        className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                        placeholder="000000"
                                        maxLength={6}
                                    />
                                </div>

                                {/* Remember Device & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={rememberDevice}
                                            onChange={(e) => setRememberDevice(e.target.checked)}
                                            className="w-4 h-4 rounded border-white/20 bg-black/30 text-cyan-500 focus:ring-2 focus:ring-cyan-500/20 focus:ring-offset-0"
                                        />
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                                            Remember this device
                                        </span>
                                    </label>
                                    <a href="#" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Primary Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-400 hover:to-green-400 text-black py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Sign In Securely
                                </button>

                                {/* Secondary Button */}
                                <button
                                    type="button"
                                    className="w-full bg-transparent border-2 border-white/20 hover:border-cyan-500/50 text-white py-3.5 rounded-xl transition-all hover:bg-white/5"
                                >
                                    Connect with External Wallet
                                </button>

                                {/* Wallet Icons */}
                                <div className="flex items-center justify-center gap-4 pt-2">
                                    {/* Generic wallet icons */}
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                                        <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-md"></div>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                                    </div>
                                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                                        <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-600 rounded"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center space-y-4">
                    <p className="text-gray-400 text-sm">
                        New here?{' '}
                        <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                            Create a new wallet
                        </a>
                    </p>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Shield className="w-4 h-4" />
                        <span>Your credentials are encrypted and never shared.</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
