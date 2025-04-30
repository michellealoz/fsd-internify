import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = ({ userRole, children }) => {
  const { user } = useAuth();
  const role = userRole || user?.role;

  return (
    <div className="flex h-screen bg-[#0a0e1a]">
      <Sidebar userRole={role} />
      <main className="flex-1 ml-64 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

// const DashboardLayout = ({ userRole }) => {
//   const { user } = useAuth();
  
//   // Use the provided userRole or fall back to the user's role from context
//   const role = userRole || user?.role;

//   return (
//     <div className="flex h-screen bg-[#0a0e1a]">
//       <Sidebar userRole={role} />
//       <main className="flex-1 ml-64 p-6 overflow-y-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

export default DashboardLayout; 