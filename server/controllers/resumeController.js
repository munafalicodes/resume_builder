const Resume = require('../models/Resume');

exports.saveResume = async (req, res) => {
    try {
        const resumeData = req.body;
        // For simple MVP without proper auth, we might upsert based on an ID if provided, or create new.
        // Assuming the client sends _id if it's an update.

        if (resumeData._id) {
            const updatedResume = await Resume.findByIdAndUpdate(resumeData._id, resumeData, { new: true });
            return res.json(updatedResume);
        } else {
            const newResume = new Resume(resumeData);
            const savedResume = await newResume.save();
            return res.json(savedResume);
        }
    } catch (error) {
        console.error('Error saving resume:', error);
        res.status(500).json({ error: 'Failed to save resume' });
    }
};

exports.getResumes = async (req, res) => {
    try {
        // In a real app, query by userId from session/token
        // For MVP, we'll return all resumes (or filter by a query param if we added a mock userId mechanism)
        const resumes = await Resume.find().sort({ createdAt: -1 });
        res.json(resumes);
    } catch (error) {
        console.error('Error fetching resumes:', error);
        res.status(500).json({ error: 'Failed to fetch resumes' });
    }
};

exports.getResume = async (req, res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if (!resume) return res.status(404).json({ error: 'Resume not found' });
        res.json(resume);
    } catch (error) {
        console.error('Error fetching resume:', error);
        res.status(500).json({ error: 'Failed to fetch resume' });
    }
};

exports.deleteResume = async (req, res) => {
    try {
        await Resume.findByIdAndDelete(req.params.id);
        res.json({ message: 'Resume deleted successfully' });
    } catch (error) {
        console.error('Error deleting resume:', error);
        res.status(500).json({ error: 'Failed to delete resume' });
    }
};
