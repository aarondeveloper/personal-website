'use client';

import PageTemplate from '../components/PageTemplate';
import Image from 'next/image';

const courses = [
  // Core Programming & Software Engineering
  { name: 'Intro to Computer Science I', tech: 'Python' },
  { name: 'Intro to Computer Science II', tech: 'Java' },
  { name: 'Intro to Systems Programming', tech: 'C' },
  { name: 'Data Structures', tech: 'C++' },
  { name: 'Machine Organization & Assembly', tech: 'Assembly' },
  { name: 'Intro to Software Engineering', tech: 'Java' },
  { name: 'Written Communications in Business', tech: 'Technical Writing' },
  
  // Theory & Algorithms
  { name: 'Discrete Mathematics I', tech: 'Mathematics' },
  { name: 'Automata Theory', tech: 'Theory' },
  { name: 'Logic for Programming', tech: 'Prolog' },
  { name: 'Introduction to Algorithms', tech: 'Python' },
  
  // Systems & Networks
  { name: 'Operating Systems', tech: 'C' },
  { name: 'Computer Networks I', tech: 'Python' },
  { name: 'Parallel Computing', tech: 'C++' },
  
  // Data & AI
  { name: 'Database Systems', tech: 'SQL' },
  { name: 'Machine Learning', tech: 'Python' },
  { name: 'Cloud Computing', tech: 'AWS' },
  { name: 'Data Analytics & Financial Tech', tech: 'Python' },
  
  // Mathematics & Statistics
  { name: 'Analytic Geometry & Calculus A', tech: 'Mathematics' },
  { name: 'Analytic Geometry & Calculus B', tech: 'Mathematics' },
  { name: 'Statistical Methods', tech: 'Statistics' },
  { name: 'Elementary Linear Algebra', tech: 'Mathematics' },
  
  // Senior Projects & Ethics
  { name: 'Senior Design Project I', tech: 'Full Stack' },
  { name: 'Senior Design Project II', tech: 'Full Stack' },
  { name: 'Computers, Ethics and Society', tech: 'Ethics' },
  { name: 'Undergraduate Research', tech: 'Research' },
  { name: 'First-Year Writing', tech: 'Communication' },
];

const scholarships = [
  'Winter Scholars',
  'Summer Scholars',
  'AICOE Scholars',
];

export default function Education() {
  return (
    <PageTemplate>
      <main className="min-h-screen flex flex-col pt-8 md:pt-16">
        <div className="relative flex-1 flex flex-col items-center px-3 md:px-5 mx-auto max-w-[1850px]">
          {/* Header Section */}
          <div className="w-full bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-8 mb-6 md:mb-8 transform hover:scale-[1.02] transition-transform duration-300">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full animate-pulse"></div>
                <Image
                  src="/ud_logo.png"
                  alt="University of Delaware Logo"
                  fill
                  className="rounded-full object-contain p-[2px]"
                  priority
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 md:gap-0">
                  <div>
                    <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
                      University of Delaware
                    </h1>
                    <h2 className="text-lg md:text-2xl text-white mt-1 md:mt-2">B.S. in Computer Science</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg md:text-xl text-emerald-400">GPA: 3.571</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-gray-400">4.0</span>
                    </div>
                  </div>
                  <a
                    href="/transcript.pdf"
                    download
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-all duration-200 hover:scale-105 group text-sm md:text-base"
                  >
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:-translate-y-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download Transcript
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Scholarships Section */}
          <div className="w-full mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Scholarship Awards</h2>
            <div className="flex flex-col md:flex-wrap md:flex-row gap-3 md:gap-4">
              {scholarships.map((scholarship) => (
                <div
                  key={scholarship}
                  className="bg-gradient-to-r from-blue-500/20 to-yellow-500/20 backdrop-blur-md rounded-xl p-4 md:p-6 hover:from-blue-500/30 hover:to-yellow-500/30 transition-all duration-300 hover:-translate-y-1 w-full md:w-auto"
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <h3 className="text-lg md:text-xl font-semibold text-white">{scholarship}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Grid */}
          <div className="w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">Relevant Coursework</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {courses.map((course) => (
                <div
                  key={course.name}
                  className="group bg-black/30 backdrop-blur-md rounded-xl p-3 md:p-4 hover:bg-black/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <h3 className="text-white text-base md:text-lg font-semibold group-hover:text-emerald-400 transition-colors">
                    {course.name}
                  </h3>
                  {course.tech && (
                    <span className="inline-block bg-emerald-500/20 text-emerald-400 px-2 py-0.5 md:py-1 rounded-md text-xs md:text-sm mt-2">
                      {course.tech}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </PageTemplate>
  );
} 