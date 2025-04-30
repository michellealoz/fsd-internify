import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RiCheckLine, RiCloseLine } from 'react-icons/ri';
import DashboardLayout from '../../components/DashboardLayout';

const ManageInterns = () => {
  const { user } = useAuth();
  const [interns, setInterns] = useState([]);

  // Fetch interns assigned to this mentor
  useEffect(() => {
    // API call to fetch interns
    const fetchInterns = async () => {
      try {
        // const response = await fetch(`/api/mentors/${user.id}/interns`);
        // const data = await response.json();
        // setInterns(data);
        
        // Mock data
        setInterns([
          { id: 1, name: 'John Doe', status: 'pending', application: 'Frontend Developer' },
          { id: 2, name: 'Jane Smith', status: 'approved', application: 'Data Analyst' },
        ]);
      } catch (error) {
        console.error('Error fetching interns:', error);
      }
    };
    
    fetchInterns();
  }, [user]);

  const handleApprove = (internId) => {
    // API call to approve intern
    setInterns(interns.map(intern => 
      intern.id === internId ? { ...intern, status: 'approved' } : intern
    ));
  };

  const handleReject = (internId) => {
    // API call to reject intern
    setInterns(interns.map(intern => 
      intern.id === internId ? { ...intern, status: 'rejected' } : intern
    ));
  };

  return (
    <DashboardLayout userRole="mentor">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Manage Interns</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {interns.map((intern) => (
                <tr key={intern.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{intern.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{intern.application}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      intern.status === 'approved' 
                        ? 'bg-green-100 text-green-800' 
                        : intern.status === 'rejected' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {intern.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {intern.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleApprove(intern.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <RiCheckLine className="text-xl" />
                        </button>
                        <button 
                          onClick={() => handleReject(intern.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <RiCloseLine className="text-xl" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManageInterns;