import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiBriefcase, FiBook, FiAlertCircle } from 'react-icons/fi';
import DashboardLayout from '../../components/DashboardLayout';

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Technical Interview',
      type: 'internship',
      company: 'WebSolutions Ltd.',
      date: '2024-05-02',
      time: '10:00 AM',
      location: 'Online (Zoom)',
      link: 'https://zoom.us/j/123456789',
      description: 'Technical interview for Full Stack Developer Intern position',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Data Structures & Algorithms',
      type: 'exam',
      course: 'CS301',
      date: '2024-05-05',
      time: '2:00 PM',
      location: 'Room 401, Computer Science Building',
      description: 'Final exam covering sorting algorithms, trees, and graph algorithms',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Web Development Workshop',
      type: 'event',
      organizer: 'Computer Science Department',
      date: '2024-04-20',
      time: '3:00 PM',
      location: 'Auditorium B',
      description: 'Hands-on workshop on modern web development frameworks',
      status: 'missed'
    },
    {
      id: 4,
      title: 'Mobile App Development Bootcamp',
      type: 'event',
      organizer: 'Tech Innovators Club',
      date: '2024-05-10',
      time: '9:00 AM - 5:00 PM',
      location: 'Innovation Lab',
      description: 'Full-day bootcamp on Flutter development',
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Database Systems',
      type: 'exam',
      course: 'CS405',
      date: '2024-04-15',
      time: '10:00 AM',
      location: 'Room 302, Computer Science Building',
      description: 'Midterm exam covering relational databases and SQL',
      status: 'missed'
    }
  ]);

  // Filter state
  const [filter, setFilter] = useState('all');

  // Get current date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Update status based on date
    const updatedEvents = events.map(event => {
      if (event.date < today && event.status === 'upcoming') {
        return { ...event, status: 'missed' };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    
    // In a real app, this would fetch events from an API
    // fetchEvents(userId);
  }, []);

  // Filter events
  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => {
        if (filter === 'upcoming') return event.status === 'upcoming';
        if (filter === 'missed') return event.status === 'missed';
        return event.type === filter;
      });

  // Sort events by date
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  // Group events by date
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const date = event.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {});

  // Get event icon based on type
  const getEventIcon = (type) => {
    switch (type) {
      case 'internship':
        return <FiBriefcase className="text-indigo-400" />;
      case 'exam':
        return <FiBook className="text-red-400" />;
      case 'event':
        return <FiCalendar className="text-green-400" />;
      default:
        return <FiCalendar className="text-gray-400" />;
    }
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20"
        >
          <h1 className="text-2xl font-bold text-white mb-4">Calendar</h1>
          <p className="text-gray-400 mb-6">Manage your exams, internship events, and deadlines</p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('upcoming')}
              className={`px-4 py-2 rounded-lg transition ${filter === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Upcoming
            </button>
            <button 
              onClick={() => setFilter('missed')}
              className={`px-4 py-2 rounded-lg transition ${filter === 'missed' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              Missed
            </button>
            <button 
              onClick={() => setFilter('internship')}
              className={`px-4 py-2 rounded-lg transition ${filter === 'internship' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <FiBriefcase className="inline mr-1" /> Internships
            </button>
            <button 
              onClick={() => setFilter('exam')}
              className={`px-4 py-2 rounded-lg transition ${filter === 'exam' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <FiBook className="inline mr-1" /> Exams
            </button>
            <button 
              onClick={() => setFilter('event')}
              className={`px-4 py-2 rounded-lg transition ${filter === 'event' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              <FiCalendar className="inline mr-1" /> Events
            </button>
          </div>
          
          {/* Calendar Events */}
          <div className="space-y-6">
            {Object.keys(groupedEvents).length > 0 ? (
              Object.keys(groupedEvents).sort().map(date => (
                <div key={date} className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-1">
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  
                  {groupedEvents[date].map(event => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className={`bg-gray-800 rounded-lg p-4 border ${
                        event.status === 'missed' ? 'border-red-500/30' : 'border-gray-700 hover:border-indigo-500/50'
                      } transition`}
                    >
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center mr-4">
                          {getEventIcon(event.type)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <h4 className="text-lg font-medium text-white">{event.title}</h4>
                            {event.status === 'missed' && (
                              <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm">
                                <FiAlertCircle className="mr-1" /> Missed
                              </span>
                            )}
                          </div>
                          
                          <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div className="flex items-center text-gray-400">
                              <FiClock className="mr-1" /> {event.time}
                            </div>
                            <div className="flex items-center text-gray-400">
                              <FiMapPin className="mr-1" /> {event.location}
                            </div>
                            
                            {event.type === 'internship' && event.company && (
                              <div className="text-gray-400">
                                <FiBriefcase className="inline mr-1" /> {event.company}
                              </div>
                            )}
                            
                            {event.type === 'exam' && event.course && (
                              <div className="text-gray-400">
                                <FiBook className="inline mr-1" /> Course: {event.course}
                              </div>
                            )}
                            
                            {event.type === 'event' && event.organizer && (
                              <div className="text-gray-400">
                                <FiCalendar className="inline mr-1" /> By: {event.organizer}
                              </div>
                            )}
                          </div>
                          
                          {event.description && (
                            <div className="mt-2 text-gray-400 text-sm">
                              {event.description}
                            </div>
                          )}
                          
                          {event.link && (
                            <div className="mt-2">
                              <a 
                                href={event.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:text-indigo-300 text-sm"
                              >
                                Join Meeting Link
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                No events found with the selected filter.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Calendar;