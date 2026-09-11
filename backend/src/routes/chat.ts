import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();
const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

router.post('/', async (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Basic RAG: Fetch all properties to give context to the AI
    const properties = await prisma.property.findMany();
    const propertyContext = properties.map(p => `- ${p.title} in ${p.location} for $${p.price}`).join('\n');

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const prompt = `You are a helpful customer support AI for a real estate company called Nim. 
Answer the user's question based ONLY on the following available properties:
${propertyContext}

If the user asks something unrelated to these properties, politely redirect them.

User: ${message}
AI Assistant:`;
    
    const result = await model.generateContent(prompt);
    
    res.json({ reply: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate AI content' });
  }
});

export default router;
