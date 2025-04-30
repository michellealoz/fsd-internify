import { motion } from 'framer-motion';
import {
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
} from 'react-icons/ri';
import DashboardLayout from '../../components/DashboardLayout';

const Dashboard = () => {
  // Sample data for charts and statistics
  const studentProgress = [
    { name: 'John Doe', progress: 85, status: 'On Track' },
    { name: 'Jane Smith', progress: 70, status: 'Needs Review' },
    { name: 'Mike Johnson', progress: 92, status: 'On Track' },
    { name: 'Sarah Wilson', progress: 65, status: 'At Risk' },
    { name: 'Tom Brown', progress: 78, status: 'On Track' },
  ];

  const statusDistribution = [
    { name: 'On Track', value: 15 },
    { name: 'Needs Review', value: 8 },
    { name: 'At Risk', value: 4 },
    { name: 'Completed', value: 10 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'];

  const pendingReviews = [
    {
      student: 'John Doe',
      task: 'Weekly Progress Report',
      deadline: '2024-03-20',
      type: 'Report',
    },
    {
      student: 'Jane Smith',
      task: 'Project Milestone 2',
      deadline: '2024-03-22',
      type: 'Milestone',
    },
    {
      student: 'Mike Johnson',
      task: 'Monthly Evaluation',
      deadline: '2024-03-25',
      type: 'Evaluation',
    },
  ];

  const sdgImpact = [
    { sdg: 'Quality Education', students: 12 },
    { sdg: 'Decent Work', students: 8 },
    { sdg: 'Industry Innovation', students: 15 },
    { sdg: 'Partnerships', students: 10 },
  ];

  return (
    <DashboardLayout userRole="mentor">
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back, Dr. Smith!</h1>
          <p className="text-gray-400">Monitor your students' progress and pending reviews</p>
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
                <RiTeamLine className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">Total Students</p>
                <h3 className="text-2xl font-bold text-white">37</h3>
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
                <RiCheckboxCircleLine className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">Completed Internships</p>
                <h3 className="text-2xl font-bold text-white">10</h3>
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
                <RiTimeLine className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">Pending Reviews</p>
                <h3 className="text-2xl font-bold text-white">8</h3>
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
                <RiGlobalLine className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">SDGs Covered</p>
                <h3 className="text-2xl font-bold text-white">6</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Student Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Student Progress</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentProgress}>
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
                  <Bar dataKey="progress" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Status Distribution</h2>
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
                      backgroundColor: '#d5d8de',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Reviews and SDG Impact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Pending Reviews</h2>
            <div className="space-y-4">
              {pendingReviews.map((review, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1e293b] rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <RiFileList3Line className="text-xl text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{review.student}</h3>
                      <p className="text-sm text-gray-400">{review.task}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{review.deadline}</p>
                    <span className="text-sm px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400">
                      {review.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* SDG Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">SDG Impact</h2>
            <div className="space-y-4">
              {sdgImpact.map((sdg, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{sdg.sdg}</span>
                    <span className="text-indigo-400">{sdg.students} students</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(sdg.students / 37) * 100}%` }}
                      transition={{ duration: 1, delay: 0.9 }}
                      className="bg-indigo-500 h-2 rounded-full"
                    />
                  </div>
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