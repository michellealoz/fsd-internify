import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const partners = [
    { name: 'Athena', logo: '/images/athenajpeg.jpeg' },
    { name: 'BaronFig', logo: '/images/baronfig.jpg' },
    { name: 'TrustFund', logo: '/images/trustfund.jpg' },
    { name: 'Native', logo: '/images/native.jpg' },
    { name: 'SmartMoney', logo: '/images/smartmoney.png' }
  ];
  
  const features = [
    {
      title: 'Active users right now',
      value: '120.9k',
      chart: '/images/active-users-chart.svg'
    },
    {
      title: 'Everything is based on data, not assumptions',
      description: 'Built to deliver in-depth decision making, empowering users with key decisions',
      chart: '/images/data-chart.svg'
    },
    {
      title: 'The data is continuously updated, processed by AI',
      description: 'Fresh data from real-time analysis and evaluations transforms insights on demand for AI',
      chart: '/images/ai-chart.svg'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              Transform Your Career With Our Leading Internship Platform
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Join thousands of successful interns and companies on our innovative platform. Experience seamless progress tracking, mentorship, and career growth opportunities all in one place.
            </p>
            <div className="flex gap-4">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Journey
              </Link>
              <Link
                to="/about"
                className="border border-indigo-400 hover:border-purple-400 px-8 py-3 rounded-lg font-semibold transition-colors text-indigo-400 hover:text-purple-400"
              >
                Explore Features
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-20 blur-xl"></div>
              <img
                src="/public/images/dash.png"
                alt="Dashboard Preview"
                className="relative rounded-lg shadow-2xl border border-indigo-500/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="border-t border-slate-700">
        <div className="container mx-auto px-4 py-12">
          <p className="text-center text-gray-400 mb-8">Trusted by Industry Leaders</p>
          <div className="flex flex-wrap justify-center gap-12">
            {partners.map((partner) => (
              <motion.img
                key={partner.name}
                src={partner.logo}
                alt={partner.name}
                className="opacity-60 hover:opacity-100 transition-opacity rounded-2xl w-20 h-20"
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text"
        >
          Innovative Features,<br />Designed for Your Success
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-indigo-500/50 transition-colors"
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">
                {feature.title}
                </h3>
              {feature.description && (
                <p className="text-gray-400 mb-6">{feature.description}</p>
              )}
              <img src={feature.chart} alt="Chart" className="w-full" />
              </motion.div>
            ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
            Success Stories from<br />Industry Leaders
          </h2>
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 mb-12">
            <p className="text-xl mb-6">
              "Internify has revolutionized how we manage our internship program. The platform's innovative features and intuitive design have significantly improved our ability to track progress and ensure success for both interns and mentors."
            </p>
            <div className="flex items-center justify-center gap-4">
              <img src="/images/sarahjohnson.jpg" alt="Testimonial" className="w-20 h-20 rounded-full ring-2 ring-indigo-500/50" />
              <div className="text-left">
                <p className="font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">Sarah Johnson</p>
                <p className="text-gray-400">HR Director at TechCorp</p>
              </div>
            </div>
          </div>
          </motion.div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-800/50 backdrop-blur-sm py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              Begin Your Success Story
            </h2>
            <p className="text-gray-400 mb-8">
              Join thousands of successful professionals who have accelerated their careers with Internify
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/signup"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="border border-indigo-400 hover:border-purple-400 px-8 py-3 rounded-lg font-semibold transition-colors text-indigo-400 hover:text-purple-400"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features and Benefits Section */}
      <section className="py-20 px-4 bg-[#0a0e1a]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              Empowering Every Role
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover how Internify transforms the internship experience for everyone involved
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0f172a] rounded-xl overflow-hidden border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 p-8"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-indigo-400 ml-4">For Students</h3>
              </div>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time progress tracking and milestone achievements</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Direct communication with industry mentors</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>SDG-aligned project tracking and impact measurement</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Skill development tracking and certification</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Career guidance and networking opportunities</span>
                </li>
              </ul>
            </motion.div>

            {/* Mentor Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-[#0f172a] rounded-xl overflow-hidden border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 p-8"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-indigo-400 ml-4">For Mentors</h3>
              </div>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Streamlined student progress monitoring</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Automated task assignment and tracking</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Performance analytics and feedback tools</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Resource sharing and knowledge base</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Professional development opportunities</span>
                </li>
              </ul>
            </motion.div>

            {/* Management Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-[#0f172a] rounded-xl overflow-hidden border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 p-8"
            >
              <div className="flex items-center mb-6">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-indigo-400 ml-4">For Management</h3>
              </div>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Comprehensive program analytics and reporting</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Department-wide performance metrics</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Resource allocation and optimization</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Strategic planning and decision support</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-indigo-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quality assurance and compliance tracking</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;