import Image from 'next/image';

function ForestMist() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 forest-mist"></div>
      <div className="absolute inset-0 forest-mist" style={{ animationDelay: '10s' }}></div>
    </div>
  );
}

function RainEffect() {
  const raindrops = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 1 + 0.5}s`,
    animationDelay: `${Math.random() * 2}s`
  }));

  return (
    <div className="fixed inset-0 pointer-events-none opacity-20">
      {raindrops.map(drop => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: drop.left,
            animationDuration: drop.animationDuration,
            animationDelay: drop.animationDelay
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Forest GIF background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("/forest-rain.gif")',
              filter: 'brightness(0.8)'
            }}
          ></div>
          
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>

        {/* Atmospheric effects */}
        <ForestMist />
        <RainEffect />

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-8 px-6 max-w-7xl mx-auto">
          {/* Image container */}
          <div className="relative w-64 h-80 md:w-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
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

          {/* Text content */}
          <div className="text-center md:text-left px-4 backdrop-blur-sm bg-black/20 py-8 rounded-2xl max-w-2xl">
            <h1 className="text-7xl md:text-9xl font-extrabold font-montserrat mb-6">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
                AARON
              </span>
              <span className="block text-4xl md:text-5xl mt-2 text-emerald-100">
                Full Stack Developer
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl font-inter text-emerald-50 max-w-2xl mx-auto mb-8">
              Crafting digital experiences with code and creativity
            </p>
            
            <div className="flex gap-6 justify-center md:justify-start">
              <button className="px-8 py-4 bg-emerald-600/80 hover:bg-emerald-600 backdrop-blur-sm rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-lg">
                View Projects
              </button>
              <button className="px-8 py-4 border-2 border-white/80 hover:border-white backdrop-blur-sm hover:bg-white/20 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-lg">
                Contact Me
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg 
            className="w-6 h-6 text-white/80"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>
    </main>
  );
}
