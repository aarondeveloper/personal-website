import { useAmbientSound } from '../contexts/AmbientSoundContext';

export default function AmbientSounds() {
  const { isPlaying, volume, autoplayBlocked, toggleSound, setVolume } = useAmbientSound();

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
    </div>
  );
} 