'use client';

import { useState, useEffect } from 'react';

interface ChessStats {
  chess_rapid?: {
    last: {
      rating: number;
      date: number;
    };
    best: {
      rating: number;
      date: number;
    };
  };
  chess_blitz?: {
    last: {
      rating: number;
      date: number;
    };
    best: {
      rating: number;
      date: number;
    };
  };
  chess_bullet?: {
    last: {
      rating: number;
      date: number;
    };
    best: {
      rating: number;
      date: number;
    };
  };
}

interface ChessGame {
  url: string;
  white: { username: string; rating: number };
  black: { username: string; rating: number };
  time_class: string;
  result: string;
  end_time: number;
}

export default function ChessStats() {
  const [stats, setStats] = useState<ChessStats | null>(null);
  const [lastGame, setLastGame] = useState<ChessGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChessData() {
      try {
        // Fetch stats
        const statsResponse = await fetch('https://api.chess.com/pub/player/aaron_growler/stats');
        if (!statsResponse.ok) throw new Error('Failed to fetch chess stats');
        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch games from current month
        const date = new Date();
        const archiveUrl = `https://api.chess.com/pub/player/aaron_growler/games/${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
        const gamesResponse = await fetch(archiveUrl);
        if (gamesResponse.ok) {
          const gamesData = await gamesResponse.json();
          if (gamesData.games && gamesData.games.length > 0) {
            setLastGame(gamesData.games[gamesData.games.length - 1]);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chess data');
      } finally {
        setLoading(false);
      }
    }

    fetchChessData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2 animate-pulse">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    );
  }

  if (error || !stats) {
    return null;
  }

  return (
    <div className="space-y-4 w-[300px]">
      {/* Ratings Card */}
      <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-emerald-200">Chess Ratings</h3>
          <a 
            href="https://www.chess.com/member/aaron_growler"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-emerald-200 hover:text-emerald-100 transition-colors inline-flex items-center gap-1 hover:bg-white/10 px-2 py-1 rounded-lg"
          >
            Profile
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
        <div className="space-y-4">
          {stats.chess_rapid && (
            <div className="flex justify-between items-center">
              <span className="text-emerald-100">Rapid</span>
              <div>
                <span className="text-2xl font-bold">{stats.chess_rapid.last.rating}</span>
                <span className="text-sm text-emerald-200 ml-2">Peak: {stats.chess_rapid.best.rating}</span>
              </div>
            </div>
          )}
          {stats.chess_blitz && (
            <div className="flex justify-between items-center">
              <span className="text-emerald-100">Blitz</span>
              <div>
                <span className="text-2xl font-bold">{stats.chess_blitz.last.rating}</span>
                <span className="text-sm text-emerald-200 ml-2">Peak: {stats.chess_blitz.best.rating}</span>
              </div>
            </div>
          )}
          {stats.chess_bullet && (
            <div className="flex justify-between items-center">
              <span className="text-emerald-100">Bullet</span>
              <div>
                <span className="text-2xl font-bold">{stats.chess_bullet.last.rating}</span>
                <span className="text-sm text-emerald-200 ml-2">Peak: {stats.chess_bullet.best.rating}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Last Game Card */}
      {lastGame && (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4 text-emerald-200">Last Game</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-emerald-100">White</span>
              <span className="font-medium">{lastGame.white.username} ({lastGame.white.rating})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-emerald-100">Black</span>
              <span className="font-medium">{lastGame.black.username} ({lastGame.black.rating})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-emerald-100">Result</span>
              <span className="font-medium">{lastGame.result}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-emerald-100">Type</span>
              <span className="font-medium capitalize">{lastGame.time_class}</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <a 
              href={lastGame.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-200 hover:text-emerald-100 transition-colors inline-flex items-center gap-2 hover:bg-white/10 px-3 py-1.5 rounded-lg"
            >
              View Game
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 