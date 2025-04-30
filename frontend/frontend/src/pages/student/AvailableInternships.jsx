import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiMapPin, FiCalendar, FiClock, FiBookmark } from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';

const AvailableInternships = () => {
  const [internships, setInternships] = useState([
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp Solutions',
      location: 'San Francisco, CA (Remote)',
      type: 'Full-time',
      duration: '3 months',
      stipend: '$1500/month',
      deadline: '2024-04-30',
      description: 'Looking for a passionate frontend developer intern to join our team. Work on real-world projects using React, Next.js, and Tailwind CSS.',
      skills: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
      saved: false,
      applied: false
    },
    {
      id: 2,
      title: 'Backend Developer Intern',
      company: 'InnovateTech',
      location: 'New York, NY (Hybrid)',
      type: 'Full-time',
      duration: '6 months',
      stipend: '$2000/month',
      deadline: '2024-05-15',
      description: 'Join our backend team to develop scalable APIs and microservices. You will work with Node.js, Express, and MongoDB.',
      skills: ['Node.js', 'Express', 'MongoDB', 'API Development'],
      saved: true,
      applied: false
    },
    {
      id: 3,
      title: 'UI/UX Design Intern',
      company: 'Creative Designs Co.',
      location: 'Chicago, IL (On-site)',
      type: 'Part-time',
      duration: '4 months',
      stipend: '$1200/month',
      deadline: '2024-05-05',
      description: 'Help us create beautiful and intuitive user interfaces for web and mobile applications. Experience with Figma and Adobe XD is a plus.',
      skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Wireframing'],
      saved: false,
      applied: true
    },
    {
      id: 4,
      title: 'Data Science Intern',
      company: 'DataMetrics Inc.',
      location: 'Boston, MA (Remote)',
      type: 'Full-time',
      duration: '6 months',
      stipend: '$2500/month',
      deadline: '2024-05-20',
      description: 'Work on machine learning projects and data analysis. Help us extract valuable insights from large datasets.',
      skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL'],
      saved: false,
      applied: false
    },
    {
      id: 5,
      title: 'DevOps Engineer Intern',
      company: 'CloudSys Technologies',
      location: 'Seattle, WA (Hybrid)',
      type: 'Full-time',
      duration: '3 months',
      stipend: '$1800/month',
      deadline: '2024-04-25',
      description: 'Join our DevOps team to learn about CI/CD pipelines, containerization, and cloud infrastructure.',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
      saved: false,
      applied: false
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    duration: ''
  });

  // Dummy function to fetch internships from backend
  const fetchInternships = async (filters) => {
    try {
      // In real app, this would be an API call with filter params
      console.log('Fetching internships with filters:', filters);
      // const response = await fetch('/api/internships', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(filters)
      // });
      // const data = await response.json();
      // setInternships(data);
    } catch (error) {
      console.error('Error fetching internships:', error);
    }
  };

  // Dummy function to toggle saved status
  const toggleSaved = async (internshipId) => {
    try {
      // In real app, this would save to user's profile via API
      console.log(`Toggling saved status for internship ${internshipId}`);
      // const response = await fetch(`/api/internships/${internshipId}/save`, {
      //   method: 'POST'
      // });
      
      // For now, update the local state
      setInternships(prevInternships => 
        prevInternships.map(internship => 
          internship.id === internshipId 
            ? {...internship, saved: !internship.saved} 
            : internship
        )
      );
    } catch (error) {
      console.error('Error saving internship:', error);
    }
  };

  // Dummy function to apply for internship
  const applyForInternship = async (internshipId) => {
    try {
      // In real app, this would submit application via API
      console.log(`Applying for internship ${internshipId}`);
      // const response = await fetch(`/api/internships/${internshipId}/apply`, {
      //   method: 'POST'
      // });
      
      // For now, update the local state
      setInternships(prevInternships => 
        prevInternships.map(internship => 
          internship.id === internshipId 
            ? {...internship, applied: true} 
            : internship
        )
      );

      alert('Application submitted successfully!');
    } catch (error) {
      console.error('Error applying for internship:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    // In real app, this would call fetchInternships with filters
    fetchInternships(filters);
  };

  useEffect(() => {
    // Initial fetch
    fetchInternships({});
  }, []);

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h1 className="text-2xl font-bold text-white mb-4">Available Internships</h1>
          <p className="text-gray-400 mb-6">Discover internship opportunities matching your skills and interests</p>
          
          {/* Search and Filters */}
          <div className="bg-gray-800/30 p-4 rounded-xl mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search by title, company, or skills"
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <div>
                <select
                  name="location"
                  value={filters.location}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Locations</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>
              
              <div>
                <button
                  onClick={applyFilters}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Apply Filters
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Types</option>
                  <option value="fulltime">Full-time</option>
                  <option value="parttime">Part-time</option>
                </select>
              </div>
              
              <div>
                <select
                  name="duration"
                  value={filters.duration}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Durations</option>
                  <option value="0-3">0-3 months</option>
                  <option value="3-6">3-6 months</option>
                  <option value="6+">6+ months</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Internship Listings */}
          <div className="space-y-6">
            {internships.map(internship => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-indigo-500/30 transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-white">{internship.title}</h2>
                  <button
                    onClick={() => toggleSaved(internship.id)}
                    className={`p-2 rounded-full ${internship.saved ? 'text-yellow-500 bg-yellow-500/10' : 'text-gray-400 bg-gray-700'}`}
                  >
                    <FiBookmark />
                  </button>
                </div>
                
                <h3 className="text-lg text-indigo-400 mb-3">{internship.company}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center text-gray-300">
                    <FiMapPin className="mr-2 text-gray-400" />
                    {internship.location}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FiBriefcase className="mr-2 text-gray-400" />
                    {internship.type}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FiClock className="mr-2 text-gray-400" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <FiCalendar className="mr-2 text-gray-400" />
                    Deadline: {internship.deadline}
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4">{internship.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {internship.skills.map((skill, index) => (
                    <span key={index} className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-medium text-white">{internship.stipend}</span>
                  {internship.applied ? (
                    <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
                      Applied
                    </span>
                  ) : (
                    <button
                      onClick={() => applyForInternship(internship.id)}
                      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Apply Now
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AvailableInternships;