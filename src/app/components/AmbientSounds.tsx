import { useAmbientSound } from '../contexts/AmbientSoundContext';

export default function AmbientSounds() {
  const { isPlaying, volume, autoplayBlocked, toggleSound, setVolume } = useAmbientSound();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleSound}
        className="bg-black/40 backdrop-blur-sm rounded-xl px-3 py-1.5 text-emerald-200 hover:text-emerald-100 transition-colors font-medium text-sm"
      >
        {autoplayBlocked && !isPlaying 
          ? 'Rain On' 
          : isPlaying 
            ? 'Rain Off' 
            : 'Rain On'
        }
      </button>

      <div className="flex flex-col gap-1">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 accent-emerald-400"
        />
      </div>
    </div>
  );
} 