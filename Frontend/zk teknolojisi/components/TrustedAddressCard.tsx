import { Shield, Lock, CheckCircle2, AlertTriangle, Loader2, ShieldCheck, ShieldAlert } from 'lucide-react';

type TrustStatus = 'trusted' | 'untrusted' | 'pending';

interface TrustedAddressCardProps {
  status: TrustStatus;
  network?: string;
  verificationId?: string;
  timestamp?: Date;
}

export function TrustedAddressCard({
  status,
  network = 'Ethereum Mainnet',
  verificationId = '0x0000...0000',
  timestamp = new Date(),
}: TrustedAddressCardProps) {
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
      case 'trusted':
        return {
          icon: CheckCircle2,
          badgeIcon: ShieldCheck,
          title: 'Trusted Address',
          description: 'This wallet address has passed cryptographic trust verification.',
          detailText: 'On-chain risk analysis, AML screening, and behavioral reputation scoring completed successfully.',
          color: 'emerald',
          bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
          borderColor: 'border-emerald-500/30',
          textColor: 'text-emerald-400',
          iconColor: 'text-emerald-500',
          glowColor: 'shadow-emerald-500/20',
          badgeText: 'Verified Trusted',
        };
      case 'untrusted':
        return {
          icon: AlertTriangle,
          badgeIcon: ShieldAlert,
          title: 'Untrusted Address',
          description: 'This wallet address does not meet minimum trust requirements.',
          detailText: 'Risk analysis indicates potential concerns. Proceed with caution.',
          color: 'amber',
          bgGradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
          borderColor: 'border-amber-500/30',
          textColor: 'text-amber-400',
          iconColor: 'text-amber-500',
          glowColor: 'shadow-amber-500/20',
          badgeText: 'Not Trusted',
        };
      case 'pending':
        return {
          icon: Loader2,
          badgeIcon: Shield,
          title: 'Verification Pending',
          description: 'Cryptographic trust verification is in progress.',
          detailText: 'Analyzing on-chain reputation and performing AML screening via Zero-Knowledge Proof.',
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
  const BadgeIcon = config.badgeIcon;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-2">
          <div className="relative">
            <Shield className="w-8 h-8 text-zinc-400" strokeWidth={1.5} />
            <CheckCircle2 className="w-4 h-4 text-zinc-500 absolute -bottom-1 -right-1" strokeWidth={2} />
          </div>
        </div>
        <div>
          <h1 className="text-white mb-1">Address Trust Status</h1>
          <p className="text-zinc-400 text-sm">Zero-Knowledge Reputation Verification</p>
        </div>
      </div>

      {/* Main Trust Status Card */}
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

        {/* Trust Badge */}
        <div className="flex justify-center mb-4">
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/40 border ${config.borderColor}`}>
            <BadgeIcon className={`w-5 h-5 ${config.iconColor}`} strokeWidth={2} />
            <span className={`${config.textColor}`}>{config.badgeText}</span>
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center space-y-4">
          <h2 className="text-white">{config.title}</h2>
          <p className="text-zinc-300 leading-relaxed">{config.description}</p>
          <p className="text-zinc-400 text-sm leading-relaxed">{config.detailText}</p>
        </div>
      </div>

      {/* Privacy Assurance Notice */}
      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <Lock className="w-5 h-5 text-zinc-400" strokeWidth={2} />
          </div>
          <div>
            <p className="text-zinc-300 leading-relaxed text-sm">
              No transaction history, identity, balance, or ownership data was exposed during this verification.
            </p>
          </div>
        </div>
      </div>

      {/* Verification Metadata */}
      <div className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50">
        <h3 className="text-zinc-400 text-xs uppercase tracking-wider mb-4">Verification Metadata</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Network</span>
            <span className="text-zinc-300 text-sm font-mono">{network}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Verification ID</span>
            <span className="text-zinc-300 text-sm font-mono">{verificationId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Trust Check At</span>
            <span className="text-zinc-300 text-sm font-mono">{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      {status === 'trusted' && (
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
            <div className="text-emerald-400 text-xs uppercase tracking-wider">AML Clear</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
            <div className="text-emerald-400 text-xs uppercase tracking-wider">Risk: Low</div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
            <div className="text-emerald-400 text-xs uppercase tracking-wider">Verified</div>
          </div>
        </div>
      )}

      {status === 'untrusted' && (
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center">
            <div className="text-amber-400 text-xs uppercase tracking-wider">Trust: Minimal</div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-center">
            <div className="text-amber-400 text-xs uppercase tracking-wider">Caution</div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {status === 'trusted' && (
        <div className="flex flex-col gap-3">
          <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
            Proceed with Transaction
          </button>
        </div>
      )}

      {status === 'untrusted' && (
        <div className="flex flex-col gap-3">
          <button className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-colors shadow-lg shadow-amber-500/20">
            Review Risk Details
          </button>
          <button className="w-full py-3 text-zinc-400 hover:text-zinc-300 text-sm transition-colors">
            Cancel Transaction
          </button>
        </div>
      )}
    </div>
  );
}
