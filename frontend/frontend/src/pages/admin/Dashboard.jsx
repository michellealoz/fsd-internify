import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  RiTeamLine,
  RiBarChartLine,
  RiFileList3Line,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiGlobalLine,
  RiUserLine,
  RiBuildingLine,
} from 'react-icons/ri';
import DashboardLayout from '../../components/DashboardLayout';

const Dashboard = () => {
  // Sample data for charts and statistics
  const departmentStats = [
    { name: 'CSE', students: 120, mentors: 12, internships: 95 },
    { name: 'ECS', students: 85, mentors: 8, internships: 70 },
    { name: 'ME', students: 95, mentors: 10, internships: 80 },
    { name: 'CE', students: 75, mentors: 7, internships: 60 },
  ];

  const monthlyProgress = [
    { name: 'Jan', internships: 45,  },
    { name: 'Feb', internships: 55,  },
    { name: 'Mar', internships: 65,  },
    { name: 'Apr', internships: 75,  },
    { name: 'May', internships: 85,  },
    { name: 'Jun', internships: 95,  },
  ];

  const statusDistribution = [
    { name: 'Active', value: 250 },
    { name: 'Completed', value: 180 },
    { name: 'Pending', value: 120 },
    { name: 'On Hold', value: 50 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'];

  const recentActivities = [
    {
      type: 'Mentor Assignment',
      description: 'Dr. Smith assigned to 5 new students',
      time: '2 hours ago',
    },
    {
      type: 'New Internship',
      description: 'Tech Corp posted 3 new positions',
      time: '4 hours ago',
    },
    {
      type: 'Department Update',
      description: 'CS Department added new SDG goals',
      time: '6 hours ago',
    },
  ];

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Monitor system-wide statistics and manage internship programs</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <RiUserLine className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">Total Students</p>
                <h3 className="text-2xl font-bold text-white">375</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <RiTeamLine className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">Active Mentors</p>
                <h3 className="text-2xl font-bold text-white">37</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <RiBuildingLine className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">Partner Companies</p>
                <h3 className="text-2xl font-bold text-white">85</h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <RiCheckboxCircleLine className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">Success Rate</p>
                <h3 className="text-2xl font-bold text-white">92%</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Monthly Progress</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyProgress}>
                  <defs>
                    <linearGradient id="internshipColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="placementColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="internships"
                    stroke="#6366f1"
                    fill="url(#internshipColor)"
                  />
                  <Area
                    type="monotone"
                    dataKey="placements"
                    stroke="#8b5cf6"
                    fill="url(#placementColor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Department Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Department Statistics</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentStats}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="students" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="internships" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Status Distribution and Recent Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Internship Status</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#d8dce3',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1e293b] rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <RiTimeLine className="text-xl text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{activity.type}</h3>
                      <p className="text-sm text-gray-400">{activity.description}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 