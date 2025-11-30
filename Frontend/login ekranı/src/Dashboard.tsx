import React, { useState } from 'react';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    RefreshCw,
    CreditCard,
    TrendingUp,
    Bell,
    Settings,
    LogOut,
    ChevronDown,
    Search,
    Shield
} from 'lucide-react';
import ZKProofModal from './ZKProofModal';

interface DashboardProps {
    onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const [showZKModal, setShowZKModal] = useState(false);

    const transactions = [
        { id: 1, type: 'receive', asset: 'ETH', amount: '+1.45', value: '+$2,850.50', from: '0x71C...9A2', date: 'Today, 10:23 AM' },
        { id: 2, type: 'send', asset: 'USDT', amount: '-500.00', value: '-$500.00', to: '0x3d2...8B1', date: 'Yesterday, 4:15 PM' },
        { id: 3, type: 'swap', asset: 'ETH > SOL', amount: '0.5 ETH', value: '$980.00', date: 'Nov 28, 2:30 PM' },
        { id: 4, type: 'receive', asset: 'BTC', amount: '+0.025', value: '+$945.20', from: 'Binance', date: 'Nov 27, 9:12 AM' },
    ];

    const assets = [
        { name: 'Ethereum', symbol: 'ETH', balance: '4.25', value: '$8,350.25', change: '+5.2%' },
        { name: 'Bitcoin', symbol: 'BTC', balance: '0.15', value: '$5,670.80', change: '+2.1%' },
        { name: 'Solana', symbol: 'SOL', balance: '145.0', value: '$8,410.00', change: '-1.4%' },
        { name: 'Tether', symbol: 'USDT', balance: '2,450.0', value: '$2,450.00', change: '0.0%' },
    ];

    return (
        <div className="min-h-screen w-full bg-[#050509] text-white flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-20 lg:w-64 border-r border-white/10 bg-black/20 backdrop-blur-xl hidden md:flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="font-bold text-xl hidden lg:block tracking-tight">Secure<span className="text-cyan-400">Wallet</span></span>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {['Overview', 'Wallet', 'Swap', 'Market', 'NFTs', 'History'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item.toLowerCase())}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.toLowerCase()
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <div className="w-5 h-5">
                                {item === 'Overview' && <TrendingUp size={20} />}
                                {item === 'Wallet' && <Wallet size={20} />}
                                {item === 'Swap' && <RefreshCw size={20} />}
                                {item === 'Market' && <ArrowUpRight size={20} />}
                                {item === 'NFTs' && <CreditCard size={20} />}
                                {item === 'History' && <Search size={20} />}
                            </div>
                            <span className="hidden lg:block">{item}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all"
                    >
                        <LogOut size={20} />
                        <span className="hidden lg:block">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 relative overflow-y-auto">
                {/* Background Gradients */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none" />

                {/* Header */}
                <header className="sticky top-0 z-20 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>

                    <div className="flex items-center gap-4">
                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors relative">
                            <Bell size={18} className="text-gray-300" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#050509]"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-medium text-white">Alex Morgan</p>
                                <p className="text-xs text-gray-400">Basic Plan</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 p-[2px]">
                                <div className="w-full h-full rounded-full bg-[#0a0c15] flex items-center justify-center overflow-hidden">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="w-full h-full" />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="p-6 max-w-7xl mx-auto space-y-8 relative z-10">
                    {/* Total Balance Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-cyan-900/20 via-black/40 to-purple-900/20 border border-white/10 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <p className="text-gray-400 mb-2">Total Balance</p>
                                <h1 className="text-5xl font-bold text-white mb-6 tracking-tight">$24,850.50</h1>

                                <div className="flex flex-wrap gap-4">
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                                        <ArrowDownLeft size={18} />
                                        Receive
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/10">
                                        <ArrowUpRight size={18} />
                                        Send
                                    </button>
                                    <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all border border-white/10">
                                        <RefreshCw size={18} />
                                        Swap
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="space-y-6">
                            <div className="p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-400">24h Profit</span>
                                    <span className="text-green-400 flex items-center gap-1 text-sm bg-green-500/10 px-2 py-1 rounded-lg">
                                        <TrendingUp size={14} /> +12.5%
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-white">+$1,240.50</p>

                                <button
                                    onClick={() => setShowZKModal(true)}
                                    className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center justify-center gap-2 text-cyan-400 font-medium text-sm group"
                                >
                                    <Shield size={16} className="group-hover:scale-110 transition-transform" />
                                    Verify Solvency (ZK)
                                </button>
                            </div>
                            <div className="p-6 rounded-3xl bg-black/40 border border-white/10 backdrop-blur-sm">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-gray-400">Active Assets</span>
                                    <Settings size={18} className="text-gray-500 cursor-pointer hover:text-white" />
                                </div>
                                <div className="flex -space-x-3">
                                    {assets.map((asset, i) => (
                                        <div key={asset.symbol} className="w-10 h-10 rounded-full bg-[#1a1d26] border-2 border-[#050509] flex items-center justify-center text-xs font-bold text-gray-400" style={{ zIndex: 10 - i }}>
                                            {asset.symbol[0]}
                                        </div>
                                    ))}
                                    <div className="w-10 h-10 rounded-full bg-[#1a1d26] border-2 border-[#050509] flex items-center justify-center text-xs text-gray-400" style={{ zIndex: 0 }}>
                                        +2
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Assets List */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-lg font-semibold text-white px-1">Your Assets</h3>
                            <div className="space-y-3">
                                {assets.map((asset) => (
                                    <div key={asset.symbol} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-800 to-black border border-white/10 flex items-center justify-center">
                                                <span className="font-bold text-cyan-500">{asset.symbol}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-white">{asset.name}</h4>
                                                <p className="text-sm text-gray-400">{asset.balance} {asset.symbol}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium text-white">{asset.value}</p>
                                            <p className={`text-sm ${asset.change.startsWith('+') ? 'text-green-400' : asset.change.startsWith('-') ? 'text-red-400' : 'text-gray-400'}`}>
                                                {asset.change}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                                <button className="text-sm text-cyan-400 hover:text-cyan-300">View All</button>
                            </div>
                            <div className="p-1 space-y-4">
                                {transactions.map((tx) => (
                                    <div key={tx.id} className="flex items-start gap-4 relative">
                                        <div className="absolute left-[19px] top-10 bottom-[-16px] w-[2px] bg-white/5 last:hidden"></div>
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${tx.type === 'receive' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                                tx.type === 'send' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                                    'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                            }`}>
                                            {tx.type === 'receive' ? <ArrowDownLeft size={18} /> :
                                                tx.type === 'send' ? <ArrowUpRight size={18} /> :
                                                    <RefreshCw size={18} />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-sm font-medium text-white capitalize">{tx.type}</p>
                                                <p className={`text-sm font-medium ${tx.amount.startsWith('+') ? 'text-green-400' : 'text-white'}`}>
                                                    {tx.amount}
                                                </p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs text-gray-500">{tx.date}</p>
                                                <p className="text-xs text-gray-500">{tx.value}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ZKProofModal isOpen={showZKModal} onClose={() => setShowZKModal(false)} />
        </div>
    );
}
