import PageTemplate from '../components/PageTemplate';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

// Add interface at the top of the file
interface ProjectLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface Project {
  name: string;
  description: string;
  technologies: string[];
  youtubeId?: string;
  image: string;
  links: ProjectLink[];
  award: {
    title: string;
    event: string;
    organization: string;
  };
}

const projects: Project[] = [
  {
    name: 'Ada.ai',
    description: 'A mobile application that leverages OpenAI\'s ChatGPT API to provide computer science tutoring. Earned Best Educational Hack first prize at HenHacks 2023 (University of Delaware).',
    technologies: ['Dart', 'Flutter', 'OpenAI API'],
    youtubeId: 'q_VSDMeWVrk',
    image: '/ada_ai_logo.png',
    links: [
      {
        name: 'GitHub Repo',
        url: 'https://github.com/jma02/ada.ai',
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        )
      },
      {
        name: 'Devpost',
        url: 'https://devpost.com/software/ada-ai',
        icon: (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853z"/>
          </svg>
        )
      }
    ],
    award: {
      title: 'Best Educational Hack',
      event: 'HenHacks 2023',
      organization: 'University of Delaware'
    }
  }
];

export default function Projects() {
  return (
    <PageTemplate>
      <div className="min-h-screen pt-16 w-full overflow-x-hidden">
      
        <div className="px-4 md:px-5 mx-auto w-full max-w-[1850px]">
          {/*<h1 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-12 text-center">Projects</h1>*/}
          
          {/* GitHub Profile Section - Entire Section is Clickable */}
          <Link 
            href="https://github.com/aarondeveloper" 
            target="_blank"
            rel="noopener noreferrer"
            className="mb-8 bg-black/40 backdrop-blur-sm rounded-xl p-4 md:p-6 flex items-center hover:bg-black/50 transition-all duration-200 hover:scale-[1.01] hover:shadow-emerald-500/20 hover:shadow-lg group w-full"
          >
            <div className="flex items-center gap-3 w-full">
              <svg className="w-8 h-8 text-emerald-300 group-hover:text-emerald-200 transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <div>
                <h2 className="text-xl font-semibold text-emerald-200 group-hover:text-emerald-100 transition-colors">Find my code on GitHub</h2>
                <p className="text-emerald-100/80 text-sm">View all my repositories and contributions</p>
              </div>
            </div>
          </Link>
          
          <div className="grid gap-6 md:gap-8 w-full">
            {projects.map((project) => (
              <div
                key={project.name}
                className="bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-8 transform hover:scale-[1.01] transition-all duration-300 w-full"
              >
                {/* Mobile: Stack everything vertically */}
                <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] gap-6 w-full">
                  {/* Video Container */}
                  <div className="aspect-video w-full md:w-48">
                    <div className="relative w-full h-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-xl animate-pulse"></div>
                      {project.youtubeId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&loop=1&mute=1&playlist=${project.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                          className="w-full h-full rounded-xl"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          frameBorder="0"
                        />
                      ) : (
                        <Image
                          src={project.image}
                          alt={`${project.name} logo`}
                          fill
                          className="object-contain p-2 rounded-xl"
                          priority
                        />
                      )}
                    </div>
                  </div>

                  {/* Content Stack */}
                  <div className="grid gap-4 w-full">
                    {/* Title and Award */}
                    <div className="w-full">
                      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent break-words">
                        {project.name}
                      </h2>
                      {project.award && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-yellow-400 break-words">{project.award.title}</span>
                          <span className="text-gray-400 hidden md:inline">•</span>
                          <span className="text-gray-300 text-sm md:text-base break-words">{project.award.event}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm md:text-base break-words">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-emerald-500/20 text-emerald-400 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm flex-shrink-0"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-3">
                      {project.links.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 text-sm md:text-base flex-shrink-0"
                        >
                          {link.icon}
                          <span className="break-words">{link.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
} 