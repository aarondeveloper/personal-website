import { useState, useEffect, useRef } from 'react';

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext
  }
}

export default function AmbientSounds() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [autoplayBlocked, setAutoplayBlocked] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const hasAttemptedPlay = useRef(false);
  const isInitialized = useRef(false);

  // Initialize audio context and setup
  useEffect(() => {
    const initializeAudio = async () => {
      if (!audioContextRef.current && audioRef.current && !isInitialized.current) {
        try {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          audioContextRef.current = new AudioContextClass();
          audioRef.current.volume = volume;
          audioRef.current.loop = true;
          isInitialized.current = true;

          const attemptPlay = async () => {
            try {
              hasAttemptedPlay.current = true;
              if (audioContextRef.current?.state === 'suspended') {
                await audioContextRef.current.resume();
              }
              const playPromise = audioRef.current?.play();
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
  }, []); // Empty dependency array for initialization

  // Handle volume changes separately
  useEffect(() => {
    if (audioRef.current && isInitialized.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const toggleSound = async () => {
    try {
      if (!isPlaying) {
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        await audioRef.current?.play();
        setAutoplayBlocked(false);
      } else {
        audioRef.current?.pause();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling sound:', error);
      setAutoplayBlocked(true);
    }
  };

  return (
    <div className="fixed top-4 left-4 z-[100] flex items-center gap-4">
      <button
        onClick={toggleSound}
        className="bg-black/40 backdrop-blur-sm rounded-xl px-4 py-2 text-emerald-200 hover:text-emerald-100 transition-colors font-medium"
      >
        {autoplayBlocked && !isPlaying 
          ? 'Click to Turn Rain On' 
          : isPlaying 
            ? 'Click to Turn Rain Off' 
            : 'Click to Turn Rain On'
        }
      </button>

      <div className="flex flex-col gap-1">
        <span className="text-emerald-200 text-sm">Adjust Rain Intensity</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32 accent-emerald-400"
        />
      </div>

      <audio 
        ref={audioRef} 
        preload="auto"
      >
        <source src="/sounds/rain-and-little-storm.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
} 