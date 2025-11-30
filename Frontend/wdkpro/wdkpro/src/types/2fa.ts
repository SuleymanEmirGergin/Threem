export interface Device {
    id: string;
    name: string;
    type: 'mobile' | 'desktop';
    status: 'active' | 'locked' | 'blocked';
    registeredAt: string;
    lastActiveAt: string;
    failedAttempts: number;
    lockoutUntil: string | null; // ISO Date string
}

export interface AuthRequest {
    id: string;
    type: 'transfer' | 'settings' | 'login';
    description: string;
    status: 'pending' | 'approved' | 'rejected' | 'expired';
    createdAt: string;
    expiresAt: string;
    payload?: any; // Transaction details etc.
}

export interface TwoFactorState {
    devices: Device[];
    activeRequest: AuthRequest | null;
    isMobileSimulatorOpen: boolean;

    // Actions
    registerDevice: (name: string, type: 'mobile' | 'desktop') => void;
    updateDeviceStatus: (deviceId: string, status: Device['status'], lockoutUntil?: string | null) => void;
    incrementFailedAttempts: (deviceId: string) => void;
    resetFailedAttempts: (deviceId: string) => void;
    createAuthRequest: (type: AuthRequest['type'], description: string, payload?: any) => string; // Returns request ID
    resolveAuthRequest: (requestId: string, approved: boolean) => void;
    toggleMobileSimulator: (isOpen: boolean) => void;
}
