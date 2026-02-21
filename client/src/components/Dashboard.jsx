import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { Plus, Edit3, Trash2, FileText, Calendar, Loader2 } from 'lucide-react';

const Dashboard = () => {
    const { loadResume, setResumeData } = useResume();
    const [resumes, setResumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchResumes();
    }, []);

    const fetchResumes = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/resumes');
            if (!response.ok) {
                throw new Error('Failed to fetch');
            }
            const data = await response.json();
            setResumes(data);
        } catch (error) {
            console.error('Error fetching resumes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = async (id) => {
        await loadResume(id);
        navigate('/app');
    };

    const handleDelete = async (id, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this resume?')) {
            try {
                await fetch(`http://localhost:5000/api/resumes/${id}`, { method: 'DELETE' });
                fetchResumes();
            } catch (error) {
                console.error('Error deleting resume:', error);
            }
        }
    };

    const handleCreateNew = () => {
        // Reset context to default state before navigating
        setResumeData({
            personalInfo: { firstName: '', lastName: '', email: '', phone: '', linkedin: '', portfolio: '', summary: '' },
            education: [],
            experience: [],
            skills: [],
            projects: []
        });
        navigate('/app');
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                        CareerForge Pro
                    </Link>
                    <nav className="flex gap-6">
                        <Link to="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
                        <Link to="/cover-letter" className="text-gray-600 hover:text-blue-600 transition-colors">Cover Letter</Link>
                    </nav>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
                        <p className="text-gray-500 mt-1">Manage and organize your resume versions.</p>
                    </div>
                    <button
                        onClick={handleCreateNew}
                        className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95"
                    >
                        <Plus size={20} />
                        Create New Resume
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 size={40} className="text-blue-600 animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {resumes.map(resume => (
                            <div
                                key={resume._id}
                                onClick={() => handleEdit(resume._id)}
                                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <FileText size={24} />
                                    </div>
                                    <button
                                        onClick={(e) => handleDelete(resume._id, e)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-10"
                                        title="Delete Resume"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">
                                    {resume.personalInfo?.firstName ? `${resume.personalInfo.firstName} ${resume.personalInfo.lastName}` : 'Untitled Resume'}
                                </h3>
                                <p className="text-gray-500 text-sm mb-6 truncate">
                                    {resume.personalInfo?.position || 'No position specified'}
                                </p>

                                <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>Updated {new Date(resume.updatedAt || resume.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <span className="flex items-center gap-1 text-blue-600 font-medium group-hover:underline">
                                        Edit <Edit3 size={12} />
                                    </span>
                                </div>
                            </div>
                        ))}

                        {/* Add New Card (Empty State) */}
                        <div
                            onClick={handleCreateNew}
                            className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer flex flex-col items-center justify-center text-gray-400 hover:text-blue-500 min-h-[200px]"
                        >
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                                <Plus size={32} />
                            </div>
                            <span className="font-semibold">Create New Resume</span>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
