const pdf = require('pdf-parse');
const fs = require('fs');

exports.parseResume = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const dataBuffer = fs.readFileSync(req.file.path);
        const data = await pdf(dataBuffer);

        // Basic extraction logic (can be improved with AI or regex)
        const text = data.text;

        // Simple heuristic to extract email
        const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
        const emailMatch = text.match(emailRegex);

        // Attempt to extract name (very basic heuristic - first line usually)
        const lines = text.split('\n').filter(line => line.trim() !== '');
        const name = lines[0] ? lines[0].trim() : '';

        // Clean up uploaded file
        fs.unlinkSync(req.file.path);

        res.json({
            text: text,
            extractedData: {
                fullName: name,
                email: emailMatch ? emailMatch[0] : '',
                // Add more fields as needed or refine extraction
            }
        });

    } catch (error) {
        console.error('Error parsing resume:', error);
        res.status(500).json({ error: 'Failed to parse resume' });
    }
};
