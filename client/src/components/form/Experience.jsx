import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import MagicButton from '../common/MagicButton';
import { Trash2, Plus, GripVertical } from 'lucide-react';

const Experience = () => {
    const { resumeData, addExperience, updateExperience, removeExperience, updateExperienceBullet, addExperienceBullet, removeExperienceBullet, rewriteBulletWithAI } = useResume();
    const [loadingState, setLoadingState] = useState({}); // { 'expId-bulletIndex': boolean }

    const handleChange = (id, e) => {
        const { name, value } = e.target;
        updateExperience(id, name, value);
    };

    const handleBulletChange = (expId, index, e) => {
        updateExperienceBullet(expId, index, e.target.value);
    };

    const handleRewrite = async (expId, index, currentText) => {
        if (!currentText.trim()) return;

        const key = `${expId}-${index}`;
        setLoadingState(prev => ({ ...prev, [key]: true }));

        const newText = await rewriteBulletWithAI(currentText);
        updateExperienceBullet(expId, index, newText);

        setLoadingState(prev => ({ ...prev, [key]: false }));
    };

    return (
        <div className="space-y-8">
            {resumeData.experience.map((exp) => (
                <div key={exp.id} className="relative group bg-gray-50 border border-gray-200 rounded-lg p-6 transition-all hover:shadow-md">
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={() => removeExperience(exp.id)}
                            className="text-red-500 hover:text-red-700 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
                            title="Remove Experience"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Company</label>
                            <input
                                type="text"
                                name="company"
                                value={exp.company}
                                onChange={(e) => handleChange(exp.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Position</label>
                            <input
                                type="text"
                                name="position"
                                value={exp.position}
                                onChange={(e) => handleChange(exp.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Start Date</label>
                            <input
                                type="text"
                                name="startDate"
                                value={exp.startDate}
                                onChange={(e) => handleChange(exp.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">End Date</label>
                            <input
                                type="text"
                                name="endDate"
                                value={exp.endDate}
                                onChange={(e) => handleChange(exp.id, e)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">Responsiblities & Achievements</label>
                        {exp.description.map((bullet, index) => (
                            <div key={index} className="flex items-start gap-2 group/bullet">
                                <div className="mt-3 text-gray-400">
                                    <GripVertical size={14} />
                                </div>
                                <div className="flex-1">
                                    <textarea
                                        value={bullet}
                                        onChange={(e) => handleBulletChange(exp.id, index, e)}
                                        rows="2"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm resize-none"
                                        placeholder="Describe your achievement..."
                                    />
                                    <div className="flex justify-between items-center mt-1 h-6">
                                        <MagicButton
                                            onClick={() => handleRewrite(exp.id, index, bullet)}
                                            loading={loadingState[`${exp.id}-${index}`]}
                                        />
                                        <button
                                            onClick={() => removeExperienceBullet(exp.id, index)}
                                            className="text-xs text-red-500 hover:text-red-700 opacity-0 group-hover/bullet:opacity-100 transition-opacity"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            onClick={() => addExperienceBullet(exp.id)}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 mt-2 pl-6"
                        >
                            <Plus size={14} /> Add Bullet Point
                        </button>
                    </div>
                </div>
            ))}
            <button
                onClick={addExperience}
                className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-all flex items-center justify-center gap-2 font-medium"
            >
                <Plus size={18} />
                Add Experience
            </button>
        </div>
    );
};

export default Experience;
