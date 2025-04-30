import { motion } from 'framer-motion';
import { useState } from 'react';
import { RiNotificationLine, RiLockLine, RiGlobalLine, RiPaletteLine } from 'react-icons/ri';
import DashboardLayout from '../../components/DashboardLayout';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    darkMode: true,
    language: 'English',
    timezone: 'UTC+5:30'
  });

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

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
          <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Configure your admin dashboard preferences</p>
        </motion.div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <RiNotificationLine className="text-2xl text-indigo-400" />
              <h2 className="text-xl font-semibold text-white">Notifications</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Email Notifications</span>
                <button
                  onClick={() => handleToggle('emailNotifications')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.emailNotifications ? 'bg-indigo-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                    settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">SMS Notifications</span>
                <button
                  onClick={() => handleToggle('smsNotifications')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.smsNotifications ? 'bg-indigo-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                    settings.smsNotifications ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <RiLockLine className="text-2xl text-indigo-400" />
              <h2 className="text-xl font-semibold text-white">Security</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Two-Factor Authentication</span>
                <button
                  onClick={() => handleToggle('twoFactorAuth')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.twoFactorAuth ? 'bg-indigo-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                    settings.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
              <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
                Change Password
              </button>
            </div>
          </motion.div>

          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <RiPaletteLine className="text-2xl text-indigo-400" />
              <h2 className="text-xl font-semibold text-white">Appearance</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Dark Mode</span>
                <button
                  onClick={() => handleToggle('darkMode')}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    settings.darkMode ? 'bg-indigo-500' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform transform ${
                    settings.darkMode ? 'translate-x-7' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Regional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
          >
            <div className="flex items-center space-x-3 mb-6">
              <RiGlobalLine className="text-2xl text-indigo-400" />
              <h2 className="text-xl font-semibold text-white">Regional</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2">Language</label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="w-full bg-[#1e293b] text-white rounded-lg p-2 border border-indigo-500/20"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full bg-[#1e293b] text-white rounded-lg p-2 border border-indigo-500/20"
                >
                  <option value="UTC+5:30">UTC+5:30</option>
                  <option value="UTC+0">UTC+0</option>
                  <option value="UTC-5">UTC-5</option>
                </select>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex justify-end"
        >
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-lg transition-colors">
            Save Changes
          </button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings; 