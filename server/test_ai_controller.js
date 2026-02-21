require('dotenv').config();
try {
    const ai = require('./controllers/aiController');
    console.log('AI Controller loaded successfully:', ai);
} catch (error) {
    console.error('Failed to load AI Controller:', error);
}
