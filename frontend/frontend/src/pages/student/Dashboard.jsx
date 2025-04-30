import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  RiCalendarLine,
  RiBarChartLine,
  RiFileList3Line,
  RiCheckboxCircleLine,
  RiTimeLine,
  RiGlobalLine
} from 'react-icons/ri';
import DashboardLayout from '../../components/DashboardLayout';

const Dashboard = () => {
  // Sample data for charts
  const progressData = [
    { name: 'Week 1', progress: 20 },
    { name: 'Week 2', progress: 35 },
    { name: 'Week 3', progress: 45 },
    { name: 'Week 4', progress: 60 },
    { name: 'Week 5', progress: 75 },
    { name: 'Week 6', progress: 85 },
  ];

  const sdgData = [
    { name: 'Quality Education', value: 35 },
    { name: 'Industry Innovation', value: 25 },
    { name: 'Decent Work', value: 20 },
    { name: 'Partnerships', value: 20 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'];

  const deadlines = [
    { task: 'Submit Weekly Report', date: '2024-03-20', status: 'Pending' },
    { task: 'Project Presentation', date: '2024-03-25', status: 'Upcoming' },
    { task: 'Mentor Meeting', date: '2024-03-22', status: 'Scheduled' },
  ];

  const poMapping = [
    { po: 'PO1', description: 'Engineering Knowledge', progress: 75 },
    { po: 'PO2', description: 'Problem Analysis', progress: 85 },
    { po: 'PO3', description: 'Design/Development', progress: 60 },
    { po: 'PO4', description: 'Investigation', progress: 70 },
  ];

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back, John!</h1>
          <p className="text-gray-400">Track your internship progress and upcoming tasks</p>
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
                <RiBarChartLine className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">Overall Progress</p>
                <h3 className="text-2xl font-bold text-white">85%</h3>
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
                <RiFileList3Line className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">Tasks Completed</p>
                <h3 className="text-2xl font-bold text-white">12/15</h3>
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
                <RiCalendarLine className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">Days Remaining</p>
                <h3 className="text-2xl font-bold text-white">45</h3>
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
                <p className="text-gray-400">SDG Goals Met</p>
                <h3 className="text-2xl font-bold text-white">4/5</h3>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Progress Timeline</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={progressData}>
                  <defs>
                    <linearGradient id="progressColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
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
                    dataKey="progress"
                    stroke="#6366f1"
                    fill="url(#progressColor)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* PO Mapping and Deadlines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* PO Mapping */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Program Outcomes (PO)</h2>
            <div className="space-y-4">
              {poMapping.map((po) => (
                <div key={po.po} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">{po.po} - {po.description}</span>
                    <span className="text-indigo-400">{po.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${po.progress}%` }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="bg-indigo-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Deadlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Upcoming Deadlines</h2>
            <div className="space-y-4">
              {deadlines.map((deadline, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-[#1e293b] rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                      <RiTimeLine className="text-xl text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{deadline.task}</h3>
                      <p className="text-sm text-gray-400">{deadline.date}</p>
                    </div>
                  </div>
                  <span className="text-sm px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400">
                    {deadline.status}
                  </span>
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