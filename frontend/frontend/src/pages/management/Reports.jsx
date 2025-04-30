import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  RiFileChartLine,
  RiDownload2Line,
  RiFilter2Line,
  RiCalendarLine,
} from 'react-icons/ri';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('internship');
  const [dateRange, setDateRange] = useState('last30');

  const reportTypes = [
    {
      id: 'internship',
      name: 'Internship Performance',
      description: 'Detailed analysis of internship program success metrics',
    },
    {
      id: 'sdg',
      name: 'SDG Alignment',
      description: 'Report on SDG contribution and impact metrics',
    },
    {
      id: 'department',
      name: 'Department Analytics',
      description: 'Department-wise performance and statistics',
    },
    {
      id: 'industry',
      name: 'Industry Collaboration',
      description: 'Analysis of industry partnerships and feedback',
    },
  ];

  const dateRanges = [
    { id: 'last30', name: 'Last 30 Days' },
    { id: 'last90', name: 'Last 90 Days' },
    { id: 'lastYear', name: 'Last Year' },
    { id: 'custom', name: 'Custom Range' },
  ];

  return (
    <div className="p-6 space-y-6 ml-64">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold text-white mb-2">Report Generation</h1>
        <p className="text-gray-400">Generate detailed reports and analytics</p>
      </motion.div>

      {/* Report Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Report Type Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20 col-span-2"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <RiFileChartLine className="mr-2" />
            Select Report Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedReport(type.id)}
                className={`p-4 rounded-lg border transition-all ${
                  selectedReport === type.id
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-gray-700 hover:border-indigo-500/50'
                }`}
              >
                <h3 className="text-lg font-semibold text-white mb-2">{type.name}</h3>
                <p className="text-gray-400 text-sm">{type.description}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Date Range Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <RiCalendarLine className="mr-2" />
            Date Range
          </h2>
          <div className="space-y-3">
            {dateRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setDateRange(range.id)}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  dateRange === range.id
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : 'border-gray-700 hover:border-indigo-500/50'
                }`}
              >
                {range.name}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Report Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Report Preview</h2>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-all">
              <RiFilter2Line className="mr-2" />
              Filters
            </button>
            <button className="flex items-center px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 transition-all">
              <RiDownload2Line className="mr-2" />
              Download Report
            </button>
          </div>
        </div>

        {/* Sample Report Content */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Total Records</h3>
              <p className="text-3xl font-bold text-indigo-400">1,234</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Date Range</h3>
              <p className="text-gray-400">01 Jan 2024 - 31 Jan 2024</p>
            </div>
            <div className="p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-2">Report Status</h3>
              <p className="text-emerald-400">Ready to generate</p>
            </div>
          </div>

          {/* Report Table Preview */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left p-4 text-gray-400">ID</th>
                  <th className="text-left p-4 text-gray-400">Department</th>
                  <th className="text-left p-4 text-gray-400">Metric</th>
                  <th className="text-left p-4 text-gray-400">Value</th>
                  <th className="text-left p-4 text-gray-400">Change</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((row) => (
                  <tr key={row} className="border-b border-gray-700/50">
                    <td className="p-4 text-gray-300">#{row}001</td>
                    <td className="p-4 text-gray-300">Computer Science</td>
                    <td className="p-4 text-gray-300">Success Rate</td>
                    <td className="p-4 text-gray-300">92%</td>
                    <td className="p-4 text-emerald-400">+5%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;