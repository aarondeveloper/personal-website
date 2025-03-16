'use client';

import { useAmbientSound } from '../contexts/AmbientSoundContext';

export default function RainButton() {
  const { isPlaying, toggleSound } = useAmbientSound();

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-4 right-4 md:top-4 md:right-4 z-50 bg-black/40 backdrop-blur-sm p-2 rounded-full hover:bg-black/60 transition-colors duration-200"
      aria-label={isPlaying ? 'Stop rain sound' : 'Play rain sound'}
    >
      {isPlaying ? (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 2v20M19 2v20" />
        </svg>
      ) : (
        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19.0001L21 19M3 15.0001C5.48276 15.0001 7.34483 12 7.34483 12C7.34483 12 9.2069 15.0001 11.6897 15.0001C14.1724 15.0001 16.0345 12 16.0345 12C16.0345 12 17.8966 15.0001 20.3793 15.0001M3 11.0001C5.48276 11.0001 7.34483 8.00012 7.34483 8.00012C7.34483 8.00012 9.2069 11.0001 11.6897 11.0001C14.1724 11.0001 16.0345 8.00012 16.0345 8.00012C16.0345 8.00012 17.8966 11.0001 20.3793 11.0001M3 7.00012C5.48276 7.00012 7.34483 4.00012 7.34483 4.00012C7.34483 4.00012 9.2069 7.00012 11.6897 7.00012C14.1724 7.00012 16.0345 4.00012 16.0345 4.00012C16.0345 4.00012 17.8966 7.00012 20.3793 7.00012" />
        </svg>
      )}
    </button>
  );
} 