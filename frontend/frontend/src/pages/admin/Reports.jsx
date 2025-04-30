import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  RiDownloadLine,
  RiFilter2Line,
  RiCalendarLine,
  RiBarChartLine,
} from 'react-icons/ri';
import DashboardLayout from '../../components/DashboardLayout';

const Reports = () => {
  // Sample data for reports
  const monthlyData = [
    { month: 'Jan', applications: 65, placements: 45, completion: 40 },
    { month: 'Feb', applications: 75, placements: 55, completion: 48 },
    { month: 'Mar', applications: 85, placements: 65, completion: 55 },
    { month: 'Apr', applications: 95, placements: 75, completion: 65 },
    { month: 'May', applications: 120, placements: 90, completion: 78 },
    { month: 'Jun', applications: 110, placements: 85, completion: 72 },
  ];

  const departmentData = [
    { name: 'CSE', value: 35 },
    { name: 'ECE', value: 25 },
    { name: 'ME', value: 20 },
    { name: 'CE', value: 20 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'];

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
              <h1 className="text-2xl font-bold text-white mb-2">Reports</h1>
              <p className="text-gray-400">View and analyze internship program statistics</p>
            </div>
            <div className="flex space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors">
                <RiFilter2Line />
                <span>Filter</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors">
                <RiDownloadLine />
                <span>Export</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Monthly Trends</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="applications"
                    stroke="#6366f1"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="placements"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="completion"
                    stroke="#d946ef"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Department Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Department Distribution</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Performance Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20 col-span-2"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Performance Metrics</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="applications" fill="#6366f1" />
                  <Bar dataKey="placements" fill="#8b5cf6" />
                  <Bar dataKey="completion" fill="#d946ef" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports; 