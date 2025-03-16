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
      <main className="min-h-screen flex flex-col pt-16">
        {/* Content */}
        <div className="relative flex-1 flex items-center justify-center gap-8 px-5 mx-auto max-w-[1850px]">
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
          <div className="flex-1 flex flex-col justify-between">
            {/* About Me */}
            <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6">
              <h1 className="text-4xl font-bold text-white mb-4">
                About Me...
              </h1>
              <p className="text-lg text-white leading-relaxed">
                Hi there! I&apos;m Aaron, a Full Stack Developer, Data Engineer, and Data Scientist who loves building innovative web applications. 
                My technical toolkit includes React, Next.js, and advanced data pipelines, but my passions extend far beyond the keyboard. 
                You&apos;ll often find me analyzing positions on the chess board, training wrestling and jiu-jitsu on the mats, or exploring nature 
                with my furry companion, Growler. Life isn&apos;t just about personal achievements though - I cherish the moments spent with friends 
                and family, creating memories and sharing laughter. Whether I&apos;m optimizing code, hitting new PRs in the gym, or perfecting 
                submission techniques, I&apos;m always pushing my limits and embracing new challenges.
              </p>
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
