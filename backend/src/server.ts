import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { GoogleGenerativeAI } from '@google/generative-ai';

import leadsRouter from './routes/leads';
import ticketsRouter from './routes/tickets';
import campaignsRouter from './routes/campaigns';
import chatRouter from './routes/chat';
import propertiesRouter from './routes/properties';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Prisma Database Client
const prisma = new PrismaClient();

// Initialize Google Gemini Client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Middleware
app.use(cors());
app.use(express.json());

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Nim AI Backend is running!' });
});

// API Routes
app.use('/api/leads', leadsRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/properties', propertiesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
