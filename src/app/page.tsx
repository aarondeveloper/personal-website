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
    </PageTemplate>
  );
}
