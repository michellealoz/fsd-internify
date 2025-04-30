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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
  Legend,
} from 'recharts';
import {
  RiBarChartLine,
  RiPieChartLine,
  RiLineChartLine,
  RiGlobalLine,
  RiTimeLine,
  RiGroupLine,
  RiBuilding2Line,
  RiAwardLine,
  RiBookOpenLine,
} from 'react-icons/ri';

const Statistics = () => {
  // Sample data for charts and statistics
  const yearlyTrends = [
    { year: '2020', students: 250, placements: 200, companies: 45 },
    { year: '2021', students: 300, placements: 260, companies: 55 },
    { year: '2022', students: 380, placements: 340, companies: 70 },
    { year: '2023', students: 450, placements: 410, companies: 85 },
    { year: '2024', students: 500, placements: 475, companies: 95 },
  ];

  const sdgImpact = [
    { sdg: 'Quality Education', score: 85 },
    { sdg: 'Decent Work', score: 78 },
    { sdg: 'Industry Innovation', score: 92 },
    { sdg: 'Reduced Inequalities', score: 75 },
    { sdg: 'Partnerships', score: 88 },
  ];

  const departmentPerformance = [
    { department: 'CSE', success: 95, retention: 88, satisfaction: 92 },
    { department: 'ECS', success: 88, retention: 85, satisfaction: 87 },
    { department: 'ME', success: 92, retention: 90, satisfaction: 89 },
    { department: 'CE', success: 85, retention: 82, satisfaction: 86 },
  ];

  const poAchievement = [
    { name: 'PO1', value: 85 },
    { name: 'PO2', value: 92 },
    { name: 'PO3', value: 78 },
    { name: 'PO4', value: 88 },
  ];

  // New PEO data - simplified for pie chart
  const peoAchievement = [
    { name: 'PEO1', value: 94, description: 'Professional Excellence' },
    { name: 'PEO2', value: 88, description: 'Technical Leadership' },
    { name: 'PEO3', value: 92, description: 'Ethical Practice' },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#d946ef', '#f43f5e'];
  const PEO_COLORS = ['#3b82f6', '#22c55e', '#eab308'];

  const keyMetrics = [
    {
      title: 'Overall Success Rate',
      value: '92%',
      change: '+5%',
      icon: RiBarChartLine,
    },
    {
      title: 'SDG Alignment',
      value: '88%',
      change: '+3%',
      icon: RiGlobalLine,
    },
    {
      title: 'Industry Partners',
      value: '95',
      change: '+12',
      icon: RiBuilding2Line,
    },
    {
      title: 'PO Achievement',
      value: '90%',
      change: '+4%',
      icon: RiAwardLine,
    },
    {
      title: 'PEO Attainment',
      value: '93%',
      change: '+6%',
      icon: RiBookOpenLine,
    },
  ];

  return (
    // Added pb-20 to create space for footer
    <div className="space-y-6 mx-4 md:mx-6 lg:mx-8 pb-20">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
      >
        <h1 className="text-2xl font-bold text-white mb-2 break-words">Management Overview</h1>
        <p className="text-gray-400 break-words">High-level overview of internship program performance and impact</p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-[#0f172a] rounded-xl p-4 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-500/10 rounded-lg flex-shrink-0">
                <metric.icon className="text-xl text-indigo-400" />
              </div>
              <div className="min-w-0">
                <p className="text-gray-400 text-sm truncate">{metric.title}</p>
                <div className="flex items-center space-x-2">
                  <h3 className="text-xl font-bold text-white">{metric.value}</h3>
                  <span className="text-xs text-emerald-400">{metric.change}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yearly Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h2 className="text-xl font-semibold text-white mb-4 break-words">Yearly Trends</h2>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={yearlyTrends} 
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stackId="1"
                  stroke="#6366f1" 
                  fill="#6366f1" 
                  fillOpacity={0.6} 
                />
                <Area 
                  type="monotone" 
                  dataKey="placements" 
                  stackId="2"
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.6} 
                />
                <Area 
                  type="monotone" 
                  dataKey="companies" 
                  stackId="3"
                  stroke="#d946ef" 
                  fill="#d946ef" 
                  fillOpacity={0.6} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* SDG Impact Analysis - Changed to a simpler Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h2 className="text-xl font-semibold text-white mb-4 break-words">SDG Impact Analysis</h2>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={sdgImpact} 
                layout="vertical"
                margin={{ top: 5, right: 10, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 12 }} domain={[0, 100]} />
                <YAxis type="category" dataKey="sdg" stroke="#94a3b8" tick={{ fontSize: 12 }} width={100} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar 
                  dataKey="score" 
                  fill="#6366f1" 
                  radius={[0, 4, 4, 0]} 
                  barSize={20}
                  label={{ 
                    position: 'right', 
                    fill: 'white',
                    fontSize: 12
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Department Performance and PO Achievement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h2 className="text-xl font-semibold text-white mb-4 break-words">Department Performance</h2>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={departmentPerformance} 
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="department" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Legend />
                <Bar dataKey="success" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="satisfaction" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* PO Achievement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h2 className="text-xl font-semibold text-white mb-4 break-words">Program Outcomes Achievement</h2>
          <div className="h-64 md:h-80">
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={poAchievement}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {poAchievement.map((entry, index) => (
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
            <div className="mt-1 grid grid-cols-2 gap-2">
              {poAchievement.map((po, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-gray-400 truncate">
                    {po.name}: {po.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* New PEO Achievement Section with Pie Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
      >
        <h2 className="text-xl font-semibold text-white mb-4 break-words">Program Educational Objectives Achievement</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="space-y-4">
              {peoAchievement.map((peo, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: PEO_COLORS[index] }}
                    />
                    <span className="text-sm font-medium text-white">{peo.name}</span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{peo.description}</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-slate-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${peo.value}%`,
                          backgroundColor: PEO_COLORS[index]
                        }}
                      />
                    </div>
                    <span className="ml-2 text-xs font-medium text-white">
                      {peo.value}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="h-64 md:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={peoAchievement}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {peoAchievement.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PEO_COLORS[index % PEO_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name, props) => {
                      const item = peoAchievement.find(item => item.name === name);
                      return [`${value}%`, `${name}: ${item.description}`];
                    }}
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
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Statistics;