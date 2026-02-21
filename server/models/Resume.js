const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ResumeSchema = new Schema({
    userId: {
        type: String,
        required: true // For now, we can use a generated ID or simple string
    },
    personalInfo: {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        linkedin: String, // standardized to 'linkedin'
        portfolio: String, // standardized to 'portfolio'
        summary: String
    },
    education: [{
        institution: String,
        degree: String,
        startDate: String,
        endDate: String,
        description: String
    }],
    experience: [{
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: [String] // Array of bullet points for easier AI rewriting
    }],
    skills: [String],
    projects: [{
        name: String,
        description: String,
        link: String,
        technologies: [String]
    }],
    atsScore: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', ResumeSchema);
