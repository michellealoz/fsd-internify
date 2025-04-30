import React, { useState } from 'react';
import { ArrowLeft, Download, Search, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock database for applications
const mockApplications = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    branch: "Computer Science",
    year: "3rd Year",
    cgpa: 8.7,
    resumeUrl: "#",
    coverLetter: "I'm extremely interested in this role as it aligns with my skills in web development...",
    status: "pending",
    appliedDate: "2025-04-15"
  },
  {
    id: 2,
    studentName: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    branch: "Information Technology",
    year: "4th Year",
    cgpa: 9.2,
    resumeUrl: "#",
    coverLetter: "With extensive experience in React and Node.js from my previous projects...",
    status: "accepted",
    appliedDate: "2025-04-12"
  },
  {
    id: 3,
    studentName: "Aditya Kumar",
    email: "aditya.kumar@example.com",
    phone: "+91 76543 21098",
    branch: "Computer Science",
    year: "3rd Year",
    cgpa: 7.9,
    resumeUrl: "#",
    coverLetter: "I've been working with JavaScript frameworks for the past two years...",
    status: "rejected",
    appliedDate: "2025-04-18"
  },
  {
    id: 4,
    studentName: "Shreya Desai",
    email: "shreya.desai@example.com",
    phone: "+91 65432 10987",
    branch: "Electronics",
    year: "4th Year",
    cgpa: 8.4,
    resumeUrl: "#",
    coverLetter: "Having completed courses in web development and contributed to open source...",
    status: "pending",
    appliedDate: "2025-04-20"
  }
];

// Internship data
const internshipData = {
  id: 1,
  title: "Web Development Intern",
  companyName: "TechSolutions Inc.",
  location: "Remote",
  applications: 4
};

export default function Application() {
  const [applications, setApplications] = useState(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
  
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.branch.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return matchesSearch && app.status === filter;
  });
  
  const updateStatus = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? {...app, status: newStatus} : app
    ));
  };
  
  const getStatusBadge = (status) => {
    switch(status) {
      case "accepted":
        return <span className="flex items-center text-green-400 bg-green-900 px-2 py-1 rounded-full text-xs"><CheckCircle size={12} className="mr-1" /> Accepted</span>;
      case "rejected":
        return <span className="flex items-center text-red-400 bg-red-900 px-2 py-1 rounded-full text-xs"><XCircle size={12} className="mr-1" /> Rejected</span>;
      default:
        return <span className="flex items-center text-yellow-400 bg-yellow-900 px-2 py-1 rounded-full text-xs"><AlertCircle size={12} className="mr-1" /> Pending</span>;
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/admin/manage-internships" className="flex items-center text-indigo-400 hover:text-indigo-300">
          <ArrowLeft size={16} className="mr-1" /> Back to Internships
        </Link>
      </div>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{internshipData.title}</h1>
        <div className="flex gap-2 text-gray-300 text-sm">
          <span>{internshipData.companyName}</span>
          <span>•</span>
          <span>{internshipData.location}</span>
          <span>•</span>
          <span>{internshipData.applications} Applications</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full bg-gray-800 border border-gray-700 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-indigo-600' : 'bg-gray-700'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${filter === 'pending' ? 'bg-yellow-600' : 'bg-gray-700'}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${filter === 'accepted' ? 'bg-green-700' : 'bg-gray-700'}`}
            onClick={() => setFilter('accepted')}
          >
            Accepted
          </button>
          <button 
            className={`px-3 py-1 rounded-md ${filter === 'rejected' ? 'bg-red-700' : 'bg-gray-700'}`}
            onClick={() => setFilter('rejected')}
          >
            Rejected
          </button>
        </div>
        
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md border border-gray-700">
          <Download size={18} /> Export
        </button>
      </div>
      
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <div className="bg-gray-800 rounded-md overflow-hidden">
            <div className="p-3 bg-gray-700 font-medium">
              Applications ({filteredApplications.length})
            </div>
            <div className="overflow-y-auto max-h-96">
              {filteredApplications.map((application) => (
                <div 
                  key={application.id}
                  className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-750 ${selectedApplication?.id === application.id ? 'bg-gray-700' : ''}`}
                  onClick={() => setSelectedApplication(application)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{application.studentName}</h3>
                    {getStatusBadge(application.status)}
                  </div>
                  <div className="text-sm text-gray-400 mb-1">{application.branch}, {application.year}</div>
                  <div className="text-sm text-gray-400">Applied on {new Date(application.appliedDate).toLocaleDateString()}</div>
                </div>
              ))}
              
              {filteredApplications.length === 0 && (
                <div className="p-6 text-center text-gray-400">
                  No applications match your search criteria
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-7 lg:col-span-8">
          {selectedApplication ? (
            <div className="bg-gray-800 rounded-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">{selectedApplication.studentName}</h2>
                  <div className="text-gray-400">{selectedApplication.branch}, {selectedApplication.year}</div>
                </div>
                {getStatusBadge(selectedApplication.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Email</div>
                  <div>{selectedApplication.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Phone</div>
                  <div>{selectedApplication.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">CGPA</div>
                  <div>{selectedApplication.cgpa}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Applied On</div>
                  <div>{new Date(selectedApplication.appliedDate).toLocaleDateString()}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Cover Letter</div>
                <div className="bg-gray-700 p-4 rounded-md">{selectedApplication.coverLetter}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-sm text-gray-400 mb-2">Resume</div>
                <a 
                  href={selectedApplication.resumeUrl} 
                  className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
                >
                  <Download size={16} /> Download Resume
                </a>
              </div>
              
              <div>
                <div className="text-sm text-gray-400 mb-2">Update Application Status</div>
                <div className="flex gap-2">
                  <button 
                    className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-md flex items-center gap-1"
                    onClick={() => updateStatus(selectedApplication.id, 'accepted')}
                  >
                    <CheckCircle size={16} /> Accept
                  </button>
                  <button 
                    className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-md flex items-center gap-1"
                    onClick={() => updateStatus(selectedApplication.id, 'rejected')}
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-800 rounded-md p-8 text-center text-gray-400">
              Select an application to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
