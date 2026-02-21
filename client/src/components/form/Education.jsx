import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Trash2, Plus } from 'lucide-react';

const Education = () => {
    const { resumeData, addEducation, updateEducation, removeEducation } = useResume();

    const handleChange = (id, e) => {
        const { name, value } = e.target;
        updateEducation(id, name, value);
    };

    return (
        <div className="space-y-6">
            {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => removeEducation(edu.id)}
                            className="text-red-500 hover:text-red-700 p-1 bg-white rounded-full shadow-sm hover:bg-red-50"
                            title="Remove Education"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Institution</label>
                            <input
                                type="text"
                                name="institution"
                                value={edu.institution}
                                onChange={(e) => handleChange(edu.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="University Name"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Degree</label>
                            <input
                                type="text"
                                name="degree"
                                value={edu.degree}
                                onChange={(e) => handleChange(edu.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="Bachelor's in..."
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="text"
                                name="startDate"
                                value={edu.startDate}
                                onChange={(e) => handleChange(edu.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="YYYY"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="text"
                                name="endDate"
                                value={edu.endDate}
                                onChange={(e) => handleChange(edu.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="YYYY or Present"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={edu.description}
                            onChange={(e) => handleChange(edu.id, e)}
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y"
                            placeholder="Additional details, GPA, honors..."
                        />
                    </div>
                </div>
            ))}

            <button
                onClick={addEducation}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 font-medium"
            >
                <Plus size={18} />
                Add Education
            </button>
        </div>
    );
};

export default Education;
