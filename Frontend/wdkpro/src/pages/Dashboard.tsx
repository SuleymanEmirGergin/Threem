import React, { useEffect } from 'react';
import { useWalletStore } from '../store/useWalletStore';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, DollarSign, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
    const { wallet, transactions, refreshBalance, loadHistory, isLoading } = useWalletStore();

    useEffect(() => {
        refreshBalance();
        loadHistory();
    }, []);

    if (!wallet) return null;

    return (
        <div className="space-y-8">
            {/* Balance Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <p className="text-indigo-200 font-medium mb-1">Total Balance</p>
                            <h2 className="text-5xl font-bold tracking-tight">
                                {wallet.balance.toLocaleString()} <span className="text-2xl text-indigo-200">USDT</span>
                            </h2>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                to="/settings"
                                className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                            >
                                <Settings className="w-5 h-5" />
                            </Link>
                            <button
                                onClick={() => refreshBalance()}
                                className={`p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors ${isLoading ? 'animate-spin' : ''}`}
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Link to="/send" className="flex-1 bg-white text-indigo-600 py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                            Send
                        </Link>
                        <button className="flex-1 bg-indigo-500/30 text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500/40 transition-colors backdrop-blur-sm">
                            <ArrowDownLeft className="w-5 h-5" />
                            Receive
                        </button>
                        <button className="flex-1 bg-indigo-500/30 text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-500/40 transition-colors backdrop-blur-sm">
                            <DollarSign className="w-5 h-5" />
                            Buy/Sell
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div>
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                    {transactions.length === 0 ? (
                        <div className="p-8 text-center text-slate-500">
                            No transactions yet
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-800">
                            {transactions.map((tx: any) => (
                                <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'send' ? 'bg-red-500/10 text-red-500' :
                                            tx.type === 'receive' ? 'bg-emerald-500/10 text-emerald-500' :
                                                'bg-blue-500/10 text-blue-500'
                                            }`}>
                                            {tx.type === 'send' ? <ArrowUpRight className="w-5 h-5" /> :
                                                tx.type === 'receive' ? <ArrowDownLeft className="w-5 h-5" /> :
                                                    <DollarSign className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white capitalize">{tx.type}</p>
                                            <p className="text-sm text-slate-500">{new Date(tx.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold ${tx.type === 'send' ? 'text-white' : 'text-emerald-400'
                                            }`}>
                                            {tx.type === 'send' ? '-' : '+'}{tx.amount} USDT
                                        </p>
                                        <p className="text-xs text-slate-500 capitalize">{tx.status}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
