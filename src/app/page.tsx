'use client';

import Image from 'next/image';
import ChessStats, { ChessRatings } from './components/ChessStats';
import { useState, useEffect } from 'react';
import PageTemplate from './components/PageTemplate';
import Link from 'next/link';

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
      <div className="px-4 md:px-6 py-4 mx-auto max-w-screen-2xl">
        {/* GitHub Link - Only visible on desktop, positioned near the top */}
        <div className="hidden md:flex justify-center mb-6">
          <div className="w-full" style={{ maxWidth: 'calc(500px + 350px + 500px + 2rem)' }}>
            <Link 
              href="https://github.com/aarondeveloper" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/40 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center hover:bg-black/50 transition-all duration-200 hover:scale-[1.01] hover:shadow-emerald-500/20 hover:shadow-lg group w-full"
            >
              <div className="flex items-center gap-3 max-w-md">
                <svg className="w-8 h-8 text-emerald-300 group-hover:text-emerald-200 transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-emerald-200 group-hover:text-emerald-100 transition-colors">Find my code on GitHub</h2>
                  <p className="text-emerald-100/80 text-sm">View all my repositories and contributions</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Main content in three columns */}
        <div className="flex flex-col md:flex-row items-start gap-4 mb-8 md:h-[calc(100vh-160px)] md:justify-center">
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
        </div>
      </div>
    </PageTemplate>
  );
}
