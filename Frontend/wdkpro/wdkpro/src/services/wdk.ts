import type { Wallet, Transaction } from '../types';

// Mock delay helper
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class WDKService {
    static async createWallet(): Promise<Wallet> {
        await delay(1000);
        const wallet: Wallet = {
            address: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
            balance: 1000, // Initial airdrop for testing
            mnemonic: 'test wallet mnemonic phrase for development purposes only'
        };
        return wallet;
    }

    static async importWallet(mnemonic: string): Promise<Wallet> {
        await delay(1000);
        // Deterministic mock for demo
        return {
            address: '0xImportedWalletAddress123456789',
            balance: 500,
            mnemonic
        };
    }

    static async getBalance(_address: string): Promise<number> {
        await delay(500);
        return 1000;
    }

    static async sendTransaction(from: string, to: string, amount: number): Promise<Transaction> {
        await delay(2000);
        return {
            id: 'tx_' + Date.now(),
            type: 'send',
            amount,
            to,
            from,
            date: new Date().toISOString(),
            status: 'confirmed'
        };
    }

    static async getHistory(address: string): Promise<Transaction[]> {
        await delay(800);
        return [
            {
                id: 'tx_1',
                type: 'receive',
                amount: 100,
                from: '0xExternalUser',
                to: address,
                date: new Date(Date.now() - 86400000).toISOString(),
                status: 'confirmed'
            },
            {
                id: 'tx_2',
                type: 'buy',
                amount: 500,
                date: new Date(Date.now() - 172800000).toISOString(),
                status: 'confirmed'
            }
        ];
    }
}
