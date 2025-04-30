import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InternshipDialog from './InternshipDialog';

const Internships = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);

  // Fetch internships
  const { data: internshipsResponse, isLoading, error, refetch } = useQuery({
    queryKey: ['internships', page, rowsPerPage],
    queryFn: async () => {
      try {
        const response = await internshipAPI.getAll(page + 1, rowsPerPage);
        return response.data;
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/login');
          throw new Error('Please login to continue');
        }
        throw error;
      }
    },
    retry: 1
  });

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Create internship mutation
  const createMutation = useMutation({
    mutationFn: async (data) => {
      // Validate required fields
      if (!data.title || !data.companyName || !data.location || 
          !data.duration || !data.description || !data.requirements || 
          data.stipend === undefined) {
        const missingFields = [
          !data.title && 'title',
          !data.companyName && 'companyName',
          !data.location && 'location',
          !data.duration && 'duration',
          !data.description && 'description',
          !data.requirements && 'requirements',
          data.stipend === undefined && 'stipend'
        ].filter(Boolean);
        
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Format data
      const formattedData = {
        ...data,
        PO: Array.isArray(data.PO) ? data.PO : [],
        PEO: Array.isArray(data.PEO) ? data.PEO : [],
        SDGS: Array.isArray(data.SDGS) ? data.SDGS : [],
        stipend: Number(data.stipend)
      };

      try {
        const response = await internshipAPI.create(formattedData);
        return response.data;
      } catch (error) {
        if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        }
        if (error.response?.status === 400) {
          throw new Error('Invalid data provided. Please check all fields.');
        }
        if (error.response?.status === 500) {
          throw new Error('Server error. Please check the data format and try again.');
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internships'] });
      toast.success('Internship created successfully');
      setDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create internship');
    },
  });

  // Update internship mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => internshipAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internships'] });
      toast.success('Internship updated successfully');
      setDialogOpen(false);
      setEditingInternship(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update internship');
    },
  });

  // Delete internship mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => internshipAPI.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internships'] });
      toast.success('Internship deleted successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete internship');
    },
  });

  const handleAddClick = () => {
    setEditingInternship(null);
    setDialogOpen(true);
  };

  const handleEditClick = (internship) => {
    setEditingInternship(internship);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleDialogSubmit = (data) => {
    if (editingInternship) {
      updateMutation.mutate({ id: editingInternship._id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleNavigateToApplications = (internshipId) => {
    navigate(`/applications/${internshipId}`);
  };

  const toggleRowExpansion = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const totalPages = Math.ceil((internshipsResponse?.total || 0) / rowsPerPage);

  // Rest of the component remains the same
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-[#0f172a] rounded-xl p-6 border border-red-500/20 max-w-md w-full text-center">
          <p className="text-red-400 mb-4">
            {error instanceof Error ? error.message : 'An error occurred while loading internships'}
          </p>
          <button 
            onClick={() => refetch()}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center justify-center space-x-2 mx-auto"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 md:mx-6 lg:mx-8 pb-20">
      <div className="bg-[#0f172a] rounded-xl p-6 border border-indigo-500/20 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">Internships</h1>
          <button
            onClick={handleAddClick}
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>Add New Internship</span>
          </button>
        </div>

        {/* Mobile view - Card-based layout */}
        <div className="md:hidden space-y-4">
          {internshipsResponse?.internships?.map((internship) => (
            <div key={internship._id} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-white">{internship.title}</h3>
                  <p className="text-gray-400 text-sm">{internship.companyName}</p>
                </div>
                <button 
                  onClick={() => toggleRowExpansion(internship._id)}
                  className="p-1.5 bg-slate-700 rounded-full"
                >
                  {expandedRow === internship._id ? (
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  )}
                </button>
              </div>
              
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-700 rounded-full text-xs text-gray-300">
                  {internship.location}
                </span>
                <span className="px-2 py-1 bg-slate-700 rounded-full text-xs text-gray-300">
                  {internship.duration}
                </span>
                <span className="px-2 py-1 bg-indigo-900 rounded-full text-xs text-indigo-300">
                  ₹{internship.stipend}/month
                </span>
              </div>
              
              {expandedRow === internship._id && (
                <div className="mt-4 space-y-3 border-t border-slate-700 pt-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Description</h4>
                    <p className="text-sm text-gray-300 mt-1 break-words">{internship.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400">Requirements</h4>
                    <p className="text-sm text-gray-300 mt-1 break-words">{internship.requirements}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3">
                    <button
                      onClick={() => handleEditClick(internship)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
                    >
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClick(internship._id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm"
                    >
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                      <span>Delete</span>
                    </button>
                    <button
                      onClick={() => handleNavigateToApplications(internship._id)}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm text-white"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      <span>Applications</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop view - Table layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-slate-800 rounded-lg overflow-hidden">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Duration</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Stipend</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {internshipsResponse?.internships?.map((internship) => (
                <React.Fragment key={internship._id}>
                  <tr className="hover:bg-slate-750 transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-white">{internship.title}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{internship.companyName}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{internship.location}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">{internship.duration}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300">₹{internship.stipend}/month</td>
                    <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => toggleRowExpansion(internship._id)}
                          className="p-2 text-gray-400 hover:text-white bg-slate-700 rounded-full"
                        >
                          {expandedRow === internship._id ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => handleEditClick(internship)}
                          className="p-2 text-blue-400 hover:text-blue-300 bg-slate-700 rounded-full"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(internship._id)}
                          className="p-2 text-red-400 hover:text-red-300 bg-slate-700 rounded-full"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleNavigateToApplications(internship._id)}
                          className="p-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRow === internship._id && (
                    <tr className="bg-slate-750">
                      <td colSpan={6} className="px-4 py-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Description</h4>
                            <p className="text-sm text-gray-300 mt-1 break-words">{internship.description}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-400">Requirements</h4>
                            <p className="text-sm text-gray-300 mt-1 break-words">{internship.requirements}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Rows per page:</span>
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="bg-slate-700 border border-slate-600 rounded-md text-white text-sm py-1 px-2"
            >
              {[5, 10, 25, 50].map(option => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <span className="text-sm text-gray-400 mr-4">
              {page * rowsPerPage + 1}-{Math.min((page + 1) * rowsPerPage, internshipsResponse?.total || 0)} of {internshipsResponse?.total || 0}
            </span>
            <div className="flex space-x-1">
              <button
                onClick={() => handleChangePage(page - 1)}
                disabled={page === 0}
                className={`p-2 rounded-full ${
                  page === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-slate-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button
                onClick={() => handleChangePage(page + 1)}
                disabled={page >= totalPages - 1}
                className={`p-2 rounded-full ${
                  page >= totalPages - 1 ? 'text-gray-600 cursor-not-allowed' : 'text-gray-400 hover:bg-slate-700'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <InternshipDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingInternship(null);
        }}
        onSubmit={handleDialogSubmit}
        initialData={editingInternship || undefined}
        mode={editingInternship ? 'edit' : 'add'}
      />
    </div>
  );
};

export default Internships;
