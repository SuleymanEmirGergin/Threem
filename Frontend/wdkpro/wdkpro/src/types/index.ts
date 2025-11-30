export interface Wallet {
    address: string;
    balance: number; // USDT
    mnemonic?: string;
}

export interface Transaction {
    id: string;
    type: 'send' | 'receive' | 'buy' | 'sell';
    amount: number;
    to?: string;
    from?: string;
    date: string;
    status: 'pending' | 'confirmed' | 'failed';
    zkProof?: string; // Description of ZK proof attached
    stegoMode?: 'pattern' | 'pin' | 'audio' | 'stego' | 'none';
}

export interface WDKState {
    wallet: Wallet | null;
    transactions: Transaction[];
    isLoading: boolean;
    error: string | null;
}
