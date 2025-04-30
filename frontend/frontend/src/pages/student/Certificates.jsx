import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiDownload, FiExternalLink, FiCalendar, FiCheckCircle, FiClock } from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';

const Certificates = () => {
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      title: 'Web Development Fundamentals',
      issuer: 'FreeCodeCamp',
      issuedDate: '2023-12-15',
      expiryDate: '2026-12-15',
      credentialId: 'FCC-WD-123456',
      credentialURL: 'https://freecodecamp.org/certification/user/web-dev',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      status: 'completed',
      image: '/images/images.jpeg'
    },
    {
      id: 2,
      title: 'Python for Data Science',
      issuer: 'DataCamp',
      issuedDate: '2024-01-23',
      expiryDate: null,
      credentialId: 'DC-PDS-789012',
      credentialURL: 'https://datacamp.com/certificates/python-ds',
      skills: ['Python', 'NumPy', 'Pandas', 'Data Visualization'],
      status: 'completed',
      image: '/images/573cfa30e528.png'
    },
    {
      id: 3,
      title: 'Machine Learning Specialization',
      issuer: 'Coursera',
      issuedDate: null,
      expiryDate: null,
      credentialId: null,
      credentialURL: null,
      progress: 75,
      skills: ['Machine Learning', 'TensorFlow', 'Neural Networks'],
      status: 'in-progress',
      expectedCompletion: '2024-06-30'
    },
    {
      id: 4,
      title: 'AWS Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issuedDate: '2023-09-10',
      expiryDate: '2026-09-10',
      credentialId: 'AWS-CP-345678',
      credentialURL: 'https://aws.training/certification/verify',
      skills: ['Cloud Computing', 'AWS Services', 'Cloud Security'],
      status: 'completed',
      image: '/images/image771495085737125892.webp'
    }
  ]);

  // Filter state
  const [filter, setFilter] = useState('all');

  // Dummy function to fetch certificates from backend
  const fetchCertificates = async (userId) => {
    try {
      // In real app, this would be an API call
      console.log(`Fetching certificates for user ${userId}`);
      // const response = await fetch(`/api/certificates?userId=${userId}`);
      // const data = await response.json();
      // setCertificates(data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  useEffect(() => {
    // Initial fetch with userId (would be from auth context in real app)
    fetchCertificates('ST12345');
  }, []);

  // Filter certificates based on status
  const filteredCertificates = filter === 'all' 
    ? certificates 
    : certificates.filter(cert => cert.status === filter);

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h1 className="text-2xl font-bold text-white mb-4">My Certificates</h1>
          <p className="text-gray-400 mb-6">Track your educational certificates and credentials</p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <FiCheckCircle className="inline mr-1" /> Completed
            </button>
            <button 
              onClick={() => setFilter('in-progress')}
              className={`px-4 py-2 rounded-lg transition ${filter === 'in-progress' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <FiClock className="inline mr-1" /> In Progress
            </button>
          </div>
          
          {/* Certificates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCertificates.length > 0 ? (
              filteredCertificates.map((certificate) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500/50 transition flex flex-col h-full"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mr-3">
                      <FiAward className="text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white">{certificate.title}</h3>
                  </div>
                  
                  {certificate.image && certificate.status === 'completed' && (
                    <div className="mb-4 bg-gray-900 rounded-lg overflow-hidden">
                      <img 
                        src={certificate.image} 
                        alt={certificate.title} 
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          e.target.src = '/placeholders/certificate.png';
                        }}
                      />
                    </div>
                  )}
                  
                  {certificate.status === 'in-progress' && (
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{certificate.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-indigo-600 h-2.5 rounded-full" 
                          style={{ width: `${certificate.progress}%` }}
                        ></div>
                      </div>
                      {certificate.expectedCompletion && (
                        <div className="mt-2 text-sm text-gray-400 flex items-center">
                          <FiCalendar className="mr-1" /> Expected completion: {new Date(certificate.expectedCompletion).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex-1 space-y-3">
                    <div className="text-gray-300">
                      Issued by: <span className="text-white">{certificate.issuer}</span>
                    </div>
                    
                    {certificate.issuedDate && (
                      <div className="text-sm text-gray-400 flex items-center">
                        <FiCalendar className="mr-1" /> Issued: {new Date(certificate.issuedDate).toLocaleDateString()}
                      </div>
                    )}
                    
                    {certificate.expiryDate && (
                      <div className="text-sm text-gray-400">
                        Expires: {new Date(certificate.expiryDate).toLocaleDateString()}
                      </div>
                    )}
                    
                    {certificate.credentialId && (
                      <div className="text-sm text-gray-400">
                        Credential ID: {certificate.credentialId}
                      </div>
                    )}
                    
                    {certificate.skills && certificate.skills.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm text-gray-400 mb-2">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {certificate.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-gray-700 rounded-md text-xs text-gray-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {certificate.status === 'completed' && (
                    <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between">
                      {certificate.credentialURL && (
                        <a 
                          href={certificate.credentialURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center"
                        >
                          <FiExternalLink className="mr-1" /> Verify
                        </a>
                      )}
                      <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center">
                        <FiDownload className="mr-1" /> Download
                      </button>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-8 text-gray-400">
                No certificates found with the selected filter.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Certificates;