import React, { useEffect, useRef } from 'react';

interface InteractiveBackgroundProps {
  isDark?: boolean;
}

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  color: string;
  type: 'leaf' | 'orb' | 'spore';
  rotation: number;
  rotationSpeed: number;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({ isDark = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.targetX = width / 2;
      mouseRef.current.targetY = height / 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Initial mouse centered
    mouseRef.current.x = width / 2;
    mouseRef.current.y = height / 2;
    mouseRef.current.targetX = width / 2;
    mouseRef.current.targetY = height / 2;

    const particles: Particle[] = [];
    const numParticles = Math.min(50, Math.floor((width * height) / 25000));

    const colorPalette = isDark
      ? ['#70B873', '#0E5C36', '#86EFAC', '#10B981', '#34D399']
      : ['#0E5C36', '#70B873', '#2D6A4F', '#40916C', '#52B788'];

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const types: ('leaf' | 'orb' | 'spore')[] = ['leaf', 'orb', 'spore'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4 - 0.15,
          size: type === 'leaf' ? 14 + Math.random() * 18 : 6 + Math.random() * 22,
          baseAlpha: isDark ? 0.25 + Math.random() * 0.35 : 0.15 + Math.random() * 0.25,
          color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
          type,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02
        });
      }
    };

    initParticles();

    // Draw natural stylized leaf
    const drawLeaf = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.8, -size * 0.5, size * 0.8, size * 0.5, 0, size);
      ctx.bezierCurveTo(-size * 0.8, size * 0.5, -size * 0.8, -size * 0.5, 0, -size);
      ctx.closePath();
      ctx.fill();

      // Leaf central vein
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.85);
      ctx.lineTo(0, size * 0.85);
      ctx.stroke();
    };

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth mouse interpolation (spring / lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Draw cursor-reactive ambient radial gradient
      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;
      
      const ambientGrad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        40,
        mouseX,
        mouseY,
        Math.max(width, height) * 0.75
      );

      if (isDark) {
        ambientGrad.addColorStop(0, 'rgba(112, 184, 115, 0.12)');
        ambientGrad.addColorStop(0.4, 'rgba(14, 92, 54, 0.08)');
        ambientGrad.addColorStop(1, 'rgba(13, 25, 18, 0)');
      } else {
        ambientGrad.addColorStop(0, 'rgba(112, 184, 115, 0.18)');
        ambientGrad.addColorStop(0.4, 'rgba(14, 92, 54, 0.06)');
        ambientGrad.addColorStop(1, 'rgba(246, 244, 238, 0)');
      }

      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw interactive grid subtle lines that warp with cursor
      const gridSize = 80;
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = isDark ? 'rgba(112, 184, 115, 0.04)' : 'rgba(14, 92, 54, 0.04)';

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 30) {
          const dx = x - mouseX;
          const dy = y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const warp = Math.max(0, 40 - dist * 0.12);
          const warpedX = x + (dx / (dist || 1)) * warp;
          
          if (y === 0) {
            ctx.moveTo(warpedX, y);
          } else {
            ctx.lineTo(warpedX, y);
          }
        }
        ctx.stroke();
      }

      // Draw and update particles
      particles.forEach((p) => {
        // Natural gentle organic floating
        p.x += p.vx + Math.sin(time + p.originX) * 0.25;
        p.y += p.vy + Math.cos(time + p.originY) * 0.25;
        p.rotation += p.rotationSpeed;

        // Reactive push from cursor
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 220;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 3;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Screen wrap
        if (p.y < -50) p.y = height + 40;
        if (p.y > height + 50) p.y = -40;
        if (p.x < -50) p.x = width + 40;
        if (p.x > width + 50) p.x = -40;

        // Render particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 1;

        if (p.type === 'leaf') {
          drawLeaf(ctx, p.size);
        } else if (p.type === 'orb') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Spore with halo
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = p.baseAlpha * 0.35;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      id="interactive-canvas-background"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full transition-opacity duration-700"
    />
  );
};
