import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HomeDashboard } from './screens/HomeDashboard';
import { OnboardingWelcome } from './screens/OnboardingWelcome';
import { CreateWalletConfirmation } from './screens/CreateWalletConfirmation';
import { SecurityMethodsSelection } from './screens/SecurityMethodsSelection';
import { SetPINScreen } from './screens/SetPINScreen';
import { PINUnlock } from './screens/PINUnlock';
import { MotionGestureSetup } from './screens/MotionGestureSetup';
import { MotionUnlock } from './screens/MotionUnlock';
import { StegoImageSetup } from './screens/StegoImageSetup';
import { StegoImageUnlock } from './screens/StegoImageUnlock';
import { StegoSoundSetup } from './screens/StegoSoundSetup';
import { StegoSoundUnlock } from './screens/StegoSoundUnlock';
import { Settings } from './screens/Settings';
import { QRScanScreen } from './screens/QRScanScreen';
import { PaymentReview } from './screens/PaymentReview';
import { PaymentProcessing } from './screens/PaymentProcessing';
import { PaymentSuccess } from './screens/PaymentSuccess';
import { PaymentFailed } from './screens/PaymentFailed';
import { AllScreensDemo } from './components/AllScreensDemo';
import { SimpleDemo } from './components/SimpleDemo';

type ScreenName =
    | 'menu'
    | 'onboarding'
    | 'create-wallet'
    | 'security-selection'
    | 'set-pin'
    | 'pin-unlock'
    | 'motion-setup'
    | 'motion-unlock'
    | 'stego-image-setup'
    | 'stego-image-unlock'
    | 'stego-sound-setup'
    | 'stego-sound-unlock'
    | 'home'
    | 'settings'
    | 'qr-scan'
    | 'payment-review'
    | 'payment-processing'
    | 'payment-success'
    | 'payment-failed'
    | 'all-screens-demo'
    | 'simple-demo';

