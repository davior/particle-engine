import React, { useRef, useEffect } from 'react';
import { ParticleEmitter } from './ParticleEmitter';

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    if (!canvas) {
      console.error('Canvas element not found');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Could not get canvas context');
      return;
    }

    const emitter = new ParticleEmitter(canvas.width / 2, canvas.height / 2, 100, 2);

    let lastTime = performance.now();
    const update = (time: number) => {
      //console.log(time);
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      emitter.update(dt);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      emitter.draw(ctx);

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, []);

  return <canvas ref={canvasRef} width={800} height={600} />;
};