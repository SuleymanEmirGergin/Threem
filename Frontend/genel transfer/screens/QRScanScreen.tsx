import { motion } from 'motion/react';
import { Button } from '../components/Button';
import { QRScannerFrame } from '../components/QRScannerFrame';
import { X } from 'lucide-react';

interface QRScanScreenProps {
  onScanComplete: () => void;
  onClose: () => void;
}

export function QRScanScreen({ onScanComplete, onClose }: QRScanScreenProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <h3>Scan QR Code</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-10 h-10 glass-card flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </motion.div>
      
      {/* Scanner */}
      <div className="flex-1 flex items-center justify-center">
        <QRScannerFrame onScanComplete={onScanComplete} />
      </div>
      
      {/* Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-white/60 mb-6">
          Position the QR code within the frame
        </p>
        <Button variant="secondary" onClick={onScanComplete} fullWidth>
          Simulate QR Scan (Dev Mode)
        </Button>
      </motion.div>
    </div>
  );
}
