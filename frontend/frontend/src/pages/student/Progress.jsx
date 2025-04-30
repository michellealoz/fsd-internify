import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import DashboardLayout from '../../components/DashboardLayout';

const Progress = () => {
  // Mock data - would come from API in real app
  const [progressData, setProgressData] = useState({
    weeklyProgress: [
      { name: 'Week 1', completed: 5, total: 5 },
      { name: 'Week 2', completed: 4, total: 5 },
      { name: 'Week 3', completed: 3, total: 5 },
      { name: 'Week 4', completed: 7, total: 8 },
      { name: 'Week 5', completed: 4, total: 7 },
      { name: 'Week 6', completed: 2, total: 5 },
    ],
    skills: [
      { name: 'Technical Skills', progress: 75 },
      { name: 'Communication', progress: 65 },
      { name: 'Problem Solving', progress: 80 },
      { name: 'Teamwork', progress: 85 },
      { name: 'Time Management', progress: 70 },
    ],
    feedbacks: [
      { 
        id: 1, 
        date: '2024-03-15', 
        from: 'Jane Smith, Mentor',
        content: 'John has shown excellent progress in developing the frontend components. His attention to detail is commendable.',
        rating: 4.5
      },
      { 
        id: 2, 
        date: '2024-03-02', 
        from: 'David Chen, Project Lead',
        content: 'Good job on the last sprint. Work on improving API integration skills.',
        rating: 4.0
      },
    ]
  });

  // Dummy function to fetch progress data from backend
  const fetchProgressData = async (userId) => {
    try {
      // In real app, this would be an API call
      console.log(`Fetching progress data for user ${userId}`);
      // const response = await fetch(`/api/progress/${userId}`);
      // const data = await response.json();
      // setProgressData(data);
    } catch (error) {
      console.error('Error fetching progress data:', error);
    }
  };

  useEffect(() => {
    // Simulate API call with userId (would be from auth context in real app)
    fetchProgressData('ST12345');
  }, []);

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h1 className="text-2xl font-bold text-white mb-4">My Progress</h1>
          <p className="text-gray-400 mb-6">Track your internship progress and performance</p>
          
          {/* Overall Progress */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
              <p className="text-gray-400 mb-2">Overall Completion</p>
              <div className="relative h-24 w-24">
                <svg className="h-24 w-24" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#334155" 
                    strokeWidth="10"
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#6366f1" 
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={(251.2 * (100 - 85)) / 100}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">85%</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
              <p className="text-gray-400 mb-2">Tasks Completed</p>
              <div className="text-center">
                <span className="text-2xl font-bold text-white">25</span>
                <span className="text-lg text-gray-400">/30</span>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
              <p className="text-gray-400 mb-2">Average Rating</p>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-white mr-2">4.3</span>
                <div className="flex text-yellow-500">
                  ★★★★<span className="text-gray-600">★</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center">
              <p className="text-gray-400 mb-2">Days Remaining</p>
              <span className="text-2xl font-bold text-white">45</span>
            </div>
          </div>
          
          {/* Weekly Progress Chart */}
          <div className="bg-gray-800/30 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Weekly Task Completion</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={progressData.weeklyProgress}>
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
                  <Legend />
                  <Bar name="Completed" dataKey="completed" fill="#6366f1" />
                  <Bar name="Total" dataKey="total" fill="#475569" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Skills Progress */}
          <div className="bg-gray-800/30 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">Skills Development</h2>
            <div className="space-y-4">
              {progressData.skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{skill.name}</span>
                    <span className="text-indigo-400">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ duration: 1, delay: 0.1 * index }}
                      className="bg-indigo-500 h-2 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Feedback History */}
          <div className="bg-gray-800/30 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Feedback</h2>
            {progressData.feedbacks.length > 0 ? (
              <div className="space-y-4">
                {progressData.feedbacks.map((feedback) => (
                  <div key={feedback.id} className="bg-gray-800/50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-white">{feedback.from}</p>
                        <p className="text-sm text-gray-400">{feedback.date}</p>
                      </div>
                      <div className="flex text-yellow-500">
                        {[...Array(Math.floor(feedback.rating))].map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                        {feedback.rating % 1 !== 0 && <span>½</span>}
                      </div>
                    </div>
                    <p className="text-gray-300">{feedback.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No feedback received yet.</p>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Progress;