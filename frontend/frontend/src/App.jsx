import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Home from './pages/Home';
import About from './pages/About';
import StudentDashboard from './pages/student/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import MentorDashboard from './pages/mentor/Dashboard';
import ManagementDashboard from './pages/management/Dashboard';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import StudentProfile from './pages/student/StudentProfile';
import MyApplications from './pages/student/MyApplications';
import AvailableInternships from './pages/student/AvailableInternships';
// import Progress from './pages/student/Progress';
import Internships from './components/internships/internships';
import Progress from './pages/student/Progress';
import Settings from './pages/student/Settings';
import Calendar from './pages/student/Calender';
import Certificates from './pages/student/Certificates';
// import Application from './pages/admin/Application';
import ADInternships from './pages/admin/InternshipsAD';
import AdminApplications from './pages/admin/Application';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              {/* <Route path="/student-dashboard" element={<Dashboard />} /> */}
              <Route path="/student-profile" element={<StudentProfile />} />
              <Route path="/student-applications" element={<MyApplications />} />
              <Route path="/student-internships" element={<AvailableInternships/>} />
              <Route path="/student-calendar" element={<Calendar />} />
              <Route path="/student-certificates" element={<Certificates />} />
              <Route path="/student-progress" element={<Progress />} />
              <Route path="/student-settings" element={<Settings />} />
              <Route path="/student-profile" element={<StudentProfile />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              {/* <Route path="/admin-application" element={<Application />} /> */}
              {/* <Route path="/manage-internships" element={<ADInternships />} /> */}
              <Route path="/mentor-dashboard" element={<MentorDashboard />} />
              <Route path="/management-dashboard" element={<ManagementDashboard />} />
              <Route path="/internships" element={<Internships />} />
              <Route path="/admin/admin-application" element={<AdminApplications />} />
              <Route path="/admin/manage-internships" element={<ADInternships />} />
              {/* <Route path="/" element={<Navigate to="/login" />} /> */}

            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;