import { create } from 'zustand';
import type { TwoFactorState, AuthRequest } from '../types/2fa';

export const useTwoFactorStore = create<TwoFactorState>((set) => ({
    devices: [],
    activeRequest: null,
    isMobileSimulatorOpen: false,

    registerDevice: (name, type) => set((state) => ({
        devices: [...state.devices, {
            id: Math.random().toString(36).substring(7),
            name,
            type,
            status: 'active',
            registeredAt: new Date().toISOString(),
            lastActiveAt: new Date().toISOString(),
            failedAttempts: 0,
            lockoutUntil: null
        }]
    })),

    updateDeviceStatus: (deviceId, status, lockoutUntil = null) => set((state) => ({
        devices: state.devices.map(d =>
            d.id === deviceId ? { ...d, status, lockoutUntil } : d
        )
    })),

    incrementFailedAttempts: (deviceId) => set((state) => ({
        devices: state.devices.map(d =>
            d.id === deviceId ? { ...d, failedAttempts: d.failedAttempts + 1 } : d
        )
    })),

    resetFailedAttempts: (deviceId) => set((state) => ({
        devices: state.devices.map(d =>
            d.id === deviceId ? { ...d, failedAttempts: 0, status: 'active', lockoutUntil: null } : d
        )
    })),

    createAuthRequest: (type, description, payload) => {
        const id = Math.random().toString(36).substring(7);
        const request: AuthRequest = {
            id,
            type,
            description,
            status: 'pending',
            createdAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 5 * 60000).toISOString(), // 5 min expiry
            payload
        };
        set({ activeRequest: request, isMobileSimulatorOpen: true });
        return id;
    },

    resolveAuthRequest: (requestId, approved) => set((state) => {
        if (state.activeRequest?.id !== requestId) return {};
        return {
            activeRequest: { ...state.activeRequest, status: approved ? 'approved' : 'rejected' },
            isMobileSimulatorOpen: false
        };
    }),

    toggleMobileSimulator: (isOpen) => set({ isMobileSimulatorOpen: isOpen })
}));
