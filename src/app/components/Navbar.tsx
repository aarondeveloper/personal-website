'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AmbientSounds from './AmbientSounds';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'About Me', path: '/' },
    { name: 'Education', path: '/education' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <nav className="w-full bg-black/40 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative">
        {/* Rain Controls - Web Only */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
          <AmbientSounds />
        </div>

        <div className="flex items-center justify-center py-2 md:py-2">
          <div className="flex flex-row flex-wrap justify-center gap-x-2 md:gap-x-8">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`${
                    isActive
                      ? 'text-emerald-400 border-emerald-400'
                      : 'text-gray-300 hover:text-emerald-300 border-transparent'
                  } px-2 py-1.5 text-sm md:text-lg md:px-3 md:py-2 font-medium border-b-2 transition-colors duration-150 ease-in-out text-center whitespace-nowrap`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
} 