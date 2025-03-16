'use client';

import Image from 'next/image';
import ChessStats, { ChessRatings } from './components/ChessStats';
import { useState, useEffect } from 'react';
import AmbientSounds from './components/AmbientSounds';

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
      <AmbientSounds />

      {/* Content */}
      <div className="relative flex-1 flex">
        {/* Left Side with Centered Image */}
        <div className="flex items-center pl-6">
          {/* Image */}
          <div className="relative w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
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
        </div>

        {/* Right Side with Bottom Content */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            {/* Future content will go here */}
          </div>

          {/* Bottom Content */}
          <div className="relative z-10 w-full pr-6 pb-8">
            <div className="flex justify-end items-end gap-8">
              {/* Chess Ratings */}
              <div className="flex-shrink-0">
                <ChessRatings stats={stats} />
              </div>

              {/* Chess Game */}
              <div className="w-[300px]">
                <ChessStats />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
