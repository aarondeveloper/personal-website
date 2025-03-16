'use client';

import Image from 'next/image';
import ChessStats, { ChessRatings } from './components/ChessStats';
import { useState, useEffect } from 'react';
import PageTemplate from './components/PageTemplate';
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
      {/* Fixed Sound Toggle */}
      <div className="fixed top-[180px] md:top-24 right-4 z-50">
        <AmbientSounds />
      </div>

      <main className="flex flex-col md:flex-row items-start gap-4 px-4 md:px-6 py-4 mx-auto max-w-screen-2xl h-[calc(100vh-80px)]">
        {/* Left Side - Image */}
        <div className="w-full md:w-[500px] h-[300px] md:h-[600px] relative rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
          <Image
            src="/me_and_growler.jpg"
            alt="Aaron with his dog Growler"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            style={{ 
              objectFit: 'cover',
              objectPosition: 'center',
              width: '100%',
              height: '100%',
              position: 'absolute'
            }}
            className="rounded-2xl"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
        </div>

        {/* Middle - About Me and Chess Ratings */}
        <div className="w-full md:w-[350px] flex flex-col gap-4">
          {/* About Me */}
          <div className="w-full bg-black/30 backdrop-blur-md rounded-2xl p-3 md:p-4">
            <h1 className="text-xl md:text-2xl font-bold text-white mb-2">
              About Me...
            </h1>
            <p className="text-sm text-white leading-relaxed">
              Hi there! I&apos;m Aaron, a Full Stack Developer, Data Engineer, and Data Scientist who loves building innovative web applications. 
              My technical toolkit includes React, Next.js, and advanced data pipelines, but my passions extend far beyond the keyboard. 
              You&apos;ll often find me analyzing positions on the chess board, training wrestling and jiu-jitsu on the mats, or exploring nature 
              with my furry companion, Growler. Life isn&apos;t just about personal achievements though - I cherish the moments spent with friends 
              and family, creating memories and sharing laughter. Whether I&apos;m optimizing code, hitting new PRs in the gym, or perfecting 
              submission techniques, I&apos;m always pushing my limits and embracing new challenges.
            </p>
          </div>

          {/* Chess Ratings */}
          <div className="w-full">
            <ChessRatings stats={stats} />
          </div>
        </div>

        {/* Right Side - Chess Game */}
        <div className="w-full md:w-[500px] flex-shrink-0">
          <ChessStats />
        </div>
      </main>
    </PageTemplate>
  );
}