export function DemoApp() {
    const [currentScreen, setCurrentScreen] = useState<ScreenName>('menu');

    const renderScreen = () => {
        switch (currentScreen) {
            case 'onboarding':
                return <OnboardingWelcome onGetStarted={() => setCurrentScreen('create-wallet')} />;
            case 'create-wallet':
                return <CreateWalletConfirmation onConfirm={() => setCurrentScreen('security-selection')} onBack={() => setCurrentScreen('onboarding')} />;
            case 'security-selection':
                return <SecurityMethodsSelection onSelect={(method) => {
                    if (method === 'pin') setCurrentScreen('set-pin');
                    if (method === 'pattern') setCurrentScreen('motion-setup'); // Assuming pattern maps to motion for demo
                    if (method === 'biometric') setCurrentScreen('stego-image-setup'); // Placeholder mapping
                }} />;
            case 'set-pin':
                return <SetPINScreen onComplete={() => setCurrentScreen('home')} />;
            case 'pin-unlock':
                return <PINUnlock onUnlock={() => setCurrentScreen('home')} />;
            case 'motion-setup':
                return <MotionGestureSetup onComplete={() => setCurrentScreen('home')} />;
            case 'motion-unlock':
                return <MotionUnlock onUnlock={() => setCurrentScreen('home')} />;
            case 'stego-image-setup':
                return <StegoImageSetup onComplete={() => setCurrentScreen('home')} />;
            case 'stego-image-unlock':
                return <StegoImageUnlock onUnlock={() => setCurrentScreen('home')} />;
            case 'stego-sound-setup':
                return <StegoSoundSetup onComplete={() => setCurrentScreen('home')} />;
            case 'stego-sound-unlock':
                return <StegoSoundUnlock onUnlock={() => setCurrentScreen('home')} />;
            case 'home':
                return <HomeDashboard onScanQR={() => setCurrentScreen('qr-scan')} onSettings={() => setCurrentScreen('settings')} />;
            case 'settings':
                return <Settings onBack={() => setCurrentScreen('home')} />;
            case 'qr-scan':
                return <QRScanScreen onScan={(data) => setCurrentScreen('payment-review')} onBack={() => setCurrentScreen('home')} />;
            case 'payment-review':
                return <PaymentReview onConfirm={() => setCurrentScreen('payment-processing')} onBack={() => setCurrentScreen('qr-scan')} />;
            case 'payment-processing':
                return <PaymentProcessing onComplete={() => setCurrentScreen('payment-success')} />; // Auto transition usually
            case 'payment-success':
                return <PaymentSuccess onHome={() => setCurrentScreen('home')} />;
            case 'payment-failed':
                return <PaymentFailed onRetry={() => setCurrentScreen('payment-review')} onHome={() => setCurrentScreen('home')} />;
            case 'all-screens-demo':
                return <AllScreensDemo onSelectScreen={(id) => console.log('Selected', id)} />;
            case 'simple-demo':
                return <SimpleDemo />;
            default:
                return (
                    <div className="min-h-screen bg-black text-white p-8 overflow-y-auto">
                        <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">WDK Demo Menu</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
                            <MenuSection title="Onboarding & Auth">
                                <MenuButton onClick={() => setCurrentScreen('onboarding')} label="Onboarding Flow" />
                                <MenuButton onClick={() => setCurrentScreen('create-wallet')} label="Create Wallet" />
                                <MenuButton onClick={() => setCurrentScreen('security-selection')} label="Security Selection" />
                            </MenuSection>

                            <MenuSection title="Authentication Methods">
                                <MenuButton onClick={() => setCurrentScreen('set-pin')} label="Set PIN" />
                                <MenuButton onClick={() => setCurrentScreen('pin-unlock')} label="PIN Unlock" />
                                <MenuButton onClick={() => setCurrentScreen('motion-setup')} label="Motion Setup" />
                                <MenuButton onClick={() => setCurrentScreen('motion-unlock')} label="Motion Unlock" />
                                <MenuButton onClick={() => setCurrentScreen('stego-image-setup')} label="Stego Image Setup" />
                                <MenuButton onClick={() => setCurrentScreen('stego-image-unlock')} label="Stego Image Unlock" />
                                <MenuButton onClick={() => setCurrentScreen('stego-sound-setup')} label="Stego Sound Setup" />
                                <MenuButton onClick={() => setCurrentScreen('stego-sound-unlock')} label="Stego Sound Unlock" />
                            </MenuSection>

                            <MenuSection title="Main App">
                                <MenuButton onClick={() => setCurrentScreen('home')} label="Home Dashboard" />
                                <MenuButton onClick={() => setCurrentScreen('settings')} label="Settings" />
                                <MenuButton onClick={() => setCurrentScreen('all-screens-demo')} label="All Screens Component" />
                                <MenuButton onClick={() => setCurrentScreen('simple-demo')} label="Simple Demo Component" />
                            </MenuSection>

                            <MenuSection title="Payment Flow">
                                <MenuButton onClick={() => setCurrentScreen('qr-scan')} label="QR Scan" />
                                <MenuButton onClick={() => setCurrentScreen('payment-review')} label="Payment Review" />
                                <MenuButton onClick={() => setCurrentScreen('payment-processing')} label="Payment Processing" />
                                <MenuButton onClick={() => setCurrentScreen('payment-success')} label="Payment Success" />
                                <MenuButton onClick={() => setCurrentScreen('payment-failed')} label="Payment Failed" />
                            </MenuSection>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="relative min-h-screen bg-black">
            {currentScreen !== 'menu' && (
                <button
                    onClick={() => setCurrentScreen('menu')}
                    className="fixed top-4 left-4 z-50 px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
                >
                    ← Menu
                </button>
            )}
            {renderScreen()}
        </div>
    );
}

function MenuSection({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-3 mb-6">
            <h2 className="text-xl font-semibold text-white/80 border-b border-white/10 pb-2">{title}</h2>
            <div className="grid gap-2">
                {children}
            </div>
        </div>
    );
}

function MenuButton({ onClick, label }: { onClick: () => void, label: string }) {
    return (
        <button
            onClick={onClick}
            className="w-full text-left px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all text-white/80 hover:text-white group"
        >
            <span className="group-hover:translate-x-1 transition-transform inline-block">
                {label}
            </span>
        </button>
    );
}
