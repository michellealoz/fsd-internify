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
} from 'recharts';
import { RiTeamLine, RiBuilding2Line, RiGroupLine, RiGlobalLine } from 'react-icons/ri';

const Overview = () => {
  const statistics = [
    {
      title: 'Total Active Interns',
      value: '1,234',
      change: '+12%',
      icon: RiTeamLine,
    },
    {
      title: 'Partner Companies',
      value: '156',
      change: '+8%',
      icon: RiBuilding2Line,
    },
    {
      title: 'Departments',
      value: '12',
      change: '+2',
      icon: RiGroupLine,
    },
    {
      title: 'Industry Sectors',
      value: '25',
      change: '+5',
      icon: RiGlobalLine,
    },
  ];

  const monthlyData = [
    { month: 'Jan', placements: 45, applications: 120 },
    { month: 'Feb', placements: 52, applications: 140 },
    { month: 'Mar', placements: 61, applications: 158 },
    { month: 'Apr', placements: 67, applications: 170 },
    { month: 'May', placements: 71, applications: 180 },
    { month: 'Jun', placements: 78, applications: 190 },
  ];

  const departmentData = [
    { name: 'Computer Science', interns: 450, companies: 45 },
    { name: 'Electronics', interns: 380, companies: 38 },
    { name: 'Mechanical', interns: 320, companies: 35 },
    { name: 'Civil', interns: 290, companies: 30 },
    { name: 'Chemical', interns: 260, companies: 28 },
  ];

  return (
    <div className="p-6 space-y-6 ml-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">Institution-Wide Overview</h1>
        <p className="text-gray-400">Comprehensive view of internship statistics across the institution</p>
      </motion.div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {statistics.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <stat.icon className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">{stat.title}</p>
                <div className="flex items-center space-x-2">
                  <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                  <span className="text-sm text-emerald-400">{stat.change}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Monthly Placement Trends</h2>
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
                  dataKey="placements"
                  stroke="#6366f1"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="applications"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Department-wise Distribution</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData}>
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
                <Bar dataKey="interns" fill="#6366f1" />
                <Bar dataKey="companies" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;