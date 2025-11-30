import { Shield, ShoppingCart, Lock, EyeOff, CheckCircle2, XCircle, Loader2, ShieldCheck } from 'lucide-react';

type EligibilityStatus = 'approved' | 'rejected' | 'pending';

interface ZKPurchaseEligibilityCardProps {
  status: EligibilityStatus;
  network?: string;
  proofId?: string;
  timestamp?: Date;
}

export function ZKPurchaseEligibilityCard({
  status,
  network = 'Ethereum Mainnet',
  proofId = '0x0000...0000',
  timestamp = new Date(),
}: ZKPurchaseEligibilityCardProps) {
  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'approved':
        return {
          icon: CheckCircle2,
          title: 'Purchase Approved',
          description: 'The sender has cryptographically proven they are able to complete this purchase.',
          color: 'emerald',
          bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
          borderColor: 'border-emerald-500/30',
          textColor: 'text-emerald-400',
          iconColor: 'text-emerald-500',
          glowColor: 'shadow-emerald-500/20',
          badgeText: 'Eligible',
        };
      case 'rejected':
        return {
          icon: XCircle,
          title: 'Purchase Blocked',
          description: 'The sender could not cryptographically prove purchase eligibility.',
          color: 'red',
          bgGradient: 'from-red-500/10 via-red-500/5 to-transparent',
          borderColor: 'border-red-500/30',
          textColor: 'text-red-400',
          iconColor: 'text-red-500',
          glowColor: 'shadow-red-500/20',
          badgeText: 'Not Eligible',
        };
      case 'pending':
        return {
          icon: Loader2,
          title: 'Verification Pending',
          description: 'Zero-Knowledge purchase eligibility proof is being generated and verified.',
          color: 'yellow',
          bgGradient: 'from-yellow-500/10 via-yellow-500/5 to-transparent',
          borderColor: 'border-yellow-500/30',
          textColor: 'text-yellow-400',
          iconColor: 'text-yellow-500',
          glowColor: 'shadow-yellow-500/20',
          badgeText: 'Checking...',
        };
    }
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div className="relative">
            <Shield className="w-8 h-8 text-zinc-400" strokeWidth={1.5} />
            <ShoppingCart className="w-4 h-4 text-zinc-500 absolute -bottom-1 -right-1" strokeWidth={2} />
          </div>
        </div>
        <div>
          <h1 className="text-white mb-1">Purchase Eligibility Status</h1>
          <p className="text-zinc-400 text-sm">Zero-Knowledge Payment Capability Verification</p>
        </div>
      </div>

      {/* Main Verification Card */}
      <div
        className={`relative bg-gradient-to-br ${config.bgGradient} backdrop-blur-xl rounded-3xl p-8 border ${config.borderColor} shadow-2xl ${config.glowColor}`}
      >
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          <div className={`p-5 rounded-full bg-black/50 border-2 ${config.borderColor} ${config.glowColor} shadow-xl`}>
            <StatusIcon
              className={`w-14 h-14 ${config.iconColor} ${status === 'pending' ? 'animate-spin' : ''}`}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Eligibility Badge */}
        <div className="flex justify-center mb-4">
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 border ${config.borderColor}`}>
            <ShieldCheck className={`w-5 h-5 ${config.iconColor}`} strokeWidth={2} />
            <span className={`${config.textColor}`}>{config.badgeText}</span>
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center space-y-4">
          <h2 className="text-white">{config.title}</h2>
          <p className="text-zinc-300 leading-relaxed">{config.description}</p>
        </div>

        {/* Privacy Caption */}
        <div className="text-center pt-6 mt-6 border-t border-zinc-700/50">
          <p className="text-zinc-500 text-xs">
            Verified using Zero-Knowledge Proof. No financial data was revealed.
          </p>
        </div>
      </div>

      {/* Privacy Assurance Notice */}
      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-zinc-400" strokeWidth={2} />
              <EyeOff className="w-5 h-5 text-zinc-400" strokeWidth={2} />
            </div>
          </div>
          <div>
            <p className="text-zinc-300 leading-relaxed text-sm">
              Wallet balance, assets, transaction history, token amounts, and portfolio value remain fully private.
            </p>
          </div>
        </div>
      </div>

      {/* ZK Metadata */}
      <div className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50">
        <h3 className="text-zinc-400 text-xs uppercase tracking-wider mb-4">Verification Metadata</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Network</span>
            <span className="text-zinc-300 text-sm font-mono">{network}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Proof ID</span>
            <span className="text-zinc-300 text-sm font-mono">{proofId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Verified At</span>
            <span className="text-zinc-300 text-sm font-mono">{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Payment Gate Indicators */}
      {status === 'approved' && (
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
            <div className="text-emerald-400 text-xs uppercase tracking-wider">Funds OK</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
            <div className="text-emerald-400 text-xs uppercase tracking-wider">ZK Verified</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
            <div className="text-emerald-400 text-xs uppercase tracking-wider">Ready</div>
          </div>
        </div>
      )}

      {status === 'rejected' && (
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
            <div className="text-red-400 text-xs uppercase tracking-wider">Blocked</div>
          </div>
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-center">
            <div className="text-red-400 text-xs uppercase tracking-wider">Cannot Proceed</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {status === 'approved' && (
        <div className="flex flex-col gap-3">
          <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
            Complete Purchase
          </button>
          <button className="w-full py-3 text-zinc-400 hover:text-zinc-300 text-sm transition-colors">
            View Payment Terms
          </button>
        </div>
      )}

      {status === 'rejected' && (
        <div className="flex flex-col gap-3">
          <button className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors shadow-lg shadow-red-500/20">
            Transaction Cancelled
          </button>
          <button className="w-full py-3 text-zinc-400 hover:text-zinc-300 text-sm transition-colors">
            Contact Support
          </button>
        </div>
      )}
    </div>
  );
}
