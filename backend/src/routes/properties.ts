import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  try {
    const properties = await prisma.property.findMany();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

export default router;
