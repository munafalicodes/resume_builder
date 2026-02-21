import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Download } from 'lucide-react';

const ResumePreview = () => {
    const { resumeData } = useResume();
    const { personalInfo, education, experience, skills } = resumeData;

    const downloadPDF = async () => {
        const element = document.getElementById('resume-preview-content');
        if (!element) return;

        const htmlContent = `
            <html>
                <head>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&family=Open+Sans:wght@400;600&display=swap');
                        body { 
                            font-family: 'Open Sans', sans-serif; 
                            line-height: 1.5; 
                            color: #333; 
                            margin: 0;
                            padding: 20px;
                        }
                        h1 { 
                            font-family: 'Merriweather', serif; 
                            text-transform: uppercase; 
                            font-size: 24pt; 
                            margin-bottom: 5px; 
                            text-align: center; 
                            letter-spacing: 1px;
                            color: #1a202c;
                        }
                        .contact-info { 
                            font-size: 9pt; 
                            margin-bottom: 20px; 
                            text-align: center; 
                            color: #4a5568;
                        }
                        .summary {
                            font-size: 10pt;
                            margin-bottom: 20px;
                            text-align: justify;
                            padding: 0 10px;
                        }
                        .section-title { 
                            font-family: 'Merriweather', serif;
                            text-transform: uppercase; 
                            border-bottom: 2px solid #2d3748; 
                            margin-bottom: 15px; 
                            margin-top: 25px; 
                            font-size: 11pt; 
                            font-weight: 700; 
                            padding-bottom: 2px;
                            color: #2d3748;
                        }
                        .item { margin-bottom: 12px; }
                        .header-row { 
                            display: flex; 
                            justify-content: space-between; 
                            align-items: baseline;
                            margin-bottom: 2px;
                        }
                        .bold { font-weight: 700; font-size: 11pt; color: #1a202c; }
                        .italic { font-style: italic; font-size: 11pt; color: #4a5568; }
                        .date { font-size: 9pt; color: #718096; font-weight: 600; }
                        ul { margin: 5px 0 10px 18px; padding: 0; }
                        li { font-size: 10pt; margin-bottom: 4px; }
                        .skills { font-size: 10pt; line-height: 1.6; }
                    </style>
                </head>
                <body>
                    ${element.innerHTML}
                </body>
            </html>
        `;

        try {
            const response = await fetch('http://localhost:5000/api/pdf/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ htmlContent })
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${personalInfo.firstName || 'Resume'}_${personalInfo.lastName || ''}.pdf`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        } catch (error) {
            console.error('PDF Generation failed:', error);
            alert('Failed to generate PDF');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div
                id="resume-preview-content"
                className="bg-white w-full h-full text-gray-800 font-sans text-sm leading-relaxed"
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-serif font-bold uppercase tracking-wide text-gray-900 mb-2">
                        {personalInfo.firstName} {personalInfo.lastName}
                    </h1>
                    <div className="text-xs text-gray-600 flex justify-center gap-3 flex-wrap">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                        {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
                        {personalInfo.portfolio && <span>• {personalInfo.portfolio}</span>}
                    </div>
                </div>

                {personalInfo.summary && (
                    <div className="mb-6 px-2">
                        <p className="text-justify text-gray-700">{personalInfo.summary}</p>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-serif text-sm font-bold uppercase border-b-2 border-gray-800 pb-1 mb-4 text-gray-800">Experience</h3>
                        <div className="space-y-4">
                            {experience.map(exp => (
                                <div key={exp.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-gray-900">{exp.company}</span>
                                        <span className="text-xs text-gray-600 font-semibold text-right whitespace-nowrap ml-4">{exp.startDate} – {exp.endDate}</span>
                                    </div>
                                    <div className="italic text-gray-700 mb-2">{exp.position}</div>
                                    <ul className="list-disc list-outside ml-4 text-gray-700 space-y-1">
                                        {exp.description.map((desc, i) => (
                                            <li key={i}>{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-serif text-sm font-bold uppercase border-b-2 border-gray-800 pb-1 mb-4 text-gray-800">Education</h3>
                        <div className="space-y-4">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <span className="font-bold text-gray-900">{edu.institution}</span>
                                        <span className="text-xs text-gray-600 font-semibold text-right whitespace-nowrap ml-4">{edu.startDate} – {edu.endDate}</span>
                                    </div>
                                    <div className="italic text-gray-700">{edu.degree}</div>
                                    {edu.description && <p className="text-gray-600 mt-1">{edu.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="mb-6">
                        <h3 className="font-serif text-sm font-bold uppercase border-b-2 border-gray-800 pb-1 mb-4 text-gray-800">Skills</h3>
                        <p className="text-gray-700">
                            {skills.join(' • ')}
                        </p>
                    </div>
                )}
            </div>

            <button
                onClick={downloadPDF}
                className="mt-8 flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl font-semibold"
            >
                <Download size={20} />
                Download PDF
            </button>
        </div>
    );
};

export default ResumePreview;
