import React, { useCallback, useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

export default function Confetti({ active, duration = 2000 }: ConfettiProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    r: number;
    d: number;
    color: string;
    tilt: number;
    tiltAngleIncrement: number;
    tiltAngle: number;
    opacity: number;
  }>>([]);

  const colors = [
    '#ff69b4', '#ff8da1', '#ffa8b6', '#ffccd5', // Pink shades
    '#9370db', '#a385e0', '#b39ddb', '#d1c4e9', // Purple shades
    '#ff6b6b', '#ff8787', '#ffa8a8', '#ffc9c9', // Red shades
    '#ffd700', '#ffe44d', '#ffeb99', '#fff3b0'  // Gold shades
  ];

  const draw = useCallback((ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current) return;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    particlesRef.current.forEach((particle, i) => {
      particle.tiltAngle += particle.tiltAngleIncrement;
      ctx.beginPath();
      ctx.lineWidth = particle.r;
      ctx.strokeStyle = particle.color;
      ctx.moveTo(particle.x + particle.tilt + particle.r, particle.y);
      ctx.lineTo(particle.x + particle.tilt, particle.y + particle.tilt + particle.r);
      ctx.stroke();

      // Add some sparkle
      ctx.beginPath();
      ctx.arc(particle.x + particle.tilt, particle.y, particle.r * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      particle.y += 12;
      particle.tilt = Math.sin(particle.tiltAngle) * 20;
      particle.opacity -= 0.02;

      if (particle.y > canvasRef.current.height || particle.opacity <= 0) {
        particlesRef.current.splice(i, 1);
      }
    });
  }, []);

  const createParticles = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const particles = [];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height / 2,
        r: Math.random() * 6 + 3,
        d: Math.random() * 50 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleIncrement: Math.random() * 0.1 + 0.05,
        tiltAngle: 0,
        opacity: 1
      });
    }
    particlesRef.current = particles;
  }, [colors]);

  useEffect(() => {
    if (!active || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    createParticles();
    let animationFrame: number;

    const animate = () => {
      draw(ctx);
      if (particlesRef.current.length > 0) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animate();

    const timeout = setTimeout(() => {
      cancelAnimationFrame(animationFrame);
      particlesRef.current = [];
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }, duration);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, [active, createParticles, draw, duration]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        zIndex: 9999,
      }}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  );
} 