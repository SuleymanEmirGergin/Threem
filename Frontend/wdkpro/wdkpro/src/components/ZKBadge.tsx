import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface ZKBadgeProps {
    type: 'balance' | 'age';
}

export const ZKBadge: React.FC<ZKBadgeProps> = ({ type }) => {
    return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ZK {type === 'balance' ? 'Balance' : 'Age'} Verified</span>
        </div>
    );
};
