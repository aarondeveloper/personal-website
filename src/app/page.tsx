'use client';

import Image from 'next/image';
import ChessStats, { ChessRatings } from './components/ChessStats';
import { useState, useEffect } from 'react';

interface ChessStats {
  chess_rapid?: {
    last: { rating: number; date: number };
    best: { rating: number; date: number };
  };
  chess_blitz?: {
    last: { rating: number; date: number };
    best: { rating: number; date: number };
  };
  chess_bullet?: {
    last: { rating: number; date: number };
    best: { rating: number; date: number };
  };
}

interface Raindrop {
  id: number;
  left: string;
  animationDuration: string;
  animationDelay: string;
}

function ForestMist() {
  return (
    <div className="fixed inset-0">
      <div className="absolute inset-0 forest-mist"></div>
      <div className="absolute inset-0 forest-mist" style={{ animationDelay: '10s' }}></div>
    </div>
  );
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

export default function Home() {
  const [stats, setStats] = useState<ChessStats | null>(null);

  useEffect(() => {
    async function fetchChessStats() {
      try {
        const response = await fetch('https://api.chess.com/pub/player/aaron_growler/stats');
        if (!response.ok) throw new Error('Failed to fetch chess stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching chess stats:', error);
      }
    }

    fetchChessStats();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Background and Effects */}
      <div className="fixed inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/forest-rain.gif")',
            filter: 'brightness(0.8)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      {/* Atmospheric effects */}
      <ForestMist />
      <RainEffect />

      {/* Content */}
      <div className="relative flex-1 flex flex-col">
        {/* Main Content Area (for future content) */}
        <div className="flex-1">
          {/* Your future content will go here */}
        </div>

        {/* Bottom Content */}
        <div className="relative z-10 w-full max-w-[90rem] mx-auto px-6 py-8">
          <div className="flex justify-between items-end gap-8">
            {/* Left Side: Image and Ratings */}
            <div className="flex gap-8 items-end">
              {/* Image */}
              <div className="relative w-80 h-96 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/me_and_growler.jpg"
                  alt="Aaron with his dog Growler"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-2xl"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>

              {/* Chess Ratings */}
              <ChessRatings stats={stats} />
            </div>

            {/* Right Side: Chess Game */}
            <div className="w-[300px]">
              <ChessStats />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
