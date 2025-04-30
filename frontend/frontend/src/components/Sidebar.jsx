import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  RiDashboardLine,
  RiUserLine,
  RiTeamLine,
  RiFileList3Line,
  RiSettingsLine,
  RiLogoutBoxLine,
  RiCalendarLine,
  RiBarChartLine,
  RiBuildingLine,
  RiGlobalLine,
  RiBriefcaseLine,
  RiBookLine,
  RiAwardLine,
  RiMessageLine,
} from 'react-icons/ri';
import Progress from '../pages/student/Progress';

const Sidebar = ({ userRole }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Use the provided userRole or fall back to the user's role from context
  const role = userRole || user?.role;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // const commonLinks = [
  //     { path: '', label: '', icon: RiDashboardLine },
  //     { path: '', label: '', icon: RiUserLine },
  //     { path: '', label: '', icon: RiSettingsLine },
  //   ];

  // const commonLinks = [
  //   { path: '/student-dashboard', label: 'Dashboard', icon: RiDashboardLine },
  //   { path: '/student-profile', label: 'Profile', icon: RiUserLine },
  //   { path: '/student-settings', label: 'Settings', icon: RiSettingsLine },
  // ];

  const roleSpecificLinks = {
    student: [
      { path: '/student-dashboard', label: 'Dashboard', icon: RiDashboardLine },
        { path: '/student-profile', label: 'Profile', icon: RiUserLine },
        { path: '/student-settings', label: 'Settings', icon: RiSettingsLine },
      { path: '/student-internships', label: 'Available Internships', icon: RiBriefcaseLine },
      { path: '/student-applications', label: 'My Applications', icon: RiFileList3Line },
      { path: '/student-progress', label: 'Progress', icon: RiBarChartLine },
      // { path: '/resources', label: 'Learning Resources', icon: RiBookLine },
      { path: '/student-certificates', label: 'Certificates', icon: RiAwardLine },
      // { path: '/messages', label: 'Messages', icon: RiMessageLine },
      { path: '/student-calendar', label: 'Calendar', icon: RiCalendarLine },
     
    ],
    mentor: [
      { path: '/mentor-dashboard', label: 'Dashboard', icon: RiDashboardLine },
        { path: '/mentor-profile', label: 'Profile', icon: RiUserLine },
        { path: '/mentor-settings', label: 'Settings', icon: RiSettingsLine },
      { path: '/posts', label: 'Internship Posts', icon: RiBriefcaseLine },
      { path: '/manage-applications', label: 'Applications', icon: RiFileList3Line },
      { path: '/interns', label: 'Interns', icon: RiTeamLine },
      { path: '/tasks', label: 'Tasks', icon: RiFileList3Line },
      { path: '/reports', label: 'Reports', icon: RiBarChartLine },
      { path: '/calendar', label: 'Calendar', icon: RiCalendarLine },
      { path: '/sdg-impact', label: 'SDG Impact', icon: RiGlobalLine },
    ],
    admin: [
      { path: '/admin-dashboard', label: 'Dashboard', icon: RiDashboardLine },
      { path: '/admin-profile', label: 'Profile', icon: RiUserLine },
      { path: '/admin-settings', label: 'Settings', icon: RiSettingsLine },
      { path: '/admin/admin-application', label: 'Applications', icon: RiFileList3Line },
      { path: '/admin/manage-internships', label: 'Internships', icon: RiBriefcaseLine },
      { path: '/users', label: 'Users', icon: RiUserLine },
      { path: '/mentors', label: 'Mentors', icon: RiTeamLine },
      { path: '/reports', label: 'Reports', icon: RiFileList3Line },
      // { path: '/sdg-overview', label: 'SDG Overview', icon: RiGlobalLine },
      { path: '/management-dashboard', label: 'Statistics', icon: RiBarChartLine },
    ],
    management: [
      { path: '/analytics', label: 'Analytics', icon: RiBarChartLine },
      { path: '/departments', label: 'Departments', icon: RiBuildingLine },
      { path: '/reports', label: 'Reports', icon: RiFileList3Line },
      { path: '/sdg-overview', label: 'SDG Overview', icon: RiGlobalLine },
    ],
  };

  const allLinks = [...(roleSpecificLinks[role] || [])];

  return (
    <div className="w-64 bg-[#0f172a] border-r border-indigo-500/20 h-screen fixed left-0 top-0 overflow-y-auto">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-8">Internify</h1>
        <nav className="space-y-2">
          {allLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-400'
                    : 'text-gray-400 hover:bg-indigo-500/5 hover:text-indigo-400'
                }`
              }
            >
              <link.icon className="text-xl" />
              <span>{link.label}</span>
            </NavLink>
          ))}
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-indigo-500/5 hover:text-indigo-400 w-full"
          >
            <RiLogoutBoxLine className="text-xl" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;