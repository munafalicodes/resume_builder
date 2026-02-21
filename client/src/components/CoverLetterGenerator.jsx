import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Sparkles, Copy, Loader2, PenTool } from 'lucide-react';

const CoverLetterGenerator = () => {
    const { resumeData, jobDescription } = useResume();
    const [jd, setJd] = useState(jobDescription || '');
    const [tone, setTone] = useState('Professional');
    const [generatedLetter, setGeneratedLetter] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/ai/cover-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resumeData, jobDescription: jd, tone })
            });
            const data = await response.json();
            setGeneratedLetter(data.coverLetter);
        } catch (error) {
            console.error("Error generating cover letter:", error);
            alert("Failed to generate cover letter");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLetter);
        alert("Copied to clipboard!");
    };

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] bg-gray-50">
            {/* Left Panel: Inputs */}
            <div className="w-full lg:w-5/12 p-6 overflow-y-auto border-r border-gray-200 bg-white shadow-sm z-10">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2">
                        <PenTool className="text-blue-600" />
                        Cover Letter AI
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Generate a tailored cover letter in seconds based on your resume and the job description.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Job Description</label>
                        <textarea
                            value={jd}
                            onChange={(e) => setJd(e.target.value)}
                            rows="12"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y text-sm bg-gray-50 focus:bg-white"
                            placeholder="Paste the Job Description here..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Tone of Voice</label>
                        <select
                            value={tone}
                            onChange={(e) => setTone(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white cursor-pointer"
                        >
                            <option value="Professional">Professional & Formal</option>
                            <option value="Enthusiastic">Enthusiastic & Passionate</option>
                            <option value="Confident">Confident & Assertive</option>
                            <option value="Creative">Creative & Unique</option>
                        </select>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={loading || !jd}
                        className={`
                            w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all transform flex items-center justify-center gap-2
                            ${loading || !jd
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5'}
                        `}
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Sparkles className="animate-pulse" />}
                        {loading ? 'Generating...' : 'Generate Cover Letter'}
                    </button>
                </div>
            </div>

            {/* Right Panel: Preview */}
            <div className="w-full lg:w-7/12 p-8 bg-gray-100 overflow-y-auto flex items-start justify-center">
                <div className="relative w-full max-w-[210mm] min-h-[297mm] bg-white shadow-2xl rounded-sm p-[40px] animate-fade-in group">

                    {generatedLetter ? (
                        <>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={copyToClipboard}
                                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors tooltip"
                                    title="Copy to Clipboard"
                                >
                                    <Copy size={20} />
                                </button>
                            </div>
                            <div className="whitespace-pre-wrap leading-relaxed text-gray-800 font-serif text-[11pt]">
                                {generatedLetter}
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 mt-40 space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                <PenTool size={32} className="text-gray-300" />
                            </div>
                            <p className="text-lg font-medium">Ready to write?</p>
                            <p className="text-sm max-w-xs text-center">
                                Paste the job description on the left and select your tone to generate a personalized cover letter.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CoverLetterGenerator;
