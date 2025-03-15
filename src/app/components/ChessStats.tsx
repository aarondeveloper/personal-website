'use client';

import { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

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
  pgn: string;
}

export default function ChessStats() {
  const [stats, setStats] = useState<ChessStats | null>(null);
  const [lastGame, setLastGame] = useState<ChessGame | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [game, setGame] = useState<Chess | null>(null);
  const [currentMove, setCurrentMove] = useState(0); // Start at move 0 instead of -1
  const [moves, setMoves] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playInterval, setPlayInterval] = useState<NodeJS.Timeout | null>(null);

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
            const latestGame = gamesData.games[gamesData.games.length - 1];
            setLastGame(latestGame);
            
            // Initialize chess.js with the PGN and set to starting position
            const chess = new Chess();
            chess.loadPgn(latestGame.pgn);
            const startingPosition = new Chess();
            setGame(startingPosition);
            
            // Get all moves
            const history = chess.history();
            setMoves(history);

            // Start auto-play after a short delay
            setTimeout(() => {
              startAutoPlay();
            }, 1000);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chess data');
      } finally {
        setLoading(false);
      }
    }

    fetchChessData();

    // Cleanup interval on unmount
    return () => {
      if (playInterval) clearInterval(playInterval);
    };
  }, []);

  const goToMove = useCallback((moveIndex: number | ((prev: number) => number)) => {
    if (!game) return;
    
    const newGame = new Chess();
    const newMoveIndex = typeof moveIndex === 'function' ? moveIndex(currentMove) : moveIndex;
    
    if (newMoveIndex === -1) {
      // Show final position
      newGame.loadPgn(lastGame?.pgn || '');
    } else {
      // Play moves up to the selected index
      for (let i = 0; i <= newMoveIndex; i++) {
        newGame.move(moves[i]);
      }
    }
    
    setGame(newGame);
    setCurrentMove(newMoveIndex);
  }, [game, moves, lastGame, currentMove]);

  const startAutoPlay = useCallback(() => {
    const interval = setInterval(() => {
      setCurrentMove(prev => {
        if (prev >= moves.length - 1) {
          clearInterval(interval);
          setPlayInterval(null);
          setIsPlaying(false);
          return prev;
        }
        
        const nextMove = prev + 1;
        const newGame = new Chess();
        
        // Play all moves up to the next position
        for (let i = 0; i <= nextMove; i++) {
          newGame.move(moves[i]);
        }
        setGame(newGame);
        
        return nextMove;
      });
    }, 1000);
    
    setPlayInterval(interval);
    setIsPlaying(true);
  }, [moves]);

  const handleStartGame = () => {
    goToMove(0);
    setIsPlaying(false);
    if (playInterval) clearInterval(playInterval);
  };

  const handleFinalPosition = () => {
    goToMove(-1);
    setIsPlaying(false);
    if (playInterval) clearInterval(playInterval);
  };

  const handlePrevMove = () => {
    if (currentMove > 0) {
      goToMove(currentMove - 1);
    } else if (currentMove === 0) {
      goToMove(-1); // Go to final position
    }
  };

  const handleNextMove = () => {
    if (currentMove === -1) {
      goToMove(0); // Start from beginning
    } else if (currentMove < moves.length - 1) {
      goToMove(currentMove + 1);
    }
  };

  const toggleAutoPlay = () => {
    if (isPlaying) {
      if (playInterval) clearInterval(playInterval);
      setPlayInterval(null);
      setIsPlaying(false);
    } else {
      // If we're at the end or showing final position, start from beginning
      if (currentMove === moves.length - 1 || currentMove === -1) {
        goToMove(0);
      }
      startAutoPlay();
    }
  };

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
      {lastGame && game && (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 text-white">
          <h3 className="text-xl font-semibold mb-4 text-emerald-200">Last Game</h3>
          
          {/* Chess Board */}
          <div className="mb-4">
            <Chessboard 
              position={game.fen()} 
              boardWidth={268}
              customDarkSquareStyle={{ backgroundColor: '#374151' }}
              customLightSquareStyle={{ backgroundColor: '#4B5563' }}
              boardOrientation={lastGame.white.username === 'aaron_growler' ? 'white' : 'black'}
            />
          </div>

          {/* Game Controls */}
          <div className="flex flex-col items-center gap-4 mb-4">
            {/* Control Buttons */}
            <div className="flex gap-2 w-full">
              <button
                onClick={handleStartGame}
                className="flex-1 py-2 px-4 bg-emerald-600/40 hover:bg-emerald-600/60 text-emerald-100 rounded-lg transition-colors text-sm"
              >
                Reset to Start
              </button>
              <button
                onClick={handleFinalPosition}
                className="flex-1 py-2 px-4 bg-emerald-600/40 hover:bg-emerald-600/60 text-emerald-100 rounded-lg transition-colors text-sm"
              >
                Final Position
              </button>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between w-full">
              <button
                onClick={handlePrevMove}
                disabled={currentMove === -1}
                className="p-2 text-emerald-200 hover:text-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={toggleAutoPlay}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isPlaying 
                    ? 'bg-emerald-600/60 text-emerald-100' 
                    : 'bg-emerald-600/40 hover:bg-emerald-600/60 text-emerald-100'
                }`}
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>

              <button
                onClick={handleNextMove}
                disabled={currentMove === moves.length - 1}
                className="p-2 text-emerald-200 hover:text-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Move Counter */}
            <div className="text-emerald-100 text-sm">
              {currentMove === -1 
                ? "Final Position" 
                : `Move ${currentMove + 1} of ${moves.length}`
              }
            </div>
          </div>

          {/* Game Info */}
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
        </div>
      )}
    </div>
  );
} 