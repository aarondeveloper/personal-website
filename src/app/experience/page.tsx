'use client';

import PageTemplate from '../components/PageTemplate';
import Image from 'next/image';
import Link from 'next/link';

const experiences = [
  {
    company: 'Fastbreak AI',
    role: 'Full Stack Software Engineer / Data Scientist',
    period: 'Jun. 2024 - Present',
    duration: '1 Year',
    logo: '/fastbreak_ai_logo.jpg',
    technologies: ['Python', 'AWS', 'React', 'Next.js', 'PostgreSQL', 'DBT', 'Snowflake'],
    achievements: [
      'Engineered ETL workflows to capture, transform, and load frontend event data into PostgreSQL',
      'Automated Python-driven geo-location analytics and report generation, cutting manual effort and accelerating insights',
      'Led end-to-end development of a React Native mobile app, integrating Supabase for the backend and Auth0 for secure user authentication',
      'Implemented Snowflake Snowpipe to automate ELT/ETL pipelines, ingesting new data from S3 into Snowflake pipelines',
      'Built Next.js/React dashboards to schedule, monitor, and visualize ML model runs, enhancing team productivity'
    ]
  },
  {
    company: 'ZADSTER LLC',
    role: 'Full Stack Architect',
    period: 'May 2024 - May 2025',
    duration: '1 year',
    logo: '/zadster_logo.png',
    technologies: ['Next.js', 'Typescript', 'AWS', 'ORM', 'PostgreSQL', 'Auth0'],
    achievements: [
      'Engineered a responsive Next.js and Tailwind CSS front end for users to log and track vehicle restoration projects, receipts, and modifications',
      'Implemented Auth0 for secure user sign-up, authentication, and email verification',
      'Designed and optimized PostgreSQL schemas to manage user profiles, project data, and transaction histories'
    ]
  },
  {
    company: 'Macys',
    role: 'Luxury Sales Associate',
    period: 'Aug. 2023 - Feb. 2024',
    duration: '6 months',
    logo: '/macys_logo.png',
    technologies: ['Sales', 'Management'],
    achievements: [
      'Met and exceeded monthly luxury sales targets through tailored styling consultations, strategic upselling, and cultivating long-term client relationships'
    ]
  },
  {
    company: 'Gleghorn Biomedical Engineering Lab',
    role: 'Machine Learning Engineer / Data Scientist',
    period: 'Jan. 2023 - Feb. 2024',
    duration: '1 year 1 month',
    logo: '/ud_logo.png',
    technologies: ['Python', 'Flask', 'Huggingface', 'AWS', 'BigQuery', 'PostgreSQL'],
    achievements: [
      'Presented complex research results at lab showcases, translating technical insights for cross-disciplinary audiences',
      'Architected an NLP-driven ML pipeline to predict protein functionality, boosting prediction accuracy and reliability',
      'Processed and curated biological datasets to train custom LLMs for advanced protein sequence analysis',
      'Built a Flask web interface for real-time model queries, streamlining user access to predictive insights',
      'Refined model parameters to achieve 92% test accuracy, validating the framework\'s robustness'
    ]
  }
];

export default function Experience() {
  return (
    <PageTemplate>
      <main className="min-h-screen flex flex-col pt-8 md:pt-16">
        <div className="relative flex-1 flex flex-col items-center px-3 md:px-5 mx-auto max-w-[1850px]">
          
          {/* LinkedIn and Resume Buttons - Visible on all devices */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6 w-full">
            {/* LinkedIn Button */}
            <Link 
              href="https://www.linkedin.com/in/aaron-oster/" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black/40 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center hover:bg-black/50 transition-all duration-200 hover:scale-[1.01] hover:shadow-emerald-500/20 hover:shadow-lg group w-full sm:w-1/2"
            >
              <div className="flex items-center gap-3">
                <svg className="w-7 h-7 text-emerald-300 group-hover:text-emerald-200 transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-emerald-200 group-hover:text-emerald-100 transition-colors">LinkedIn Profile</h2>
                  <p className="text-emerald-100/80 text-sm">Connect with me professionally</p>
                </div>
              </div>
            </Link>
            
            {/* Resume Button */}
            <a 
              href="/Aaron_Oster_s_Resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              download
              className="bg-black/40 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center hover:bg-black/50 transition-all duration-200 hover:scale-[1.01] hover:shadow-emerald-500/20 hover:shadow-lg group w-full sm:w-1/2"
            >
              <div className="flex items-center gap-3">
                <svg className="w-7 h-7 text-emerald-300 group-hover:text-emerald-200 transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15h8v2H8v-2zm0-4h8v2H8v-2z"/>
                </svg>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-emerald-200 group-hover:text-emerald-100 transition-colors">Download Resume</h2>
                  <p className="text-emerald-100/80 text-sm">View my qualifications</p>
                </div>
              </div>
            </a>
          </div>
          
          <div className="w-full space-y-6 md:space-y-8">
            {experiences.map((experience) => (
              <div
                key={experience.company}
                className="bg-black/30 backdrop-blur-md rounded-2xl p-4 md:p-8 transform hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-xl animate-pulse"></div>
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        fill
                        className="object-contain p-2 rounded-xl"
                        priority
                      />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between w-full md:w-auto">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                          {experience.company}
                        </h2>
                        <h3 className="text-lg md:text-xl text-white mt-1 md:mt-2">{experience.role}</h3>
                      </div>
                      <div className="flex flex-col mt-2 md:mt-0 md:ml-4 md:items-end md:text-right">
                        <span className="text-emerald-400 font-mono text-sm md:text-base">
                          {experience.period}
                        </span>
                        <span className="text-emerald-300/80 font-mono text-xs md:text-sm mt-0.5">
                          {experience.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-emerald-500/20 text-emerald-400 px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <ul className="space-y-2 md:space-y-3">
                  {experience.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 md:gap-3 group"
                    >
                      <span className="text-emerald-400 mt-1 md:mt-1.5">•</span>
                      <p className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
                        {achievement}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageTemplate>
  );
} 