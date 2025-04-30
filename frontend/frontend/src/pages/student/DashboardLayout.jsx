// SidebarLayout.jsx
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiUser, 
  FiSettings, 
  FiBriefcase, 
  FiFileText, 
  FiTrendingUp, 
  FiBook, 
  FiAward, 
  FiMessageSquare, 
  FiCalendar, 
  FiLogOut 
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children, userRole }) => {
  const { logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    // Redirect to login page
    window.location.href = '/login';
  };

  const navItems = [
    { 
      name: 'Dashboard', 
      path: `/${userRole}-dashboard`, 
      icon: <FiHome className="text-xl" /> 
    },
    { 
      name: 'Profile', 
      path: `/${userRole}-profile`, 
      icon: <FiUser className="text-xl" /> 
    },
    { 
      name: 'Settings', 
      path: `/${userRole}-settings`, 
      icon: <FiSettings className="text-xl" /> 
    },
    { 
      name: 'Available Internships', 
      path: `/AvailableInternships.jsx`, 
      icon: <FiBriefcase className="text-xl" /> 
    },
    { 
      name: 'My Applications', 
      path: `/${userRole}-applications`, 
      icon: <FiFileText className="text-xl" /> 
    },
    { 
      name: 'Progress', 
      path: `/${userRole}-progress`, 
      icon: <FiTrendingUp className="text-xl" /> 
    },
    // { 
    //   name: 'Learning Resources', 
    //   path: `/${userRole}-resources`, 
    //   icon: <FiBook className="text-xl" /> 
    // },
    { 
      name: 'Certificates', 
      path: `/${userRole}-certificates`, 
      icon: <FiAward className="text-xl" /> 
    },
    // { 
    //   name: 'Messages', 
    //   path: `/${userRole}-messages`, 
    //   icon: <FiMessageSquare className="text-xl" /> 
    // },
    { 
      name: 'Calendar', 
      path: `/${userRole}-calendar`, 
      icon: <FiCalendar className="text-xl" /> 
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`${collapsed ? 'w-20' : 'w-64'} bg-[#0f172a] border-r border-gray-800 transition-all duration-300 ease-in-out`}>
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-white">Internify</h1>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-md text-gray-400 hover:bg-gray-800"
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>
        
        <nav className="mt-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `flex items-center p-4 ${isActive ? 'bg-indigo-900/30 border-l-4 border-indigo-500' : 'border-l-4 border-transparent'} hover:bg-gray-800 ${collapsed ? 'justify-center' : 'space-x-3'} transition-all duration-200`
                  }
                >
                  <span>{item.icon}</span>
                  {!collapsed && <span className="text-gray-300">{item.name}</span>}
                </NavLink>
              </li>
            ))}
            
            <li>
              <button
                onClick={handleLogout}
                className={`flex items-center w-full p-4 text-gray-400 hover:bg-gray-800 ${collapsed ? 'justify-center' : 'space-x-3'} transition-all duration-200`}
              >
                <FiLogOut className="text-xl" />
                {!collapsed && <span>Logout</span>}
              </button>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;