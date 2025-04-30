import React, { useState } from 'react';
import { Plus, Filter, Search, Eye, Edit, Trash, ChevronDown } from 'lucide-react';

// Mock database for internships
const mockInternships = [
  {
    id: 1,
    title: "Web Development Intern",
    companyName: "TechSolutions Inc.",
    location: "Remote",
    duration: "3 months",
    description: "Work on our client-facing web applications using React and Node.js",
    requirements: "HTML, CSS, JavaScript, React, Node.js",
    stipend: "₹15,000/month",
    po: ["PO1", "PO3"],
    peo: ["PEO2"],
    sdgs: ["SDG9", "SDG17"],
    applications: 12
  },
  {
    id: 2,
    title: "Data Science Intern",
    companyName: "Analytics Pro",
    location: "Bangalore, India",
    duration: "6 months",
    description: "Analyze large datasets and develop machine learning models",
    requirements: "Python, Pandas, Scikit-learn, Statistics",
    stipend: "₹20,000/month",
    po: ["PO2", "PO5"],
    peo: ["PEO1", "PEO3"],
    sdgs: ["SDG4", "SDG8"],
    applications: 24
  },
  {
    id: 3,
    title: "Marketing Assistant",
    companyName: "Global Brands",
    location: "Mumbai, India",
    duration: "4 months",
    description: "Assist in creating and implementing digital marketing campaigns",
    requirements: "Social Media, Content Creation, SEO basics, Communication skills",
    stipend: "₹12,000/month",
    po: ["PO6", "PO9"],
    peo: ["PEO4"],
    sdgs: ["SDG8", "SDG12"],
    applications: 18
  }
];

// Mock database for dropdowns
const poOptions = ["PO1", "PO2", "PO3", "PO4", "PO5", "PO6", "PO7", "PO8", "PO9", "PO10", "PO11", "PO12"];
const peoOptions = ["PEO1", "PEO2", "PEO3", "PEO4", "PEO5"];
const sdgOptions = ["SDG1", "SDG2", "SDG3", "SDG4", "SDG5", "SDG6", "SDG7", "SDG8", "SDG9", "SDG10", "SDG11", "SDG12", "SDG13", "SDG14", "SDG15", "SDG16", "SDG17"];

// Dropdown component with multi-select capability
const MultiSelectDropdown = ({ options, placeholder, selectedValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSelection = (value) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(item => item !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="relative">
      <div 
        className="flex justify-between items-center w-full bg-gray-700 border border-gray-600 rounded-md p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1 max-w-full overflow-hidden">
          {selectedValues.length > 0 ? (
            selectedValues.map(value => (
              <span key={value} className="bg-indigo-600 px-2 py-1 rounded-md text-xs">
                {value}
              </span>
            ))
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-700 border border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map(option => (
            <div 
              key={option} 
              className={`p-2 cursor-pointer hover:bg-gray-600 ${selectedValues.includes(option) ? 'bg-indigo-900' : ''}`}
              onClick={() => toggleSelection(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Internships() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [internships, setInternships] = useState(mockInternships);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form state for new internship
  const [newInternship, setNewInternship] = useState({
    title: "",
    companyName: "",
    location: "",
    duration: "",
    stipend: "",
    requirements: "",
    description: "",
    po: [],
    peo: [],
    sdgs: []
  });
  
  const updateFormField = (field, value) => {
    setNewInternship({
      ...newInternship,
      [field]: value
    });
  };
  
  const filteredInternships = internships.filter(
    internship => internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  internship.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Internships</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md"
        >
          <Plus size={18} /> Add New Internship
        </button>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search internships..."
            className="w-full bg-gray-800 border border-gray-700 pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md border border-gray-700">
          <Filter size={18} /> Filter
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700 text-left">
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Company</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Duration</th>
              <th className="px-4 py-3">Stipend</th>
              <th className="px-4 py-3">Applications</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInternships.map((internship) => (
              <tr key={internship.id} className="border-t border-gray-700 hover:bg-gray-750">
                <td className="px-4 py-3">{internship.title}</td>
                <td className="px-4 py-3">{internship.companyName}</td>
                <td className="px-4 py-3">{internship.location}</td>
                <td className="px-4 py-3">{internship.duration}</td>
                <td className="px-4 py-3">{internship.stipend}</td>
                <td className="px-4 py-3">
                  <span className="bg-blue-900 text-blue-200 px-2 py-1 rounded-full text-sm">
                    {internship.applications}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="p-1 bg-blue-600 rounded-md hover:bg-blue-700" title="View Applications">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 bg-amber-600 rounded-md hover:bg-amber-700" title="Edit">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 bg-red-600 rounded-md hover:bg-red-700" title="Delete">
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-3xl max-h-screen overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Add New Internship</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                    value={newInternship.title}
                    onChange={(e) => updateFormField('title', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                    value={newInternship.companyName}
                    onChange={(e) => updateFormField('companyName', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Location</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                    value={newInternship.location}
                    onChange={(e) => updateFormField('location', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                    value={newInternship.duration}
                    onChange={(e) => updateFormField('duration', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Stipend</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                    value={newInternship.stipend}
                    onChange={(e) => updateFormField('stipend', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Requirements (comma-separated)</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                    value={newInternship.requirements}
                    onChange={(e) => updateFormField('requirements', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2"
                  value={newInternship.description}
                  onChange={(e) => updateFormField('description', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Program Outcomes (PO)</label>
                  <MultiSelectDropdown 
                    options={poOptions} 
                    placeholder="Select POs"
                    selectedValues={newInternship.po}
                    onChange={(values) => updateFormField('po', values)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Program Educational Objectives (PEO)</label>
                  <MultiSelectDropdown 
                    options={peoOptions} 
                    placeholder="Select PEOs"
                    selectedValues={newInternship.peo}
                    onChange={(values) => updateFormField('peo', values)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">SDGs</label>
                  <MultiSelectDropdown 
                    options={sdgOptions} 
                    placeholder="Select SDGs"
                    selectedValues={newInternship.sdgs}
                    onChange={(values) => updateFormField('sdgs', values)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md">
                  Save Internship
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

