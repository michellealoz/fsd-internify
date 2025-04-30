import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  RiUserAddLine,
  RiSearchLine,
  RiFilterLine,
  RiMoreLine,
  RiMailLine,
  RiPhoneLine,
  RiTeamLine,
} from 'react-icons/ri';
import DashboardLayout from '../../components/DashboardLayout';

const Mentors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  // Sample mentors data
  const mentors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@internify.com',
      phone: '+1 234 567 8901',
      department: 'Computer Science',
      students: 15,
      rating: 4.8,
      status: 'Active',
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      email: 'michael.chen@internify.com',
      phone: '+1 234 567 8902',
      department: 'Electronics',
      students: 12,
      rating: 4.6,
      status: 'Active',
    },
    {
      id: 3,
      name: 'Dr. Emily Brown',
      email: 'emily.brown@internify.com',
      phone: '+1 234 567 8903',
      department: 'Mechanical',
      students: 10,
      rating: 4.7,
      status: 'Active',
    },
    {
      id: 4,
      name: 'Prof. David Wilson',
      email: 'david.wilson@internify.com',
      phone: '+1 234 567 8904',
      department: 'Civil',
      students: 8,
      rating: 4.5,
      status: 'On Leave',
    },
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === 'all' || mentor.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Mentors</h1>
              <p className="text-gray-400">Manage and monitor mentor activities</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors">
              <RiUserAddLine />
              <span>Add Mentor</span>
            </button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex space-x-4"
        >
          <div className="flex-1 relative">
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f172a] text-white pl-10 pr-4 py-2 rounded-lg border border-indigo-500/20 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="bg-[#0f172a] text-white px-4 py-2 rounded-lg border border-indigo-500/20 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Electronics">Electronics</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
          </select>
        </motion.div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center">
                    <RiTeamLine className="text-2xl text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{mentor.name}</h3>
                    <p className="text-gray-400">{mentor.department}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-indigo-500/10 rounded-lg transition-colors">
                  <RiMoreLine className="text-gray-400" />
                </button>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <RiMailLine />
                  <span>{mentor.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <RiPhoneLine />
                  <span>{mentor.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-indigo-500/20">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-400">Students</p>
                    <p className="text-white font-medium">{mentor.students}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Rating</p>
                    <p className="text-white font-medium">{mentor.rating}/5.0</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      mentor.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {mentor.status}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Mentors; 