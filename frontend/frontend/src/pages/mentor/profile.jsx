import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { RiUploadLine, RiSaveLine } from 'react-icons/ri';
import DashboardLayout from '../../components/DashboardLayout';

const Profile = () => {
  const { user } = useAuth();
  const [resume, setResume] = useState(null);
  const [details, setDetails] = useState({
    expertise: '',
    experience: '',
    bio: '',
  });

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <DashboardLayout userRole="mentor">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Mentor Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Upload Resume</label>
            <input 
              type="file" 
              onChange={handleFileChange}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          <div>
            <label className="block mb-2">Expertise</label>
            <input
              type="text"
              name="expertise"
              value={details.expertise}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Experience (years)</label>
            <input
              type="number"
              name="experience"
              value={details.experience}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Bio</label>
            <textarea
              name="bio"
              value={details.bio}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            <RiSaveLine />
            <span>Save Profile</span>
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;