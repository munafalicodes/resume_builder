import React, { useState } from 'react';
import PersonalDetails from './form/PersonalDetails';
import Education from './form/Education';
import Experience from './form/Experience';
import Skills from './form/Skills';
import JobDescriptionAnalyzer from './JobDescriptionAnalyzer';
import ResumeUpload from './ResumeUpload';
import { useResume } from '../context/ResumeContext';
import { Save, ChevronDown, ChevronUp, Trophy } from 'lucide-react';

const Section = ({ title, children, isOpen, onToggle }) => (
    <div className="mb-4 border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm transition-shadow hover:shadow-md">
        <button
            onClick={onToggle}
            className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
        >
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            {isOpen ? <ChevronUp className="text-gray-500" /> : <ChevronDown className="text-gray-500" />}
        </button>
        {isOpen && <div className="p-6 border-t border-gray-200 animate-slide-up">{children}</div>}
    </div>
);

const ResumeForm = () => {
    const { saveResume, atsAnalysis } = useResume();
    const [openSection, setOpenSection] = useState('personal');

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-20 relative">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Resume Builder</h1>
                <button
                    onClick={saveResume}
                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-all font-medium shadow-sm hover:shadow-md"
                >
                    <Save size={18} />
                    <span>Save Resume</span>
                </button>
            </div>

            {/* Sticky Score Widget - Moved Above Upload */}
            {atsAnalysis.score > 0 ? (
                <div className="sticky top-4 z-40 bg-white/95 backdrop-blur-md border border-blue-100 shadow-xl p-4 rounded-2xl flex items-center gap-6 animate-slide-up ring-1 ring-blue-50">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full shadow-inner ${atsAnalysis.score >= 80 ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                            <Trophy size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">ATS Score</p>
                            <p className={`text-3xl font-extrabold ${atsAnalysis.score >= 80 ? 'text-green-600' : atsAnalysis.score >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                                {atsAnalysis.score}%
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 hidden sm:block">
                        <div className="flex justify-between text-xs font-medium text-gray-400 mb-1">
                            <span>Needs Improvement</span>
                            <span>Good</span>
                            <span>Excellent</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden box-border border border-gray-200">
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${atsAnalysis.score >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' : atsAnalysis.score >= 50 ? 'bg-gradient-to-r from-yellow-300 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-600'}`}
                                style={{ width: `${atsAnalysis.score}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center gap-3 text-blue-800">
                    <div className="bg-blue-100 p-2 rounded-full">
                        <Trophy size={20} className="text-blue-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-sm">Targeting a specific job?</p>
                        <p className="text-xs opacity-80">Paste a Job Description below to get an ATS optimization score.</p>
                    </div>
                </div>
            )}

            <ResumeUpload />

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6 group hover:border-blue-300 transition-colors">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                    Job Optimization
                </h2>
                <JobDescriptionAnalyzer />
            </div>

            <Section
                title="Personal Details"
                isOpen={openSection === 'personal'}
                onToggle={() => toggleSection('personal')}
            >
                <PersonalDetails />
            </Section>

            <Section
                title="Experience"
                isOpen={openSection === 'experience'}
                onToggle={() => toggleSection('experience')}
            >
                <Experience />
            </Section>

            <Section
                title="Education"
                isOpen={openSection === 'education'}
                onToggle={() => toggleSection('education')}
            >
                <Education />
            </Section>

            <Section
                title="Skills"
                isOpen={openSection === 'skills'}
                onToggle={() => toggleSection('skills')}
            >
                <Skills />
            </Section>
        </div>
    );
};

export default ResumeForm;
