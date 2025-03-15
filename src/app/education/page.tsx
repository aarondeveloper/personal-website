import PageTemplate from '../components/PageTemplate';

export default function Education() {
  return (
    <PageTemplate>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        <div>
          <h1 className="text-4xl font-bold text-emerald-400 mb-8">Education</h1>
          <p className="text-xl text-emerald-100 mb-12">
            My academic journey in computer science and software development.
          </p>
        </div>

        {/* Sample Education Items */}
        <div className="space-y-24">
          {/* Education Item 1 */}
          <div className="relative">
            <div className="absolute -left-4 h-full w-0.5 bg-emerald-400/50"></div>
            <div className="pl-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-2">
                University Name
              </h3>
              <p className="text-emerald-200 mb-2">
                Bachelor of Science in Computer Science
              </p>
              <p className="text-emerald-400 mb-4">2019 - 2023</p>
              <div className="prose prose-invert">
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                  nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <ul className="list-disc text-gray-300 mt-4 ml-4">
                  <li>Dean's List - All Semesters</li>
                  <li>Senior Thesis: Machine Learning in Game Development</li>
                  <li>Computer Science Club President</li>
                  <li>Participated in ACM Programming Competitions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Item 2 */}
          <div className="relative">
            <div className="absolute -left-4 h-full w-0.5 bg-emerald-400/50"></div>
            <div className="pl-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-2">
                Online Certifications
              </h3>
              <p className="text-emerald-200 mb-2">
                Various Technical Certifications
              </p>
              <p className="text-emerald-400 mb-4">2020 - Present</p>
              <div className="prose prose-invert">
                <p className="text-gray-300">
                  Continuously expanding my knowledge through online courses and certifications
                  in various technologies and frameworks.
                </p>
                <ul className="list-disc text-gray-300 mt-4 ml-4">
                  <li>AWS Certified Developer Associate</li>
                  <li>MongoDB University Certification</li>
                  <li>React Advanced Concepts Certification</li>
                  <li>TypeScript Professional Certification</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Item 3 */}
          <div className="relative">
            <div className="absolute -left-4 h-full w-0.5 bg-emerald-400/50"></div>
            <div className="pl-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-2">
                High School
              </h3>
              <p className="text-emerald-200 mb-2">
                Advanced Placement Computer Science
              </p>
              <p className="text-emerald-400 mb-4">2015 - 2019</p>
              <div className="prose prose-invert">
                <p className="text-gray-300">
                  Early exposure to computer science principles and programming fundamentals.
                </p>
                <ul className="list-disc text-gray-300 mt-4 ml-4">
                  <li>AP Computer Science A - Score: 5</li>
                  <li>Robotics Club Team Lead</li>
                  <li>First Place in Regional Programming Competition</li>
                  <li>Started coding tutorials YouTube channel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
} 