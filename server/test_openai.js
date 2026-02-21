const OpenAI = require('openai');
console.log('Type of OpenAI:', typeof OpenAI);
console.log('OpenAI content:', OpenAI);

try {
    const openai = new OpenAI({ apiKey: 'test' });
    console.log('Successfully instantiated OpenAI');
} catch (error) {
    console.error('Error instantiating OpenAI:', error.message);
}
