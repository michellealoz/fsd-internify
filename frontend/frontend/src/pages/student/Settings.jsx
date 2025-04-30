import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiBell, FiLock, FiGlobe, FiInfo, FiSave, FiToggleLeft, FiToggleRight } from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';

const Settings = () => {
  // User profile settings
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@university.edu',
    phone: '(555) 123-4567',
    university: 'State University',
    program: 'Computer Science',
    year: '3rd Year',
    bio: 'Passionate computer science student with interests in web development, machine learning, and software engineering.'
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    applicationUpdates: true,
    internshipDeadlines: true,
    newOpportunities: true,
    marketingEmails: false
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showContactInfo: false,
    allowMessaging: true
  });

  // Theme settings
  const [theme, setTheme] = useState({
    darkMode: true,
    colorScheme: 'indigo'
  });

  // Handle profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle notification toggle
  const handleNotificationToggle = (setting) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle privacy change
  const handlePrivacyChange = (setting, value) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: typeof value === 'boolean' ? value : value
    }));
  };

  // Handle theme change
  const handleThemeChange = (setting, value) => {
    setTheme(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Save settings (would connect to API in real application)
  const saveSettings = (section) => {
    console.log(`Saving ${section} settings:`, { 
      profile, notifications, privacy, theme 
    });
    
    // Simulate successful save
    alert(`${section} settings saved successfully!`);
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h1 className="text-2xl font-bold text-white mb-4">Settings</h1>
          <p className="text-gray-400 mb-6">Manage your account preferences and configurations</p>
          
          <div className="space-y-8">
            {/* Profile Settings */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <FiUser className="text-indigo-400 mr-2" size={20} />
                <h2 className="text-xl font-semibold text-white">Profile Settings</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">University</label>
                  <input 
                    type="text" 
                    name="university"
                    value={profile.university}
                    onChange={handleProfileChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Program</label>
                  <input 
                    type="text" 
                    name="program"
                    value={profile.program}
                    onChange={handleProfileChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-2">Bio</label>
                  <textarea 
                    name="bio"
                    value={profile.bio}
                    onChange={handleProfileChange}
                    rows={4}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  ></textarea>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => saveSettings('Profile')}
                  className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FiSave className="mr-2" /> Save Profile
                </button>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <FiBell className="text-indigo-400 mr-2" size={20} />
                <h2 className="text-xl font-semibold text-white">Notification Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white">Email Alerts</h3>
                    <p className="text-gray-400 text-sm">Receive important alerts via email</p>
                  </div>
                  <button 
                    onClick={() => handleNotificationToggle('emailAlerts')}
                    className="text-2xl"
                  >
                    {notifications.emailAlerts ? 
                      <FiToggleRight className="text-indigo-400" /> : 
                      <FiToggleLeft className="text-gray-500" />
                    }
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white">Application Updates</h3>
                    <p className="text-gray-400 text-sm">Notifications about your application status</p>
                  </div>
                  <button 
                    onClick={() => handleNotificationToggle('applicationUpdates')}
                    className="text-2xl"
                  >
                    {notifications.applicationUpdates ? 
                      <FiToggleRight className="text-indigo-400" /> : 
                      <FiToggleLeft className="text-gray-500" />
                    }
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white">Internship Deadlines</h3>
                    <p className="text-gray-400 text-sm">Reminders about upcoming deadlines</p>
                  </div>
                  <button 
                    onClick={() => handleNotificationToggle('internshipDeadlines')}
                    className="text-2xl"
                  >
                    {notifications.internshipDeadlines ? 
                      <FiToggleRight className="text-indigo-400" /> : 
                      <FiToggleLeft className="text-gray-500" />
                    }
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white">New Opportunities</h3>
                    <p className="text-gray-400 text-sm">Alerts about new internship opportunities</p>
                  </div>
                  <button 
                    onClick={() => handleNotificationToggle('newOpportunities')}
                    className="text-2xl"
                  >
                    {notifications.newOpportunities ? 
                      <FiToggleRight className="text-indigo-400" /> : 
                      <FiToggleLeft className="text-gray-500" />
                    }
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white">Marketing Emails</h3>
                    <p className="text-gray-400 text-sm">Promotional content and newsletters</p>
                  </div>
                  <button 
                    onClick={() => handleNotificationToggle('marketingEmails')}
                    className="text-2xl"
                  >
                    {notifications.marketingEmails ? 
                      <FiToggleRight className="text-indigo-400" /> : 
                      <FiToggleLeft className="text-gray-500" />
                    }
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => saveSettings('Notification')}
                  className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FiSave className="mr-2" /> Save Preferences
                </button>
              </div>
            </div>
            
            {/* Privacy Settings */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <FiLock className="text-indigo-400 mr-2" size={20} />
                <h2 className="text-xl font-semibold text-white">Privacy Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white mb-2">Profile Visibility</label>
                  <select 
                    value={privacy.profileVisibility}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="public">Public - Visible to everyone</option>
                    <option value="students">Students Only - Visible to other students</option>
                    <option value="connections">Connections Only - Visible to your connections</option>
                    <option value="private">Private - Only visible to you</option>
                  </select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white">Show Contact Information</h3>
                    <p className="text-gray-400 text-sm">Display your email and phone number on your profile</p>
                  </div>
                  <button 
                    onClick={() => handlePrivacyChange('showContactInfo', !privacy.showContactInfo)}
                    className="text-2xl"
                  >
                    {privacy.showContactInfo ? 
                      <FiToggleRight className="text-indigo-400" /> : 
                      <FiToggleLeft className="text-gray-500" />
                    }
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white">Allow Messaging</h3>
                    <p className="text-gray-400 text-sm">Let others send you direct messages</p>
                  </div>
                  <button 
                    onClick={() => handlePrivacyChange('allowMessaging', !privacy.allowMessaging)}
                    className="text-2xl"
                  >
                    {privacy.allowMessaging ? 
                      <FiToggleRight className="text-indigo-400" /> : 
                      <FiToggleLeft className="text-gray-500" />
                    }
                  </button>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => saveSettings('Privacy')}
                  className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FiSave className="mr-2" /> Save Privacy Settings
                </button>
              </div>
            </div>
            
            {/* Account Settings */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center mb-4">
                <FiInfo className="text-indigo-400 mr-2" size={20} />
                <h2 className="text-xl font-semibold text-white">Account Settings</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <button className="w-full bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg px-4 py-2 hover:bg-red-500/30 transition">
                    Reset Password
                  </button>
                </div>
                
                <div>
                  <button className="w-full bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg px-4 py-2 hover:bg-red-500/30 transition">
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;