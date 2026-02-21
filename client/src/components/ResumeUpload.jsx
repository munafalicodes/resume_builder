import React, { useState } from 'react';
import { Upload, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const ResumeUpload = () => {
    const { setResumeData } = useResume();
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState('idle'); // idle, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        setUploadStatus('idle');
        setErrorMessage('');

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await fetch('http://localhost:5000/api/resume/parse', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to parse resume');
            }

            const data = await response.json();

            // Map parsed data to context structure
            // Note: detailed mapping depends on how smart the parser is.
            // For now, we map what we have from the basic parser
            setResumeData(prev => ({
                ...prev,
                personalInfo: {
                    ...prev.personalInfo,
                    firstName: data.extractedData?.fullName?.split(' ')[0] || prev.personalInfo.firstName,
                    lastName: data.extractedData?.fullName?.split(' ').slice(1).join(' ') || prev.personalInfo.lastName,
                    email: data.extractedData?.email || prev.personalInfo.email,
                    // Map other fields as parser improves
                },
                // We could also populate experience/education if we had structured data
            }));

            setUploadStatus('success');
            setTimeout(() => setUploadStatus('idle'), 3000);
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('error');
            setErrorMessage('Failed to upload. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border border-dashed border-gray-300 hover:border-blue-400 transition-colors">
            <div className="text-center">
                <div className="mx-auto h-12 w-12 text-gray-400">
                    {isUploading ? (
                        <Loader2 className="animate-spin h-10 w-10 text-blue-500 mx-auto" />
                    ) : uploadStatus === 'success' ? (
                        <Check className="h-10 w-10 text-green-500 mx-auto" />
                    ) : uploadStatus === 'error' ? (
                        <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
                    ) : (
                        <Upload className="h-10 w-10 mx-auto" />
                    )}
                </div>

                <h3 className="mt-2 text-sm font-semibold text-gray-900">Upload your existing resume</h3>
                <p className="mt-1 text-sm text-gray-500">PDF or DOCX up to 10MB</p>

                <div className="mt-4 flex justify-center">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                    >
                        <span>Select a file</span>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".pdf,.docx"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                        />
                    </label>
                </div>

                {errorMessage && (
                    <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                )}
                {uploadStatus === 'success' && (
                    <p className="mt-2 text-sm text-green-600">Resume parsed successfully! Form updated.</p>
                )}
            </div>
        </div>
    );
};

export default ResumeUpload;
