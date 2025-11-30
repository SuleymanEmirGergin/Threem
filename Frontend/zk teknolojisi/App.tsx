import { useState } from 'react';
import { ZKAgeVerificationCard } from './components/ZKAgeVerificationCard';
import { TrustedAddressCard } from './components/TrustedAddressCard';
import { ZKPurchaseEligibilityCard } from './components/ZKPurchaseEligibilityCard';
import { Shield } from 'lucide-react';

type VerificationStatus = 'verified' | 'failed' | 'pending';
type EligibilityStatus = 'approved' | 'rejected' | 'pending';

export default function App() {
  const [activeModule, setActiveModule] = useState<'age' | 'address' | 'purchase'>('age');
  const [ageStatus, setAgeStatus] = useState<VerificationStatus>('verified');
  const [addressStatus, setAddressStatus] = useState<'trusted' | 'untrusted' | 'pending'>('trusted');
  const [purchaseStatus, setPurchaseStatus] = useState<EligibilityStatus>('approved');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0A0A0A] p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Main Header */}
        <div className="text-center space-y-4 pt-6 pb-4">
          <div className="flex justify-center">
            <div className="p-3 bg-zinc-900/50 rounded-full border border-zinc-800">
              <Shield className="w-8 h-8 text-emerald-400" strokeWidth={1.5} />
            </div>
          </div>
          <div>
            <h1 className="text-white mb-2">Zero-Knowledge Verification Suite</h1>
            <p className="text-zinc-400">Privacy-Preserving Transaction Verification</p>
          </div>
        </div>

        {/* Module Selector */}
        <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl p-1 border border-zinc-800">
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setActiveModule('age')}
              className={`py-3 rounded-xl transition-all ${
                activeModule === 'age'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Age 18+
            </button>
            <button
              onClick={() => setActiveModule('address')}
              className={`py-3 rounded-xl transition-all ${
                activeModule === 'address'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Address Trust
            </button>
            <button
              onClick={() => setActiveModule('purchase')}
              className={`py-3 rounded-xl transition-all ${
                activeModule === 'purchase'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-zinc-400 hover:text-zinc-300'
              }`}
            >
              Purchase
            </button>
          </div>
        </div>

        {/* Demo Controls */}
        <div className="bg-zinc-900/30 backdrop-blur-sm rounded-2xl p-4 border border-zinc-800/50">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-3">Demo Controls</p>
          
          {activeModule === 'age' && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setAgeStatus('verified')}
                className="px-3 py-2 text-sm bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
              >
                ✓ Verified
              </button>
              <button
                onClick={() => setAgeStatus('failed')}
                className="px-3 py-2 text-sm bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                ✗ Failed
              </button>
              <button
                onClick={() => setAgeStatus('pending')}
                className="px-3 py-2 text-sm bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors"
              >
                ○ Pending
              </button>
            </div>
          )}

          {activeModule === 'address' && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setAddressStatus('trusted')}
                className="px-3 py-2 text-sm bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
              >
                ✓ Trusted
              </button>
              <button
                onClick={() => setAddressStatus('untrusted')}
                className="px-3 py-2 text-sm bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/30 hover:bg-amber-500/30 transition-colors"
              >
                ⚠ Untrusted
              </button>
              <button
                onClick={() => setAddressStatus('pending')}
                className="px-3 py-2 text-sm bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors"
              >
                ○ Pending
              </button>
            </div>
          )}

          {activeModule === 'purchase' && (
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setPurchaseStatus('approved')}
                className="px-3 py-2 text-sm bg-emerald-500/20 text-emerald-400 rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
              >
                ✓ Approved
              </button>
              <button
                onClick={() => setPurchaseStatus('rejected')}
                className="px-3 py-2 text-sm bg-red-500/20 text-red-400 rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                ✗ Rejected
              </button>
              <button
                onClick={() => setPurchaseStatus('pending')}
                className="px-3 py-2 text-sm bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors"
              >
                ○ Pending
              </button>
            </div>
          )}
        </div>

        {/* Active Module Display */}
        <div>
          {activeModule === 'age' && (
            <ZKAgeVerificationCard
              status={ageStatus}
              transactionHash="0x9a4f...3d2b"
              network="Ethereum Mainnet"
              timestamp={new Date()}
            />
          )}

          {activeModule === 'address' && (
            <TrustedAddressCard
              status={addressStatus}
              network="Ethereum Mainnet"
              verificationId="0x2c8a...7f19"
              timestamp={new Date()}
            />
          )}

          {activeModule === 'purchase' && (
            <ZKPurchaseEligibilityCard
              status={purchaseStatus}
              network="Ethereum Mainnet"
              proofId="0x5b9c...4e8a"
              timestamp={new Date()}
            />
          )}
        </div>
      </div>
    </div>
  );
}
