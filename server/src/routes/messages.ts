import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

const messageSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
});

// GET /api/messages - protected
router.get('/', authMiddleware, async (_req: AuthRequest, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/messages - public (contact form)
router.post('/', async (req, res) => {
  try {
    const data = messageSchema.parse(req.body);

    const message = await prisma.message.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });

    res.status(201).json(message);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid input', details: error.errors });
    }
    console.error('Create message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/messages/:id - protected
router.delete('/:id', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    await prisma.message.delete({ where: { id } });

    res.json({ success: true, message: 'Message deleted' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/messages/:id/read - protected
router.patch('/:id/read', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const message = await prisma.message.update({
      where: { id },
      data: { read: true },
    });

    res.json(message);
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
