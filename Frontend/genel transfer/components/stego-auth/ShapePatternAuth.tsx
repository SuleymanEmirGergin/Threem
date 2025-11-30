import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface Point {
  x: number;
  y: number;
  id: number;
}

interface ShapePatternAuthProps {
  config: any;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ShapePatternAuth({ config, onConfirm, onCancel }: ShapePatternAuthProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pattern, setPattern] = useState<number[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [error, setError] = useState('');

  const savedPattern = config.pattern || [];

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

  // Check pattern on completion
  useEffect(() => {
    if (pattern.length > 0 && !isDrawing && pattern.length === savedPattern.length) {
      const isMatch = pattern.every((id, index) => id === savedPattern[index]);
      
      if (isMatch) {
        setIsCorrect(true);
        setError('');
      } else {
        setError('Pattern incorrect');
        setTimeout(() => {
          setPattern([]);
          setError('');
        }, 1500);
      }
    }
  }, [pattern, isDrawing, savedPattern]);

  // Draw canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Determine color based on state
    let strokeColor = 'rgba(34, 211, 238, 0.6)';
    let glowColor = 'rgba(34, 211, 238, 0.8)';
    
    if (isCorrect) {
      strokeColor = 'rgba(34, 197, 94, 0.6)';
      glowColor = 'rgba(34, 197, 94, 0.8)';
    } else if (error) {
      strokeColor = 'rgba(239, 68, 68, 0.6)';
      glowColor = 'rgba(239, 68, 68, 0.8)';
    }

    // Draw connection lines
    if (pattern.length > 0) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Add glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = glowColor;

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

      // Determine point color
      let pointColor = 'rgba(34, 211, 238, 0.3)';
      let pointBorder = 'rgba(34, 211, 238, 0.8)';
      let innerColor = 'rgba(34, 211, 238, 1)';
      
      if (isCorrect && isConnected) {
        pointColor = 'rgba(34, 197, 94, 0.3)';
        pointBorder = 'rgba(34, 197, 94, 0.8)';
        innerColor = 'rgba(34, 197, 94, 1)';
      } else if (error && isConnected) {
        pointColor = 'rgba(239, 68, 68, 0.3)';
        pointBorder = 'rgba(239, 68, 68, 0.8)';
        innerColor = 'rgba(239, 68, 68, 1)';
      }

      // Outer ring
      ctx.beginPath();
      ctx.arc(point.x, point.y, isConnected ? 18 : 14, 0, Math.PI * 2);
      ctx.fillStyle = isConnected ? pointColor : 'rgba(255, 255, 255, 0.1)';
      ctx.fill();
      ctx.strokeStyle = isConnected ? pointBorder : 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(point.x, point.y, isConnected ? 8 : 6, 0, Math.PI * 2);
      ctx.fillStyle = isConnected ? innerColor : 'rgba(255, 255, 255, 0.4)';
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
  }, [points, pattern, currentPos, isDrawing, isCorrect, error]);

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
    if (isCorrect) return;
    
    const pos = getCanvasPosition(e);
    const point = getPointAtPosition(pos.x, pos.y);

    if (point) {
      setIsDrawing(true);
      setPattern([point.id]);
      setCurrentPos(pos);
      setError('');
    }
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isCorrect) return;

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
        <h1 className="text-white mb-3">Confirm Your Pattern</h1>
        <p className="text-white/70 text-sm px-4">
          Draw your connection pattern to authorize payment
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
          {/* Feedback Messages */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card-enhanced border transition-all duration-300 ${
              error ? 'border-red-500/30 bg-red-500/10' :
              isCorrect ? 'border-green-500/30 bg-green-500/10' :
              'border-white/20'
            }`}>
              {error && (
                <>
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-red-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  />
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </>
              )}
              {isCorrect && (
                <>
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  />
                  <p className="text-green-400 text-sm font-medium">Pattern verified!</p>
                </>
              )}
              {!error && !isCorrect && pattern.length > 0 && (
                <>
                  <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
                  <p className="text-white/80 text-sm">{pattern.length} dots connected</p>
                </>
              )}
              {!error && !isCorrect && pattern.length === 0 && (
                <>
                  <div className="w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" />
                  <p className="text-white/80 text-sm">Draw your pattern</p>
                </>
              )}
            </div>
          </div>

          {/* Canvas */}
          <div className={`glass-card-enhanced rounded-3xl p-8 relative overflow-hidden transition-all duration-300 ${
            error ? 'border-red-500/30' :
            isCorrect ? 'border-green-500/30 glow-green' :
            'glow-border'
          }`}>
            {/* Inner glow effect */}
            <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-300 ${
              error ? 'bg-gradient-to-br from-red-500/5 via-transparent to-red-500/5' :
              isCorrect ? 'bg-gradient-to-br from-green-500/5 via-transparent to-cyan-500/5' :
              'bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5'
            }`} />
            
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
          onClick={onConfirm}
          disabled={!isCorrect}
          className="w-full py-4 px-6 btn-gradient text-white rounded-full transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] disabled:hover:scale-100"
        >
          <span className="drop-shadow-sm font-medium">Confirm Payment</span>
        </button>

        <button
          onClick={onCancel}
          className="w-full text-white/60 text-sm hover:text-white/90 transition-colors py-2"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}