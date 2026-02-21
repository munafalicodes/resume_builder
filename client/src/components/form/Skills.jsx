import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';

const Skills = () => {
    const { resumeData, updateSkills } = useResume();
    const [localInput, setLocalInput] = useState(resumeData.skills.join(', '));

    // Sync local state when context changes (e.g. from file upload)
    useEffect(() => {
        setLocalInput(resumeData.skills.join(', '));
    }, [resumeData.skills]);

    const handleChange = (e) => {
        const val = e.target.value;
        setLocalInput(val);
        updateSkills(val.split(',').map(s => s.trim()).filter(s => s.length > 0));
    };

    return (
        <div className="space-y-4">
            <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                    Skills <span className="text-gray-400 font-normal">(comma separated)</span>
                </label>
                <textarea
                    value={localInput}
                    onChange={handleChange}
                    placeholder="JavaScript, React, Node.js, Project Management, Communication..."
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
                />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
                {resumeData.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full border border-blue-200">
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Skills;
