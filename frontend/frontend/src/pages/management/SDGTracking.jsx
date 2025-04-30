import { motion } from 'framer-motion';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';

const SDGTracking = () => {
  const sdgData = [
    { goal: 'Quality Education', current: 85, target: 90 },
    { goal: 'Decent Work', current: 78, target: 85 },
    { goal: 'Industry Innovation', current: 92, target: 95 },
    { goal: 'Reduced Inequalities', current: 75, target: 80 },
    { goal: 'Partnerships', current: 88, target: 92 },
  ];

  const monthlyProgress = [
    { month: 'Jan', education: 82, work: 75, innovation: 88 },
    { month: 'Feb', education: 84, work: 76, innovation: 89 },
    { month: 'Mar', education: 85, work: 78, innovation: 90 },
    { month: 'Apr', education: 86, work: 77, innovation: 91 },
    { month: 'May', education: 85, work: 78, innovation: 92 },
    { month: 'Jun', education: 87, work: 79, innovation: 92 },
  ];

  const departmentSDG = [
    { name: 'Computer Science', score: 88 },
    { name: 'Electronics', score: 85 },
    { name: 'Mechanical', score: 82 },
    { name: 'Civil', score: 80 },
    { name: 'Chemical', score: 83 },
  ];

  return (
    <div className="p-6 space-y-6 ml-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">SDG Contribution Tracking</h1>
        <p className="text-gray-400">Monitor and analyze SDG alignment across internship programs</p>
      </motion.div>

      {/* SDG Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h2 className="text-xl font-semibold text-white mb-6">SDG Achievement vs Targets</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sdgData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="goal" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="current" fill="#6366f1" name="Current" />
                <Bar dataKey="target" fill="#8b5cf6" name="Target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Department-wise SDG Impact</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={departmentSDG}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="name" stroke="#94a3b8" />
                <PolarRadiusAxis stroke="#94a3b8" />
                <Radar
                  name="SDG Score"
                  dataKey="score"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Monthly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
      >
        <h2 className="text-xl font-semibold text-white mb-6">Monthly SDG Progress</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyProgress}>
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
                dataKey="education"
                stroke="#6366f1"
                name="Quality Education"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="work"
                stroke="#8b5cf6"
                name="Decent Work"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="innovation"
                stroke="#d946ef"
                name="Industry Innovation"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default SDGTracking;