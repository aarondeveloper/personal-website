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

export function ChessRatings({ stats }: { stats: ChessStats | null }) {
  if (!stats) return null;

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 text-white min-w-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-emerald-200">Chess Ratings</h3>
        <a 
          href="https://www.chess.com/member/aaron_growler"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 inline-flex items-center gap-2 font-medium"
        >
          View Profile
          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
      <div className="space-y-5">
        {stats.chess_rapid && (
          <div className="flex justify-between items-center">
            <span className="text-xl text-emerald-100">Rapid</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{stats.chess_rapid.last.rating}</span>
              <span className="text-sm text-emerald-200">Peak: {stats.chess_rapid.best.rating}</span>
            </div>
          </div>
        )}
        {stats.chess_blitz && (
          <div className="flex justify-between items-center">
            <span className="text-xl text-emerald-100">Blitz</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{stats.chess_blitz.last.rating}</span>
              <span className="text-sm text-emerald-200">Peak: {stats.chess_blitz.best.rating}</span>
            </div>
          </div>
        )}
        {stats.chess_bullet && (
          <div className="flex justify-between items-center">
            <span className="text-xl text-emerald-100">Bullet</span>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{stats.chess_bullet.last.rating}</span>
              <span className="text-sm text-emerald-200">Peak: {stats.chess_bullet.best.rating}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChessStats() {
  const [stats, setStats] = useState<ChessStats | null>(null);
  const [games, setGames] = useState<ChessGame[]>([]);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [game, setGame] = useState<Chess | null>(null);
  const [currentMove, setCurrentMove] = useState(0);
  const [moves, setMoves] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playInterval, setPlayInterval] = useState<NodeJS.Timeout | null>(null);

  const currentGame = games[currentGameIndex];

  const loadGame = useCallback((gameToLoad: ChessGame) => {
    const chess = new Chess();
    chess.loadPgn(gameToLoad.pgn);
    const startingPosition = new Chess();
    setGame(startingPosition);
    setMoves(chess.history());
    setCurrentMove(0);
    setIsPlaying(true);
  }, []);

  const getGameResult = (pgn: string) => {
    // Extract the result from PGN (usually at the end, like "1-0", "0-1", or "1/2-1/2")
    const resultMatch = pgn.match(/\s(1-0|0-1|1\/2-1\/2|\*)\s*$/);
    if (!resultMatch) return '';
    
    const result = resultMatch[1];
    const isWhite = currentGame.white.username === 'aaron_growler';
    
    switch (result) {
      case '1-0':
        return isWhite ? 'Won' : 'Lost';
      case '0-1':
        return isWhite ? 'Lost' : 'Won';
      case '1/2-1/2':
        return 'Draw';
      default:
        return 'Game in progress';
    }
  };

  const handlePreviousGame = () => {
    if (currentGameIndex < games.length - 1) {
      setCurrentGameIndex(prev => prev + 1);
      if (playInterval) clearInterval(playInterval);
      loadGame(games[currentGameIndex + 1]);
    }
  };

  const handleNextGame = () => {
    if (currentGameIndex > 0) {
      setCurrentGameIndex(prev => prev - 1);
      if (playInterval) clearInterval(playInterval);
      loadGame(games[currentGameIndex - 1]);
    }
  };

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
            setGames(gamesData.games.reverse()); // Reverse so most recent is first
            loadGame(gamesData.games[0]); // Load most recent game
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chess data');
      } finally {
        setLoading(false);
      }
    }

    fetchChessData();

    return () => {
      if (playInterval) clearInterval(playInterval);
    };
  }, [loadGame]);

  // Separate useEffect to handle auto-play state changes
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentMove(prev => {
          if (prev >= moves.length - 1) {
            clearInterval(interval);
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
    } else {
      if (playInterval) {
        clearInterval(playInterval);
        setPlayInterval(null);
      }
    }

    return () => {
      if (playInterval) {
        clearInterval(playInterval);
      }
    };
  }, [isPlaying, moves]);

  const goToMove = useCallback((moveIndex: number | ((prev: number) => number)) => {
    if (!game) return;
    
    const newGame = new Chess();
    const newMoveIndex = typeof moveIndex === 'function' ? moveIndex(currentMove) : moveIndex;
    
    if (newMoveIndex === -1) {
      // Show final position
      newGame.loadPgn(currentGame?.pgn || '');
    } else {
      // Play moves up to the selected index
      for (let i = 0; i <= newMoveIndex; i++) {
        newGame.move(moves[i]);
      }
    }
    
    setGame(newGame);
    setCurrentMove(newMoveIndex);
  }, [game, moves, currentGame]);

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
      setIsPlaying(true);
    }
  };

  const formatGameDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
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

  if (error || !stats || !currentGame) {
    return null;
  }

  return (
    <div className="space-y-4">
      {currentGame && game && (
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handlePreviousGame}
              disabled={currentGameIndex >= games.length - 1}
              className="p-2 text-emerald-200 hover:text-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-emerald-500/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-emerald-200">
                {formatGameDate(currentGame.end_time)}
              </h3>
              {currentGameIndex === 0 && (
                <span className="text-sm text-emerald-400 mt-1">Most Recent</span>
              )}
            </div>
            <button
              onClick={handleNextGame}
              disabled={currentGameIndex <= 0}
              className="p-2 text-emerald-200 hover:text-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg hover:bg-emerald-500/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Chess Board */}
          <div className="mb-4">
            <Chessboard 
              position={game.fen()} 
              boardWidth={268}
              customDarkSquareStyle={{ backgroundColor: '#374151' }}
              customLightSquareStyle={{ backgroundColor: '#4B5563' }}
              boardOrientation={currentGame.white.username === 'aaron_growler' ? 'white' : 'black'}
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
              <span className="font-medium">{currentGame.white.username} ({currentGame.white.rating})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-emerald-100">Black</span>
              <span className="font-medium">{currentGame.black.username} ({currentGame.black.rating})</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-emerald-100">Result</span>
              <span className={`font-medium ${
                getGameResult(currentGame.pgn).startsWith('Won') ? 'text-emerald-400' :
                getGameResult(currentGame.pgn).startsWith('Lost') ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {getGameResult(currentGame.pgn)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-emerald-100">Type</span>
              <span className="font-medium capitalize">{currentGame.time_class}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 