import { motion } from 'framer-motion';
import { theme } from '../theme';

const About = () => {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-[#0a0e1a] z-10" />
        <div className="absolute inset-0 bg-[url('/about-bg.jpg')] bg-cover bg-center" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={theme.animations.default}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
            About <span className="text-indigo-400">Internify</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Empowering students through meaningful internship experiences
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={theme.animations.default}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-400">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              To bridge the gap between academic learning and professional experience by providing
              students with structured internship opportunities and comprehensive progress tracking.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Student-Centric',
                description:
                  'Empowering students with tools to track their progress, set goals, and showcase their achievements.',
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
              },
              {
                title: 'Mentor Support',
                description:
                  'Connecting students with experienced mentors who provide guidance and feedback throughout their internship journey.',
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: 'SDG Alignment',
                description:
                  'Helping students understand how their work contributes to the United Nations Sustainable Development Goals.',
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ ...theme.animations.default, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#0f172a] p-8 rounded-lg border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="mb-6 p-3 bg-indigo-500/10 rounded-lg w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-indigo-400">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* Team Section */}
<section className="py-20 px-4 bg-[#0f172a]">
  <div className="container mx-auto max-w-6xl">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={theme.animations.default}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-400">Our Team</h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Meet the passionate individuals behind Internify, dedicated to transforming the internship
        experience for students worldwide.
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          name: 'John Doe',
          role: 'Founder & CEO',
          image: '/images/man1.jpeg',
        },
        {
          name: 'Jane Smith',
          role: 'Head of Education',
          image: '/images/woman.jpeg',
        },
        {
          name: 'Mike Johnson',
          role: 'Technical Lead',
          image: '/images/man2.jpg',
        },
      ].map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ ...theme.animations.default, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-64 h-64 rounded-full overflow-hidden mb-6 border-4 border-indigo-500/20">
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold mb-2 text-indigo-400">{member.name}</h3>
          <p className="text-gray-400 text-lg">{member.role}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={theme.animations.default}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-400">
              Ready to Transform Your Internship Experience?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join Internify today and take the first step towards a more meaningful and
              well-documented internship journey.
            </p>
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About; 