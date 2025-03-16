'use client';

import { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';

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
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Fixed Background and Effects */}
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/forest-rain.gif")',
            filter: 'brightness(0.8)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <ForestMist />
        <RainEffect />
      </div>

      {/* Navigation - Fixed Height Container */}
      <div className="flex-none">
        <Navbar />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 relative">
        <div className="relative z-20">
          {children}
        </div>
      </div>
    </div>
  );
} 