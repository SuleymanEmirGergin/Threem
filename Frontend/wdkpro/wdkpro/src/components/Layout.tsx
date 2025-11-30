import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Wallet, Shield, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useWalletStore } from '../store/useWalletStore';

export const Layout: React.FC = () => {
    const { wallet, reset } = useWalletStore();
    const location = useLocation();

    if (!wallet) return <Outlet />;

    const navItems = [
        { icon: Wallet, label: 'Wallet', path: '/dashboard' },
        { icon: Shield, label: 'Send', path: '/send' },
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: HelpCircle, label: 'Help', path: '/help' },
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        ZK Wallet
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-indigo-600/20 text-indigo-400'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <button
                    onClick={reset}
                    className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-400 transition-colors mt-auto"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Disconnect</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="max-w-5xl mx-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
