const OpenAI = require('openai');
// require('dotenv').config();

let openai;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });
} else {
    console.warn("⚠️ OPENAI_API_KEY is missing. AI features will be disabled.");
}

exports.analyzeJobDescription = async (req, res) => {
    const { jobDescription } = req.body;

    if (!jobDescription) {
        return res.status(400).json({ error: 'Job description is required' });
    }

    try {
        if (!openai) return res.status(503).json({ error: 'OpenAI API key missing on server' });

        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an expert ATS (Applicant Tracking System) optimizer. Your task is to analyze a job description (JD) and extract the top 5-10 most critical keywords and skills. Provide a brief explanation for why these are important. Output the result in JSON format with keys: 'keywords' (array of strings) and 'analysis' (string)."
                },
                { role: "user", content: jobDescription }
            ],
            model: "gpt-3.5-turbo",
            response_format: { type: "json_object" },
        });

        const result = JSON.parse(completion.choices[0].message.content);
        res.json(result);

    } catch (error) {
        console.error('Error analyzing JD:', error);
        res.status(500).json({ error: 'Failed to analyze job description' });
    }
};

exports.rewriteBulletPoint = async (req, res) => {
    const { bulletPoint, keywords } = req.body;

    if (!bulletPoint) {
        return res.status(400).json({ error: 'Bullet point is required' });
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a professional resume writer. Rewrite the following resume bullet point to be more impactful, action-oriented, and include the provided keywords naturally if relevant. Do not lie or fabricate experience. The goal is to improve the ATS score.
          
          Keywords to target: ${keywords ? keywords.join(', ') : 'general improvement'}
          
          Return only the rewritten bullet point text.`
                },
                { role: "user", content: bulletPoint }
            ],
            model: "gpt-3.5-turbo",
        });

        const rewrittenText = completion.choices[0].message.content.trim();
        res.json({ rewrittenText });

    } catch (error) {
        console.error('Error rewriting bullet point:', error);
        res.status(500).json({ error: 'Failed to rewrite bullet point' });
    }
};

exports.generateCoverLetter = async (req, res) => {
    const { resumeData, jobDescription, tone } = req.body;

    if (!resumeData || !jobDescription) {
        return res.status(400).json({ error: 'Resume data and Job description are required' });
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are a professional career coach. Write a cover letter for the candidate based on their resume and the provided job description.
          
          Tone: ${tone || 'Professional'}
          
          Structure:
          1. Header (Placeholder for contact info)
          2. Salutation
          3. Introduction (Hook)
          4. Body Paragraphs (Match resume skills to JD requirements)
          5. Conclusion (Call to action)
          6. Sign-off`
                },
                {
                    role: "user",
                    content: `Resume Data: ${JSON.stringify(resumeData)}
            
            Job Description: ${jobDescription}`
                }
            ],
            model: "gpt-3.5-turbo",
        });

        const coverLetter = completion.choices[0].message.content.trim();
        res.json({ coverLetter });

    } catch (error) {
        console.error('Error generating cover letter:', error);
        res.status(500).json({ error: 'Failed to generate cover letter' });
    }
};
