import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface Point {
  x: number;
  y: number;
  id: number;
}

interface ShapePatternSetupProps {
  onSave: (config: any) => void;
  onBack: () => void;
}

export function ShapePatternSetup({ onSave, onBack }: ShapePatternSetupProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pattern, setPattern] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);

  // Create 3x3 grid of points
  useEffect(() => {
    const gridPoints: Point[] = [];
    const spacing = 80;
    const offsetX = 60;
    const offsetY = 60;
    
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        gridPoints.push({
          x: offsetX + col * spacing,
          y: offsetY + row * spacing,
          id: row * 3 + col,
        });
      }
    }
    setPoints(gridPoints);
  }, []);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connection lines
    if (pattern.length > 0) {
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.6)';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Add glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = 'rgba(34, 211, 238, 0.8)';

      ctx.beginPath();
      pattern.forEach((pointId, index) => {
        const point = points.find(p => p.id === pointId);
        if (!point) return;

        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });

      // Draw line to current position if drawing
      if (isDrawing && currentPos) {
        ctx.lineTo(currentPos.x, currentPos.y);
      }

      ctx.stroke();
    }

    // Reset shadow for points
    ctx.shadowBlur = 0;

    // Draw points
    points.forEach((point) => {
      const isConnected = pattern.includes(point.id);
      const connectionIndex = pattern.indexOf(point.id);

      // Outer ring
      ctx.beginPath();
      ctx.arc(point.x, point.y, isConnected ? 18 : 14, 0, Math.PI * 2);
      ctx.fillStyle = isConnected 
        ? 'rgba(34, 211, 238, 0.3)' 
        : 'rgba(255, 255, 255, 0.1)';
      ctx.fill();
      ctx.strokeStyle = isConnected 
        ? 'rgba(34, 211, 238, 0.8)' 
        : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(point.x, point.y, isConnected ? 8 : 6, 0, Math.PI * 2);
      ctx.fillStyle = isConnected 
        ? 'rgba(34, 211, 238, 1)' 
        : 'rgba(255, 255, 255, 0.4)';
      ctx.fill();

      // Show connection order number
      if (isConnected && connectionIndex >= 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((connectionIndex + 1).toString(), point.x, point.y);
      }
    });
  }, [points, pattern, currentPos, isDrawing]);

  const getPointAtPosition = (x: number, y: number): Point | null => {
    const threshold = 25;
    return points.find(
      (point) =>
        Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)) < threshold
    ) || null;
  };

  const getCanvasPosition = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getCanvasPosition(e);
    const point = getPointAtPosition(pos.x, pos.y);

    if (point) {
      setIsDrawing(true);
      setPattern([point.id]);
      setCurrentPos(pos);
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;

    const pos = getCanvasPosition(e);
    setCurrentPos(pos);

    const point = getPointAtPosition(pos.x, pos.y);
    if (point && !pattern.includes(point.id)) {
      setPattern([...pattern, point.id]);
    }
  };

  const handleEnd = () => {
    setIsDrawing(false);
    setCurrentPos(null);
  };

  const handleClear = () => {
    setPattern([]);
    setIsDrawing(false);
    setCurrentPos(null);
  };

  const handleSave = () => {
    if (pattern.length >= 4) {
      onSave({ type: 'shape', pattern });
    }
  };

  const canSave = pattern.length >= 4;

  return (
    <div className="min-h-screen flex flex-col p-6 relative">
      {/* Ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Header */}
      <motion.div
        className="pt-16 pb-8 text-center relative z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-white mb-3">Set Your Connection Pattern</h1>
        <p className="text-white/70 text-sm px-4">
          Connect at least 4 dots to create your unique pattern
        </p>
      </motion.div>

      {/* Canvas Container */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Info Text */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-enhanced border border-white/20">
              {pattern.length === 0 && (
                <>
                  <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
                  <p className="text-white/80 text-sm">Touch a dot to start drawing</p>
                </>
              )}
              {pattern.length > 0 && pattern.length < 4 && (
                <>
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60 animate-pulse" />
                  <p className="text-white/80 text-sm">{pattern.length} dots connected (minimum 4)</p>
                </>
              )}
              {pattern.length >= 4 && (
                <>
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-green-400 text-sm font-medium">{pattern.length} dots connected ✓</p>
                </>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div className="glass-card-enhanced rounded-3xl p-8 glow-border relative overflow-hidden">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 pointer-events-none rounded-3xl" />
            
            <canvas
              ref={canvasRef}
              width={280}
              height={280}
              className="touch-none cursor-pointer relative z-10"
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            />
          </div>

          {/* Clear Button */}
          {pattern.length > 0 && (
            <motion.button
              onClick={handleClear}
              className="w-full mt-5 py-3.5 px-4 glass-card text-white/90 text-sm rounded-xl hover:bg-white/[0.12] transition-all duration-300 border border-white/20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Clear Pattern
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Bottom Actions */}
      <motion.div
        className="max-w-md mx-auto w-full space-y-3 pb-8 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <button
          onClick={handleSave}
          disabled={!canSave}
          className="w-full py-4 px-6 btn-gradient text-white rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] disabled:hover:scale-100"
        >
          <span className="drop-shadow-sm">Save Connection Pattern</span>
        </button>

        <button
          onClick={onBack}
          className="w-full text-white/60 text-sm hover:text-white/90 transition-colors py-2"
        >
          Back
        </button>
      </motion.div>
    </div>
  );
}