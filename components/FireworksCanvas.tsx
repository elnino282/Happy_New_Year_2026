
import React, { useEffect, useRef, useCallback } from 'react';
import { FireworkParticle } from '../types';

const COLORS = [
  '#FFD700', // Gold
  '#FF0000', // Red
  '#FF4500', // OrangeRed
  '#FFFF00', // Yellow
  '#00FF00', // Lime
  '#00FFFF', // Cyan
  '#FF00FF', // Magenta
  '#FFFFFF'  // White
];

const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<FireworkParticle[]>([]);
  const animationFrameId = useRef<number>();

  const createFirework = useCallback((x: number, y: number) => {
    const particleCount = 100 + Math.random() * 50;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      particles.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color,
        alpha: 1,
        decay: 0.015 + Math.random() * 0.02,
        size: 1 + Math.random() * 2
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      // Clear with slight fade for trails, matching the new richer red background (#2d0000)
      ctx.fillStyle = 'rgba(45, 0, 0, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Randomly spawn fireworks
      if (Math.random() < 0.05) {
        createFirework(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.7
        );
      }

      particles.current = particles.current.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // Gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) return false;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        return true;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [createFirework]);

  const handleClick = (e: React.MouseEvent) => {
    createFirework(e.clientX, e.clientY);
  };

  return (
    <canvas 
      ref={canvasRef} 
      onClick={handleClick}
      className="fixed inset-0 w-full h-full cursor-pointer touch-none"
    />
  );
};

export default FireworksCanvas;
