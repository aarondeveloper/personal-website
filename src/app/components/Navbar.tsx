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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Rain Controls - Web Only */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block">
          <AmbientSounds />
        </div>

        <div className="flex items-center justify-center py-4 md:py-2">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0">
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
                  } px-3 py-2 text-lg font-medium border-b-2 transition-colors duration-150 ease-in-out text-center`}
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