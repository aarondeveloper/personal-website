'use client';

import PageTemplate from '../components/PageTemplate';
import Image from 'next/image';

const experiences = [
  {
    company: 'Fastbreak AI',
    role: 'Full Stack Software Engineer / Data Scientist',
    period: 'Jun. 2024 - Present',
    logo: '/fastbreak_ai_logo.jpg',
    technologies: ['Python', 'Bash', 'PHP', 'JavaScript', 'SQL', 'React', 'GitHub', 'Linux'],
    achievements: [
      'Developed and implemented data extraction mechanisms from frontend interactions, transforming and structuring data for seamless integration into the database',
      'Automated report generation processes using Python, improving geo-location analysis and significantly reducing manual workload',
      'Configured and optimized Salesforce CRM for lead tracking, user engagement monitoring, and business intelligence',
      'Designed and implemented ORM-based solutions to facilitate communication between multiple database architectures, ensuring robust and scalable system integration',
      'Optimized server and client-side caching mechanisms, reducing AJAX and API call overhead to enhance performance and prevent site traffic overload'
    ]
  },
  {
    company: 'Gleghorn Biomedical Engineering Lab',
    role: 'Machine Learning Engineer / Data Scientist',
    period: 'Jan. 2023 - Feb. 2024',
    subtitle: 'Undergraduate Researcher',
    logo: '/ud_logo.png',
    technologies: ['Python', 'Flask', 'Pandas', 'Transformers'],
    achievements: [
      'Delivered technical presentations at research showcases, effectively communicating findings to diverse audiences',
      'Developed a machine learning framework utilizing natural language processing (NLP) to enhance protein functionality prediction',
      'Engineered and preprocessed biological datasets to train a Large Language Model (LLM) for protein sequence analysis',
      'Designed and implemented a Flask-based web application, enabling interactive querying of predictive models',
      'Achieved 92% accuracy on the test dataset, demonstrating the efficacy of the developed predictive model'
    ],
    metrics: {
      accuracy: 92,
      description: 'Model Accuracy on Test Dataset'
    }
  }
];

export default function Experience() {
  return (
    <PageTemplate>
      <main className="min-h-screen flex flex-col pt-24">
        <div className="relative flex-1 flex flex-col items-center px-5 mx-auto max-w-[1850px]">
          <h1 className="text-4xl font-bold text-white mb-12">Professional Experience</h1>
          
          <div className="w-full space-y-8">
            {experiences.map((experience) => (
              <div
                key={experience.company}
                className="bg-black/30 backdrop-blur-md rounded-2xl p-8 transform hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-xl animate-pulse"></div>
                      <Image
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        fill
                        className="object-contain p-2 rounded-xl"
                        priority
                      />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
                        {experience.company}
                      </h2>
                      <h3 className="text-xl text-white mt-2">{experience.role}</h3>
                      {experience.subtitle && (
                        <p className="text-gray-400 mt-1">{experience.subtitle}</p>
                      )}
                    </div>
                  </div>
                  <span className="text-emerald-400 font-mono mt-2 md:mt-0">
                    {experience.period}
                  </span>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {experience.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Achievements */}
                <ul className="space-y-3">
                  {experience.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 group"
                    >
                      <span className="text-emerald-400 mt-1.5">•</span>
                      <p className="text-gray-300 group-hover:text-white transition-colors">
                        {achievement}
                      </p>
                    </li>
                  ))}
                </ul>

                {/* Metrics if available */}
                {experience.metrics && (
                  <div className="mt-6 bg-emerald-500/10 rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16">
                        <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#064e3b"
                            strokeWidth="3"
                            strokeDasharray="100, 100"
                          />
                          <path
                            d="M18 2.0845
                              a 15.9155 15.9155 0 0 1 0 31.831
                              a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3"
                            strokeDasharray={`${experience.metrics.accuracy}, 100`}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-emerald-400 font-bold">{experience.metrics.accuracy}%</span>
                        </div>
                      </div>
                      <p className="text-emerald-400">{experience.metrics.description}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </PageTemplate>
  );
} 