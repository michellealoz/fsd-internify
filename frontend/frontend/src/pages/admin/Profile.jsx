import { motion } from 'framer-motion';
import { RiUserLine, RiMailLine, RiPhoneLine, RiBuilding2Line } from 'react-icons/ri';
import DashboardLayout from '../../components/DashboardLayout';

const Profile = () => {
  // Mock admin data - replace with actual data from your auth context
  const adminData = {
    name: 'John Smith',
    email: 'john.smith@internify.com',
    phone: '+1 234 567 8900',
    department: 'Administration',
    role: 'System Administrator',
    joinDate: 'January 2023',
    responsibilities: [
      'User Management',
      'System Configuration',
      'Internship Program Oversight',
      'Department Coordination'
    ]
  };

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
          <h1 className="text-2xl font-bold text-white mb-2">Admin Profile</h1>
          <p className="text-gray-400">Manage your profile information and settings</p>
        </motion.div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <RiUserLine className="text-xl text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-400">Full Name</p>
                  <h3 className="text-white font-medium">{adminData.name}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <RiMailLine className="text-xl text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-400">Email</p>
                  <h3 className="text-white font-medium">{adminData.email}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <RiPhoneLine className="text-xl text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-400">Phone</p>
                  <h3 className="text-white font-medium">{adminData.phone}</h3>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <RiBuilding2Line className="text-xl text-indigo-400" />
                </div>
                <div>
                  <p className="text-gray-400">Department</p>
                  <h3 className="text-white font-medium">{adminData.department}</h3>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Role & Responsibilities</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Role</p>
                <h3 className="text-white font-medium">{adminData.role}</h3>
              </div>
              <div>
                <p className="text-gray-400">Join Date</p>
                <h3 className="text-white font-medium">{adminData.joinDate}</h3>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Key Responsibilities</p>
                <ul className="space-y-2">
                  {adminData.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      <span className="text-white">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile; 