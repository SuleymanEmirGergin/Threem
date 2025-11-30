import { Shield, Lock, EyeOff, CheckCircle2, XCircle, Loader2, ShieldCheck } from 'lucide-react';

type VerificationStatus = 'verified' | 'failed' | 'pending';

interface ZKAgeVerificationCardProps {
  status: VerificationStatus;
  transactionHash?: string;
  network?: string;
  timestamp?: Date;
}

export function ZKAgeVerificationCard({
  status,
  transactionHash = '0x0000...0000',
  network = 'Ethereum Mainnet',
  timestamp = new Date(),
}: ZKAgeVerificationCardProps) {
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
      case 'verified':
        return {
          icon: CheckCircle2,
          title: 'Age Requirement Satisfied',
          subtitle: 'Sender is verified as 18+',
          description: 'Verified using Zero-Knowledge Proof',
          color: 'emerald',
          bgGradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
          borderColor: 'border-emerald-500/30',
          textColor: 'text-emerald-400',
          iconColor: 'text-emerald-500',
          glowColor: 'shadow-emerald-500/20',
        };
      case 'failed':
        return {
          icon: XCircle,
          title: 'Age Requirement Not Met',
          subtitle: 'Sender could not verify 18+ status',
          description: 'Verification failed via Zero-Knowledge Proof',
          color: 'red',
          bgGradient: 'from-red-500/10 via-red-500/5 to-transparent',
          borderColor: 'border-red-500/30',
          textColor: 'text-red-400',
          iconColor: 'text-red-500',
          glowColor: 'shadow-red-500/20',
        };
      case 'pending':
        return {
          icon: Loader2,
          title: 'Age Verification Pending',
          subtitle: 'Cryptographic proof in progress',
          description: 'Generating Zero-Knowledge Proof',
          color: 'yellow',
          bgGradient: 'from-yellow-500/10 via-yellow-500/5 to-transparent',
          borderColor: 'border-yellow-500/30',
          textColor: 'text-yellow-400',
          iconColor: 'text-yellow-500',
          glowColor: 'shadow-yellow-500/20',
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
            <Lock className="w-7 h-7 text-zinc-400" strokeWidth={1.5} />
            <Shield className="w-4 h-4 text-zinc-500 absolute -top-1 -right-1" strokeWidth={2} />
          </div>
        </div>
        <div>
          <h1 className="text-white mb-1">Transaction Privacy Result</h1>
          <p className="text-zinc-400 text-sm">Zero-Knowledge Verified Information</p>
        </div>
      </div>

      {/* Main Status Card */}
      <div
        className={`relative bg-gradient-to-br ${config.bgGradient} backdrop-blur-xl rounded-3xl p-8 border ${config.borderColor} shadow-2xl ${config.glowColor}`}
      >
        {/* Status Badge */}
        <div className="flex justify-center mb-6">
          <div className={`p-5 rounded-full bg-black/50 border-2 ${config.borderColor} ${config.glowColor} shadow-xl`}>
            <StatusIcon
              className={`w-14 h-14 ${config.iconColor} ${status === 'pending' ? 'animate-spin' : ''}`}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Status Text */}
        <div className="text-center space-y-3">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border ${config.borderColor}`}>
            <ShieldCheck className={`w-5 h-5 ${config.iconColor}`} strokeWidth={2} />
            <span className={`${config.textColor}`}>18+ Verified</span>
          </div>
          
          <h2 className="text-white">{config.title}</h2>
          <p className="text-zinc-300">{config.subtitle}</p>
          
          <div className="pt-3">
            <p className="text-zinc-400 text-sm">{config.description}</p>
            <p className="text-zinc-500 text-xs mt-2">No personal data was exposed</p>
          </div>
        </div>
      </div>

      {/* Hidden Information Notice */}
      <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-zinc-400" strokeWidth={2} />
              <Shield className="w-5 h-5 text-zinc-400" strokeWidth={2} />
            </div>
          </div>
          <div>
            <p className="text-zinc-300 leading-relaxed text-sm">
              Identity, birth date, wallet balance and all personal data remain fully private.
            </p>
          </div>
        </div>
      </div>

      {/* Transaction Reference Section */}
      <div className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-6 border border-zinc-800/50">
        <h3 className="text-zinc-400 text-xs uppercase tracking-wider mb-4">Transaction Reference</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Transaction Hash</span>
            <span className="text-zinc-300 text-sm font-mono">{transactionHash}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Network</span>
            <span className="text-zinc-300 text-sm font-mono">{network}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 text-sm">Timestamp</span>
            <span className="text-zinc-300 text-sm font-mono">{formatTimestamp(timestamp)}</span>
          </div>
        </div>
      </div>

      {/* Trust & Compliance Indicators */}
      <div className="flex flex-wrap gap-2 justify-center">
        <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
          <span className="text-emerald-400 text-xs uppercase tracking-wider">ZK Verified</span>
        </div>
        <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
          <span className="text-blue-400 text-xs uppercase tracking-wider">Privacy Preserved</span>
        </div>
        <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
          <span className="text-purple-400 text-xs uppercase tracking-wider">Compliance: Age Only</span>
        </div>
      </div>

      {/* Action Buttons */}
      {status === 'verified' && (
        <div className="flex flex-col gap-3">
          <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-colors shadow-lg shadow-emerald-500/20">
            Accept Transaction
          </button>
          <button className="w-full py-3 text-zinc-400 hover:text-zinc-300 text-sm transition-colors">
            View Privacy Policy
          </button>
        </div>
      )}
    </div>
  );
}
