'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

interface AmbientSoundContextType {
  isPlaying: boolean;
  volume: number;
  autoplayBlocked: boolean;
  toggleSound: () => Promise<void>;
  setVolume: (volume: number) => void;
}

const AmbientSoundContext = createContext<AmbientSoundContextType | null>(null);

export function useAmbientSound() {
  const context = useContext(AmbientSoundContext);
  if (!context) {
    throw new Error('useAmbientSound must be used within an AmbientSoundProvider');
  }
  return context;
}

export function AmbientSoundProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [autoplayBlocked, setAutoplayBlocked] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const hasAttemptedPlay = useRef(false);
  const isInitialized = useRef(false);

  // Initialize audio context and setup - only runs once
  useEffect(() => {
    const initializeAudio = async () => {
      if (!audioContextRef.current && !isInitialized.current) {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          audioContextRef.current = new AudioContextClass();
          
          // Create audio element
          const audio = new Audio('/sounds/rain-and-little-storm.mp3');
          audio.loop = true;
          audio.volume = volume;
          audioRef.current = audio;
          
          isInitialized.current = true;

          const attemptPlay = async () => {
            try {
              hasAttemptedPlay.current = true;
              if (audioContextRef.current?.state === 'suspended') {
                await audioContextRef.current.resume();
              }
              const playPromise = audio.play();
              if (playPromise) {
                await playPromise;
                setIsPlaying(true);
                setAutoplayBlocked(false);
              }
            } catch (error) {
              console.log("Autoplay prevented by browser", error);
              setIsPlaying(false);
              setAutoplayBlocked(true);
            }
          };

          // Try to play immediately
          if (!hasAttemptedPlay.current) {
            attemptPlay();
          }

          // Also try on first interaction
          const handleInteraction = () => {
            if (!hasAttemptedPlay.current) {
              attemptPlay();
              document.removeEventListener('click', handleInteraction);
            }
          };
          
          document.addEventListener('click', handleInteraction);

          return () => {
            document.removeEventListener('click', handleInteraction);
          };
        } catch (error) {
          console.error('Failed to initialize audio:', error);
          setAutoplayBlocked(true);
        }
      }
    };

    initializeAudio();

    // Cleanup function
    return () => {
      if (isInitialized.current) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
          audioContextRef.current.close().catch(console.error);
        }
        isInitialized.current = false;
      }
    };
  }, []); // Empty dependency array - only run once on mount

  // Handle volume changes separately
  useEffect(() => {
    if (audioRef.current && isInitialized.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleSound = async () => {
    if (!audioRef.current) return;
    
    try {
      if (!isPlaying) {
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        await audioRef.current.play();
        setAutoplayBlocked(false);
      } else {
        audioRef.current.pause();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling sound:', error);
      setAutoplayBlocked(true);
    }
  };

  return (
    <AmbientSoundContext.Provider 
      value={{ 
        isPlaying, 
        volume, 
        autoplayBlocked, 
        toggleSound, 
        setVolume 
      }}
    >
      {children}
    </AmbientSoundContext.Provider>
  );
} 