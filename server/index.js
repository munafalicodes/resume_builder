const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const aiController = require('./controllers/aiController');
const pdfController = require('./controllers/pdfController');
const paymentController = require('./controllers/paymentController');
const resumeController = require('./controllers/resumeController');
const resumeParserController = require('./controllers/resumeParserController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Routes
app.get('/', (req, res) => {
    res.send('CareerForge Pro API Running');
});

// Resume CRUD Routes
app.post('/api/resumes', resumeController.saveResume);
app.get('/api/resumes', resumeController.getResumes);
app.get('/api/resumes/:id', resumeController.getResume);
app.delete('/api/resumes/:id', resumeController.deleteResume);

// AI Routes
app.post('/api/ai/analyze', aiController.analyzeJobDescription);
app.post('/api/ai/rewrite', aiController.rewriteBulletPoint);
app.post('/api/ai/cover-letter', aiController.generateCoverLetter);

// PDF Routes
app.post('/api/pdf/generate', pdfController.generatePDF);

// Resume Parsing Routes
app.post('/api/resume/parse', upload.single('resume'), resumeParserController.parseResume);

// Payment Routes
app.post('/api/payment/create-checkout-session', paymentController.createCheckoutSession);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
