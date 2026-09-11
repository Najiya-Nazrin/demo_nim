import { Router } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Generate Marketing Campaign Copy
router.post('/generate', async (req, res) => {
  const { platform, product, tone } = req.body;
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const prompt = `Write a marketing post for ${platform} about ${product}. The tone should be ${tone || 'professional'}. Include relevant emojis.`;
    
    const result = await model.generateContent(prompt);
    
    res.json({ content: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate AI content' });
  }
});

export default router;
