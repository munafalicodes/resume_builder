import React, { createContext, useState, useContext, useEffect } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState({
        personalInfo: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            phone: '+1 234 567 8900',
            linkedin: 'linkedin.com/in/johndoe',
            portfolio: 'johndoe.com',
            summary: 'Experienced software engineer with a passion for building scalable web applications.'
        },
        education: [
            {
                id: 1,
                institution: 'University of Technology',
                degree: 'B.S. Computer Science',
                startDate: '2018',
                endDate: '2022',
                description: 'GPA: 3.8/4.0. Relevant coursework: Data Structures, Algorithms, Web Development.'
            }
        ],
        experience: [
            {
                id: 1,
                company: 'Tech Solutions Inc.',
                position: 'Software Engineer',
                startDate: '2022',
                endDate: 'Present',
                description: [
                    'Developed and maintained critical microservices.',
                    'Collaborated with cross-functional teams to deliver high-quality software.',
                    'Optimized database queries for 30% faster response times.'
                ]
            }
        ],
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Python'],
        projects: [
            {
                id: 1,
                name: 'E-commerce Platform',
                description: 'A full-stack e-commerce application built with MERN stack.',
                link: 'github.com/johndoe/ecommerce',
                technologies: ['React', 'Node.js', 'MongoDB']
            }
        ]
    });

    const updatePersonalInfo = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [field]: value }
        }));
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [...prev.education, { id: Date.now(), institution: '', degree: '', startDate: '', endDate: '', description: '' }]
        }));
    };

    const updateEducation = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
        }));
    };

    const removeEducation = (id) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    const addExperience = () => {
        setResumeData(prev => ({
            ...prev,
            experience: [...prev.experience, { id: Date.now(), company: '', position: '', startDate: '', endDate: '', description: [''] }]
        }));
    };

    const updateExperience = (id, field, value) => {
        // If field is description (bullet points array)
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        }));
    };

    // Specifically for bullet points in experience
    const updateExperienceBullet = (expId, bulletIndex, value) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => {
                if (exp.id === expId) {
                    const newDesc = [...exp.description];
                    newDesc[bulletIndex] = value;
                    return { ...exp, description: newDesc };
                }
                return exp;
            })
        }));
    };

    const addExperienceBullet = (expId) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => {
                if (exp.id === expId) {
                    return { ...exp, description: [...exp.description, ''] };
                }
                return exp;
            })
        }));
    };

    const removeExperienceBullet = (expId, bulletIndex) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => {
                if (exp.id === expId) {
                    const newDesc = exp.description.filter((_, idx) => idx !== bulletIndex);
                    return { ...exp, description: newDesc };
                }
                return exp;
            })
        }));
    };


    const removeExperience = (id) => {
        setResumeData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const updateSkills = (value) => {
        // value is strictly string array or comma separated string handled in UI
        // Assuming array pass
        setResumeData(prev => ({ ...prev, skills: value }));
    };

    /* Resume Operations */
    const saveResume = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/resumes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(resumeData)
            });
            const data = await response.json();
            if (data._id) {
                setResumeData(prev => ({ ...prev, _id: data._id }));
                alert('Resume Saved Successfully!');
            }
        } catch (error) {
            console.error('Error saving resume:', error);
            alert('Failed to save resume');
        }
    };

    const loadResume = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/resumes/${id}`);
            const data = await response.json();
            if (data) {
                setResumeData(data);
            }
        } catch (error) {
            console.error('Error loading resume:', error);
        }
    };

    /* AI & Job Description State */
    const [jobDescription, setJobDescription] = useState('');
    const [extractedKeywords, setExtractedKeywords] = useState([]);
    const [atsScore, setAtsScore] = useState(0);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const analyzeJobDescription = async (text) => {
        setIsAnalyzing(true);
        setJobDescription(text);
        try {
            const response = await fetch('http://localhost:5000/api/ai/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobDescription: text })
            });
            const data = await response.json();
            if (data.keywords) {
                setExtractedKeywords(data.keywords);
                // Initial calculation with new keywords
                calculateAtsScore(data.keywords, resumeData);
            }
        } catch (error) {
            console.error("Error analyzing JD:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    // Auto-recalculate when resumeData changes, if we have keywords
    useEffect(() => {
        if (extractedKeywords.length > 0) {
            calculateAtsScore(extractedKeywords, resumeData);
        }
    }, [resumeData, extractedKeywords]);

    const [atsAnalysis, setAtsAnalysis] = useState({
        matched: [],
        missing: [],
        score: 0
    });

    const calculateAtsScore = (keywords, currentResumeData) => {
        if (!keywords || keywords.length === 0) {
            setAtsScore(0);
            setAtsAnalysis({ matched: [], missing: [], score: 0 });
            return;
        }

        const resumeText = JSON.stringify(currentResumeData).toLowerCase();
        const matched = [];
        const missing = [];

        keywords.forEach(keyword => {
            if (resumeText.includes(keyword.toLowerCase())) {
                matched.push(keyword);
            } else {
                missing.push(keyword);
            }
        });

        const score = Math.round((matched.length / keywords.length) * 100);
        setAtsScore(score);
        setAtsAnalysis({ matched, missing, score });
    };

    const rewriteBulletWithAI = async (bulletPoint) => {
        try {
            const response = await fetch('http://localhost:5000/api/ai/rewrite', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    bulletPoint,
                    keywords: extractedKeywords
                })
            });
            const data = await response.json();
            return data.rewrittenText;
        } catch (error) {
            console.error("Error rewriting bullet:", error);
            return bulletPoint; // return original on error
        }
    };

    return (
        <ResumeContext.Provider value={{
            resumeData,
            updatePersonalInfo,
            addEducation, updateEducation, removeEducation,
            addExperience, updateExperience, removeExperience, updateExperienceBullet, addExperienceBullet, removeExperienceBullet,
            updateSkills,
            jobDescription, setJobDescription,
            extractedKeywords, atsScore, atsAnalysis, isAnalyzing, analyzeJobDescription, rewriteBulletWithAI,
            saveResume, loadResume, setResumeData
        }}>
            {children}
        </ResumeContext.Provider>
    );
};
