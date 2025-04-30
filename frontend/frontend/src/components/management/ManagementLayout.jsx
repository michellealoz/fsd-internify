import { Outlet } from 'react-router-dom';
import ManagementSidebar from './ManagementSidebar';

const ManagementLayout = () => {
  return (
    <div className="bg-[#0a0e1a] min-h-screen">
      <ManagementSidebar />
      <div className="ml-64">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagementLayout;