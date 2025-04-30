import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiCalendar, FiClock, FiCheck, FiX, FiClock as FiPending } from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';

const MyApplications = () => {
  const [applications, setApplications] = useState([
    {
      id: 1,
      title: 'Full Stack Developer Intern',
      company: 'WebSolutions Ltd.',
      logo: '/company-logos/websolutions.png',
      location: 'Austin, TX (Remote)',
      type: 'Full-time',
      duration: '6 months',
      appliedDate: '2024-03-01',
      status: 'Accepted',
      interview: {
        scheduled: true,
        date: '2024-03-15',
        time: '10:00 AM',
        link: 'https://meet.google.com/abc-defg-hij'
      }
    },
    {
      id: 2,
      title: 'UI/UX Design Intern',
      company: 'Creative Designs Co.',
      logo: '/company-logos/creative.png',
      location: 'Chicago, IL (On-site)',
      type: 'Part-time',
      duration: '4 months',
      appliedDate: '2024-03-05',
      status: 'Under Review',
      interview: {
        scheduled: false
      }
    },
    {
      id: 3,
      title: 'Mobile App Developer Intern',
      company: 'AppTech Systems',
      logo: '/company-logos/apptech.png',
      location: 'San Diego, CA (Hybrid)',
      type: 'Full-time',
      duration: '3 months',
      appliedDate: '2024-02-20',
      status: 'Rejected',
      interview: {
        scheduled: false
      }
    },
    {
      id: 4,
      title: 'Data Analyst Intern',
      company: 'DataInsights Inc.',
      logo: '/company-logos/datainsights.png',
      location: 'Denver, CO (Remote)',
      type: 'Full-time',
      duration: '6 months',
      appliedDate: '2024-03-10',
      status: 'Interview Scheduled',
      interview: {
        scheduled: true,
        date: '2024-03-25',
        time: '2:00 PM',
        link: 'https://zoom.us/j/123456789'
      }
    }
  ]);

  // Filtering state
  const [filterStatus, setFilterStatus] = useState('all');

  // Dummy function to fetch applications from backend
  const fetchApplications = async (userId, status = 'all') => {
    try {
      // In real app, this would be an API call
      console.log(`Fetching applications for user ${userId} with status filter: ${status}`);
      // const response = await fetch(`/api/applications?userId=${userId}&status=${status}`);
      // const data = await response.json();
      // setApplications(data);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  // Dummy function to withdraw application
  const withdrawApplication = async (applicationId) => {
    try {
      // In real app, this would be an API call
      console.log(`Withdrawing application ${applicationId}`);
      // await fetch(`/api/applications/${applicationId}/withdraw`, {
      //   method: 'POST'
      // });
      
      // For demo, just remove from state
      setApplications(prev => prev.filter(app => app.id !== applicationId));
      alert('Application withdrawn successfully.');
    } catch (error) {
      console.error('Error withdrawing application:', error);
    }
  };

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilterStatus(status);
    // In real app, this would refetch filtered data
    fetchApplications('ST12345', status);
  };

  useEffect(() => {
    // Initial fetch with userId (would be from auth context in real app)
    fetchApplications('ST12345');
  }, []);

  // Filter applications based on status for our demo
  const filteredApplications = filterStatus === 'all' 
    ? applications 
    : applications.filter(app => app.status.toLowerCase() === filterStatus.toLowerCase());

  // Helper for status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Accepted':
        return <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 flex items-center"><FiCheck className="mr-1" /> {status}</span>;
      case 'Rejected':
        return <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 flex items-center"><FiX className="mr-1" /> {status}</span>;
      case 'Interview Scheduled':
        return <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 flex items-center"><FiCalendar className="mr-1" /> {status}</span>;
      default:
        return <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 flex items-center"><FiPending className="mr-1" /> {status}</span>;
    }
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h1 className="text-2xl font-bold text-white mb-4">My Applications</h1>
          <p className="text-gray-400 mb-6">Track the status of your internship applications</p>
          
          {/* Status Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => handleFilterChange('all')}
              className={`px-4 py-2 rounded-lg transition ${filterStatus === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              All
            </button>
            <button 
              onClick={() => handleFilterChange('under review')}
              className={`px-4 py-2 rounded-lg transition ${filterStatus === 'under review' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Under Review
            </button>
            <button 
              onClick={() => handleFilterChange('interview scheduled')}
              className={`px-4 py-2 rounded-lg transition ${filterStatus === 'interview scheduled' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Interview Scheduled
            </button>
            <button 
              onClick={() => handleFilterChange('accepted')}
              className={`px-4 py-2 rounded-lg transition ${filterStatus === 'accepted' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Accepted
            </button>
            <button 
              onClick={() => handleFilterChange('rejected')}
              className={`px-4 py-2 rounded-lg transition ${filterStatus === 'rejected' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Rejected
            </button>
          </div>
          
          {/* Applications List */}
          <div className="space-y-4">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((app) => (
                <motion.div 
                  key={app.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-indigo-500/50 transition"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                        {app.logo ? (
                          <img src={app.logo} alt={app.company} className="w-8 h-8" />
                        ) : (
                          <FiBriefcase className="w-6 h-6 text-indigo-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{app.title}</h3>
                        <div className="text-gray-400">{app.company}</div>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                          <div className="flex items-center text-gray-400">
                            <FiMapPin className="mr-1" /> {app.location}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <FiClock className="mr-1" /> {app.type}
                          </div>
                          <div className="flex items-center text-gray-400">
                            <FiCalendar className="mr-1" /> Applied: {new Date(app.appliedDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-start md:items-end space-y-2 w-full md:w-auto">
                      {getStatusBadge(app.status)}
                      
                      {app.interview.scheduled && (
                        <div className="text-sm text-gray-300 mt-2">
                          <div className="flex items-center">
                            <FiCalendar className="mr-1" /> Interview: {new Date(app.interview.date).toLocaleDateString()} at {app.interview.time}
                          </div>
                          {app.interview.link && (
                            <a 
                              href={app.interview.link} 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-400 hover:text-indigo-300 mt-1 block"
                            >
                              Join Meeting Link
                            </a>
                          )}
                        </div>
                      )}
                      
                      {app.status !== 'Rejected' && app.status !== 'Accepted' && (
                        <button 
                          onClick={() => withdrawApplication(app.id)}
                          className="mt-2 px-3 py-1 text-sm rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 transition"
                        >
                          Withdraw Application
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No applications found with the selected filter.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MyApplications;