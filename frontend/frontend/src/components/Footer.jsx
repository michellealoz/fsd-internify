import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#0a0e1a] text-white py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-indigo-400 font-semibold mb-2 text-sm">Quick Links</h3>
            <ul className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-indigo-400 text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-indigo-400 text-sm transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-indigo-400 font-semibold mb-2 text-sm">Contact</h3>
            <div className="flex flex-col space-y-1">
              <a href="mailto:contact@internify.com" className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors">
                <FaEnvelope className="h-3 w-3 mr-2" />
                <span className="text-xs">contact@internify.com</span>
              </a>
              <a href="tel:+1234567890" className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors">
                <FaPhone className="h-3 w-3 mr-2" />
                <span className="text-xs">+1 (234) 567-890</span>
              </a>
            </div>
          </div>

          {/* Subscribe */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-indigo-400 font-semibold mb-2 text-sm">Subscribe</h3>
            <div className="flex w-full max-w-[250px]">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-1.5 text-xs bg-[#0f172a] text-white border border-gray-700 rounded-l-lg focus:outline-none focus:border-indigo-400"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs rounded-r-lg transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-indigo-400 font-semibold mb-2 text-sm">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-indigo-400 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 