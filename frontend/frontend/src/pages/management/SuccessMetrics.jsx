import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
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
import { RiUserSmileLine, RiBuildingLine, RiTimeLine, RiBarChartLine } from 'react-icons/ri';

const SuccessMetrics = () => {
  const metrics = [
    {
      title: 'Student Satisfaction',
      value: '4.8/5',
      change: '+0.3',
      icon: RiUserSmileLine,
    },
    {
      title: 'Industry Feedback',
      value: '4.6/5',
      change: '+0.2',
      icon: RiBuildingLine,
    },
    {
      title: 'Completion Rate',
      value: '94%',
      change: '+5%',
      icon: RiTimeLine,
    },
    {
      title: 'Skill Match Rate',
      value: '89%',
      change: '+3%',
      icon: RiBarChartLine,
    },
  ];

  const satisfactionTrends = [
    { month: 'Jan', student: 4.5, industry: 4.3 },
    { month: 'Feb', student: 4.6, industry: 4.4 },
    { month: 'Mar', student: 4.7, industry: 4.5 },
    { month: 'Apr', student: 4.7, industry: 4.6 },
    { month: 'May', student: 4.8, industry: 4.6 },
    { month: 'Jun', student: 4.8, industry: 4.7 },
  ];

  const skillGaps = [
    { skill: 'Technical', current: 85, required: 90 },
    { skill: 'Communication', current: 78, required: 85 },
    { skill: 'Problem Solving', current: 82, required: 88 },
    { skill: 'Leadership', current: 75, required: 80 },
    { skill: 'Innovation', current: 80, required: 85 },
  ];

  const placementData = [
    { name: 'Placed', value: 475 },
    { name: 'In Progress', value: 85 },
    { name: 'Not Started', value: 40 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef'];

  return (
    <div className="p-6 space-y-6 ml-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">Program Success Metrics</h1>
        <p className="text-gray-400">Comprehensive analysis of internship program performance</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <metric.icon className="text-2xl text-indigo-400" />
              </div>
              <div>
                <p className="text-gray-400">{metric.title}</p>
                <div className="flex items-center space-x-2">
                  <h3 className="text-2xl font-bold text-white">{metric.value}</h3>
                  <span className="text-sm text-emerald-400">{metric.change}</span>
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
          <h2 className="text-xl font-semibold text-white mb-6">Satisfaction Trends</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={satisfactionTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={[0, 5]} />
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
                  dataKey="student"
                  stroke="#6366f1"
                  strokeWidth={2}
                  name="Student"
                />
                <Line
                  type="monotone"
                  dataKey="industry"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  name="Industry"
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
          <h2 className="text-xl font-semibold text-white mb-6">Skill Gap Analysis</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillGaps}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="skill" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="current" fill="#6366f1" name="Current Level" />
                <Bar dataKey="required" fill="#8b5cf6" name="Required Level" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20 col-span-2"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Placement Status</h2>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={placementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {placementData.map((entry, index) => (
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
            <div className="flex flex-col space-y-2">
              {placementData.map((entry, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-400">
                    {entry.name}: {entry.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessMetrics;