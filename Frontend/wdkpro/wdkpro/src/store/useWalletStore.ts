import { create } from 'zustand';
import type { WDKState } from '../types';
import { WDKService } from '../services/wdk';

interface WalletStore extends WDKState {
    securitySettings: {
        activeMethod: 'pin' | 'password' | 'pattern' | 'image' | 'audio' | null;
        secrets: {
            pin?: string;
            password?: string;
            pattern?: string;
            image?: string;
            audio?: string;
        };
        multiLayer: {
            enabled: boolean;
            threshold: number;
        };
    };
    updateSecuritySettings: (settings: Partial<WalletStore['securitySettings']>) => void;
    createWallet: () => Promise<void>;
    importWallet: (mnemonic: string) => Promise<void>;
    refreshBalance: () => Promise<void>;
    sendTransaction: (to: string, amount: number, zkProof?: string, stegoMode?: 'pattern' | 'pin' | 'audio' | 'stego') => Promise<void>;
    loadHistory: () => Promise<void>;
    reset: () => void;
}

export const useWalletStore = create<WalletStore>((set, get) => ({
    wallet: null,
    transactions: [],
    isLoading: false,
    error: null,

    // Default Security Settings
    securitySettings: {
        activeMethod: null,
        secrets: {},
        multiLayer: {
            enabled: false,
            threshold: 1000,
        },
    },

    updateSecuritySettings: (settings) => set((state) => ({
        securitySettings: { ...state.securitySettings, ...settings }
    })),

    createWallet: async () => {
        set({ isLoading: true, error: null });
        try {
            const wallet = await WDKService.createWallet();
            set({ wallet, isLoading: false });
        } catch (err) {
            set({ error: 'Failed to create wallet', isLoading: false });
        }
    },

    importWallet: async (mnemonic: string) => {
        set({ isLoading: true, error: null });
        try {
            const wallet = await WDKService.importWallet(mnemonic);
            set({ wallet, isLoading: false });
        } catch (err) {
            set({ error: 'Failed to import wallet', isLoading: false });
        }
    },

    refreshBalance: async () => {
        const { wallet } = get();
        if (!wallet) return;
        try {
            const balance = await WDKService.getBalance(wallet.address);
            set({ wallet: { ...wallet, balance } });
        } catch (err) {
            console.error('Failed to refresh balance');
        }
    },

    sendTransaction: async (to, amount, zkProof, stegoMode) => {
        set({ isLoading: true, error: null });
        const { wallet } = get();
        if (!wallet) return;

        try {
            const tx = await WDKService.sendTransaction(wallet.address, to, amount);
            // Add metadata
            tx.zkProof = zkProof;
            tx.stegoMode = stegoMode || 'none';

            set(state => ({
                transactions: [tx, ...state.transactions],
                wallet: { ...state.wallet!, balance: state.wallet!.balance - amount },
                isLoading: false
            }));
        } catch (err) {
            set({ error: 'Transaction failed', isLoading: false });
        }
    },

    loadHistory: async () => {
        const { wallet } = get();
        if (!wallet) return;
        set({ isLoading: true });
        try {
            const transactions = await WDKService.getHistory(wallet.address);
            set({ transactions, isLoading: false });
        } catch (err) {
            set({ error: 'Failed to load history', isLoading: false });
        }
    },

    reset: () => set({ wallet: null, transactions: [], error: null })
}));
