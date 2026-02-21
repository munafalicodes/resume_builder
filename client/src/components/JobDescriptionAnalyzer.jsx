import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Search, Loader2, CheckCircle, XCircle } from 'lucide-react';

const JobDescriptionAnalyzer = () => {
    const { jobDescription, analyzeJobDescription, atsAnalysis, isAnalyzing } = useResume();
    const [text, setText] = useState(jobDescription);

    const handleAnalyze = () => {
        analyzeJobDescription(text);
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Paste Job Description Here</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows="6"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y text-sm"
                    placeholder="Paste the job description to extract keywords..."
                />
            </div>

            <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !text}
                className={`
                    flex items-center justify-center gap-2 w-full py-2.5 rounded-lg font-medium transition-all
                    ${isAnalyzing || !text
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'}
                `}
            >
                {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
                {isAnalyzing ? 'Analyzing Job Description...' : 'Analyze Job Description'}
            </button>

            {atsAnalysis.score > 0 && (
                <div className="mt-6 space-y-6 animate-fade-in">
                    {/* Score Gauge (Simplified as bar for now) */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-end mb-2">
                            <h3 className="font-bold text-gray-800">ATS Optimization Score</h3>
                            <span className={`text-2xl font-bold ${atsAnalysis.score >= 80 ? 'text-green-600' : atsAnalysis.score >= 50 ? 'text-yellow-600' : 'text-red-500'}`}>
                                {atsAnalysis.score}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className={`h-2.5 rounded-full transition-all duration-1000 ease-out ${atsAnalysis.score >= 80 ? 'bg-green-600' : atsAnalysis.score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${atsAnalysis.score}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Missing Keywords */}
                        <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                            <div className="flex items-center gap-2 mb-3 text-red-800 font-semibold">
                                <XCircle size={18} />
                                <span>Missing Keywords</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {atsAnalysis.missing.length > 0 ? (
                                    atsAnalysis.missing.map((keyword, index) => (
                                        <span key={index} className="px-2.5 py-1 bg-white border border-red-200 text-red-700 rounded-md text-xs font-medium shadow-sm">
                                            {keyword}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-red-500 italic">None! Great job.</span>
                                )}
                            </div>
                        </div>

                        {/* Matched Keywords */}
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <div className="flex items-center gap-2 mb-3 text-green-800 font-semibold">
                                <CheckCircle size={18} />
                                <span>Matched Keywords</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {atsAnalysis.matched.length > 0 ? (
                                    atsAnalysis.matched.map((keyword, index) => (
                                        <span key={index} className="px-2.5 py-1 bg-white border border-green-200 text-green-700 rounded-md text-xs font-medium shadow-sm">
                                            {keyword}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-sm text-green-600 italic">No matches yet. Try adding keywords!</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDescriptionAnalyzer;
