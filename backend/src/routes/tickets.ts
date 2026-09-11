import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();
const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Fetch all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await prisma.ticket.findMany();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
});

// Trigger AI draft for ticket reply
router.post('/:id/draft-reply', async (req, res) => {
  const { id } = req.params;
  
  try {
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const prompt = `Write a professional customer support email reply to ${ticket.customer} regarding their issue: "${ticket.subject}". Description: "${ticket.description}". Be helpful and empathetic.`;
    
    const result = await model.generateContent(prompt);
    
    res.json({ draft: result.response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate AI content' });
  }
});

export default router;
