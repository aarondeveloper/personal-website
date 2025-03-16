'use client';

import Image from 'next/image';
import ChessStats, { ChessRatings } from './components/ChessStats';
import { useState, useEffect } from 'react';
import PageTemplate from './components/PageTemplate';

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
    <PageTemplate>
      <main className="min-h-screen flex flex-col">
        {/* Content */}
        <div className="relative flex-1 flex items-center gap-8 px-6">
          {/* Left Side - Image */}
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

          {/* Middle - About Me and Chess Ratings */}
          <div className="flex-1 flex flex-col justify-between max-w-xl">
            {/* About Me */}
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-200 to-emerald-400 mb-4">
                Aaron Growler
              </h1>
              <p className="text-lg text-emerald-100/90 leading-relaxed">
                Hi there! I&apos;m Aaron, a passionate Full Stack Developer with a love for chess and my furry companion, Growler. 
                I specialize in building modern web applications using cutting-edge technologies like React, Next.js, and TypeScript. 
                When I&apos;m not coding, you can find me analyzing chess positions or taking Growler for long walks in the rain.
              </p>
              <div className="mt-4 flex gap-4">
                <span className="px-3 py-1 rounded-full bg-emerald-900/40 text-emerald-200 text-sm">
                  Full Stack Development
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-900/40 text-emerald-200 text-sm">
                  Chess Enthusiast
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-900/40 text-emerald-200 text-sm">
                  Dog Lover
                </span>
              </div>
            </div>

            {/* Chess Ratings */}
            <div className="mt-8">
              <ChessRatings stats={stats} />
            </div>
          </div>

          {/* Right Side - Chess Game */}
          <div className="w-[300px]">
            <ChessStats />
          </div>
        </div>
      </main>
    </PageTemplate>
  );
}
