import { useTwoFactorStore } from '../store/useTwoFactorStore';
import { SecurityService } from './security';

export class TwoFactorService {
    /**
     * Verifies the mobile secret and handles lockout logic.
     */
    static async verifyMobileAuth(deviceId: string, secret: any, method: 'pin' | 'password' | 'pattern' | 'image' | 'audio', storedHash: string): Promise<{ success: boolean; message?: string }> {
        const store = useTwoFactorStore.getState();
        const device = store.devices.find(d => d.id === deviceId);

        if (!device) return { success: false, message: 'Device not found' };

        // Check Blocked Status
        if (device.status === 'blocked') {
            return { success: false, message: 'Device is permanently blocked. Re-registration required.' };
        }

        // Check Lockout Status
        if (device.status === 'locked') {
            if (device.lockoutUntil && new Date() < new Date(device.lockoutUntil)) {
                const remaining = Math.ceil((new Date(device.lockoutUntil).getTime() - new Date().getTime()) / 60000);
                return { success: false, message: `Device locked. Try again in ${remaining} minutes.` };
            } else {
                // Lockout expired, reset (but keep failed attempts count high to trigger block quickly? Or reset? 
                // User req: "After 5-minute lockout expires, allow user to try again."
                // "If... user enters wrong secret 2 more times (total 5)... permanently block"
                // So we do NOT reset failedAttempts to 0 here completely, or we track total.
                // Let's just reset status to active but keep failedAttempts at 3.
                store.updateDeviceStatus(deviceId, 'active', null);
            }
        }

        // Verify Secret
        const isValid = await SecurityService.verifySecret(secret, storedHash, method);

        if (isValid) {
            store.resetFailedAttempts(deviceId);
            return { success: true };
        } else {
            store.incrementFailedAttempts(deviceId);
            const updatedDevice = useTwoFactorStore.getState().devices.find(d => d.id === deviceId);

            if (!updatedDevice) return { success: false, message: 'Error' };

            const fails = updatedDevice.failedAttempts;

            // Lockout Policy
            if (fails === 3) {
                const lockoutTime = new Date(Date.now() + 5 * 60000).toISOString(); // 5 mins
                store.updateDeviceStatus(deviceId, 'locked', lockoutTime);
                return { success: false, message: '3 Failed Attempts. Device locked for 5 minutes.' };
            }

            // Permanent Block Policy
            if (fails >= 5) {
                store.updateDeviceStatus(deviceId, 'blocked');
                return { success: false, message: '5 Failed Attempts. Device permanently blocked.' };
            }

            return { success: false, message: `Authentication failed. Attempt ${fails}/5` };
        }
    }

    static getMobileDevice() {
        return useTwoFactorStore.getState().devices.find(d => d.type === 'mobile');
    }
}
