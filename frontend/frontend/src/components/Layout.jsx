import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const isDashboardPage = location.pathname.includes('-dashboard');

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#0a0e1a] shadow-lg z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Name */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={theme.animations.default}
              >
                <img src="/logo.jpg" alt="Internify Logo" className="h-12 w-12 rounded-lg" />
              </motion.div>
              <span className="text-2xl font-bold text-indigo-400">Internify</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              <Link to="/" className="hover:text-indigo-400 transition-colors">
                Home
              </Link>
              <Link to="/about" className="hover:text-indigo-400 transition-colors">
                About
              </Link>
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-500 px-6 py-2 rounded-lg transition-colors"
              >
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className={`flex-grow ${isDashboardPage ? 'pt-24' : 'pt-24'}`}>
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout; 