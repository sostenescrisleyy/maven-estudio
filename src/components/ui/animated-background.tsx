'use client';

import React from 'react';

interface AnimatedBackgroundProps {
  className?: string;
}

export function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      style={{
        background: '#000000',
      }}
    >
      {/* Stars layer 1 - Small distant stars */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 90%, white, transparent),
            radial-gradient(1px 1px at 70% 20%, white, transparent)
          `,
          backgroundSize: '200px 200px, 300px 300px, 250px 250px, 280px 280px, 220px 220px, 320px 320px, 180px 180px, 290px 290px',
          backgroundPosition: '0 0, 40px 60px, 130px 270px, 70px 100px, 150px 50px, 200px 150px, 90px 200px, 250px 80px',
        }}
      />

      {/* Stars layer 2 - Medium stars */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(1.5px 1.5px at 25% 45%, white, transparent),
            radial-gradient(1.5px 1.5px at 75% 25%, white, transparent),
            radial-gradient(1.5px 1.5px at 45% 85%, white, transparent),
            radial-gradient(1.5px 1.5px at 85% 55%, white, transparent),
            radial-gradient(1.5px 1.5px at 10% 65%, white, transparent)
          `,
          backgroundSize: '300px 300px, 350px 350px, 280px 280px, 320px 320px, 400px 400px',
          backgroundPosition: '50px 50px, 100px 100px, 150px 200px, 200px 50px, 250px 150px',
        }}
      />

      {/* Stars layer 3 - Larger bright stars */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 35% 55%, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 65% 35%, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 15% 75%, rgba(255,255,255,0.9), transparent),
            radial-gradient(2px 2px at 95% 15%, rgba(255,255,255,0.9), transparent)
          `,
          backgroundSize: '400px 400px, 450px 450px, 380px 380px, 420px 420px',
          backgroundPosition: '0 0, 100px 150px, 200px 100px, 50px 200px',
        }}
      />

      {/* Twinkling stars animation */}
      <div
        className="absolute inset-0 opacity-20 animate-pulse-slow"
        style={{
          backgroundImage: `
            radial-gradient(2px 2px at 40% 40%, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 70% 60%, rgba(255,255,255,0.8), transparent),
            radial-gradient(2px 2px at 20% 80%, rgba(255,255,255,0.8), transparent)
          `,
          backgroundSize: '500px 500px',
          backgroundPosition: '0 0, 150px 100px, 250px 200px',
          animationDuration: '4s',
        }}
      />

      {/* Subtle galaxy glow */}
      <div
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(147, 197, 253, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div
        className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(196, 181, 253, 0.3) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}
