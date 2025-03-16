'use client';

import { ReactNode, useState, useEffect } from 'react';
import AmbientSounds from './AmbientSounds';

function ForestMist() {
  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 forest-mist"></div>
      <div className="absolute inset-0 forest-mist" style={{ animationDelay: '10s' }}></div>
    </div>
  );
}

interface Raindrop {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
}

function RainEffect() {
  const [raindrops, setRaindrops] = useState<Raindrop[]>([]);

  useEffect(() => {
    const drops = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 1 + 0.5}s`,
      animationDelay: `${Math.random() * 2}s`
    }));
    setRaindrops(drops);
  }, []);

  // Return empty div during server-side rendering
  if (raindrops.length === 0) {
    return <div className="fixed inset-0 pointer-events-none opacity-20" />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      {raindrops.map(drop => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: drop.left,
            animationDuration: drop.animationDuration,
            animationDelay: drop.animationDelay
          }}
        />
      ))}
    </div>
  );
}

interface PageTemplateProps {
  children: ReactNode;
}

export default function PageTemplate({ children }: PageTemplateProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Background Layer */}
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/forest-rain.gif")',
            filter: 'brightness(0.8)'
          }}
        ></div>
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Fixed Atmospheric Effects */}
      <ForestMist />
      <RainEffect />
      <AmbientSounds />

      {/* Scrollable Content */}
      <div className="relative min-h-screen">
        <div className="relative z-10">
          {children}
        </div>

        {/* Scroll Indicator */}
        <div className="fixed bottom-8 right-8 animate-bounce">
          <div className="flex flex-col items-center text-white/60">
            <svg 
              className="w-6 h-6"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <span className="text-sm mt-2">Scroll</span>
          </div>
        </div>
      </div>
    </div>
  );
} 