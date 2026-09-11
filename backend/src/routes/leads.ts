import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = Router();
const prisma = new PrismaClient();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Fetch all leads
router.get('/', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({ include: { property: true } });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads' });
  }
});

// Trigger AI analysis for a lead
router.post('/:id/analyze', async (req, res) => {
  const { id } = req.params;
  
  try {
    const lead = await prisma.lead.findUnique({ where: { id }, include: { property: true } });
    if (!lead) return res.status(404).json({ error: 'Lead not found' });

    const model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
    const prompt = `Write a short, friendly WhatsApp message to lead ${lead.name} who is interested in ${lead.property?.title || 'a property'}.`;
    
    const result = await model.generateContent(prompt);
    
    res.json({ 
      draft: result.response.text(), 
      qualification: `AI Qualified: Score ${lead.score}/100. Sourced from ${lead.source}.` 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate AI content' });
  }
});

export default router;
