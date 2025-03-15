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
          <div className="absolute inset-0 bg-black opacity-30"></div>
        </div>

        {/* Atmospheric effects */}
        <ForestMist />
        <RainEffect />

        {/* Content */}
        <div className="relative z-10 text-center px-4 backdrop-blur-sm bg-black/20 py-8 rounded-2xl">
          <h1 className="text-6xl md:text-8xl font-extrabold font-montserrat mb-6">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-200">
              AARON
            </span>
            <span className="block text-3xl md:text-4xl mt-2 text-emerald-100">
              Full Stack Developer
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl font-inter text-emerald-50 max-w-2xl mx-auto mb-8">
            Crafting digital experiences with code and creativity
          </p>
          
          <div className="flex gap-6 justify-center">
            <button className="px-8 py-3 bg-emerald-600/80 hover:bg-emerald-600 backdrop-blur-sm rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              View Projects
            </button>
            <button className="px-8 py-3 border-2 border-white/80 hover:border-white backdrop-blur-sm hover:bg-white/20 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
              Contact Me
            </button>
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
