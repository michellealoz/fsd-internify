import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });

  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(`/${formData.role}-dashboard`);
    }
  }, [user, navigate, formData.role]);

  // If user is already logged in, don't render the login form
  if (user) {
    return null;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Hardcoded user for testing
    const mockUser = {
      email: 'test@example.com',
      password: '123456',
      token: 'fake-jwt-token',
      role: formData.role,
      name: 'Test User'
    };
  
    // Simulate backend logic
    if (
      formData.email === mockUser.email &&
      formData.password === mockUser.password
    ) {
      // Fake login context (assuming login() stores the token/user in context)
      login({
        token: mockUser.token,
        user: { name: mockUser.name, email: mockUser.email }
      });
  
      navigate(`/${formData.role}-dashboard`);
    } else {
      alert('Invalid credentials. Try email: test@example.com / password: 123456');
    }
  };
  

    //   const data = await res.json();
    //   if (res.ok) {
    //     login(data); // context login
    //     navigate(`/${formData.role}-dashboard`);
    //   } else {
    //     alert(data.message || 'Login failed');
    //   }
    // } catch (err) {
    //   console.error('Login error:', err);
    //   alert('Something went wrong. Try again later.');
    // }
  // };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="text-gray-400">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                // autoComplete='off'
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="mentor">Mentor</option>
                <option value="management">Management</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 px-4 bg-blue-900 hover:bg-opacity-90 text-white font-medium rounded-lg transition-colors"
            >
              Sign In
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
