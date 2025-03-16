'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'About Me', path: '/' },
    { name: 'Education', path: '/education' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <nav className="w-full bg-black/40 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-8 md:py-4">
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-6 md:space-y-0">
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
                  } px-3 py-3 text-lg font-medium border-b-2 transition-colors duration-150 ease-in-out text-center`}
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