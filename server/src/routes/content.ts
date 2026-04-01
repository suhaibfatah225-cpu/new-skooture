import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authMiddleware, AuthRequest } from '../middleware/auth';
import defaultContent from '../../default-content.json' with { type: 'json' };

const router = Router();

// Store connected SSE clients
const clients = new Set<Response>();

const notifyClients = () => {
  for (const client of clients) {
    client.write(`data: {"type":"content-updated"}\n\n`);
  }
};

// GET /api/content/stream - public SSE endpoint
router.get('/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    // CORS headers need to allow credentials and specific origin if needed, but the global CORS usually covers it
    // Some browsers strictly require Access-Control-Allow-Origin for SSE stream:
  });

  const sendPing = setInterval(() => {
    res.write(':\n\n');
  }, 15000);

  clients.add(res);

  req.on('close', () => {
    clearInterval(sendPing);
    clients.delete(res);
  });
});

// GET /api/content - public
router.get('/', async (_req, res) => {
  try {
    const rows = await prisma.content.findMany();

    if (rows.length === 0) {
      return res.json(defaultContent);
    }

    const content: Record<string, any> = {};
    for (const row of rows) {
      content[row.key] = JSON.parse(row.value);
    }

    res.json(content);
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/content - protected
router.put('/', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const body = req.body;

    if (!body || typeof body !== 'object') {
      return res.status(400).json({ error: 'Invalid content payload' });
    }

    const operations = Object.entries(body).map(([key, value]) =>
      prisma.content.upsert({
        where: { key },
        update: {
          value: JSON.stringify(value),
          updatedById: req.userId,
        },
        create: {
          key,
          value: JSON.stringify(value),
          updatedById: req.userId,
        },
      })
    );

    await prisma.$transaction(operations);

    // After successfully saving, notify all connected SSE clients
    notifyClients();

    res.json({ success: true, message: 'Content updated' });
  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/content/reset - protected
router.post('/reset', authMiddleware, async (_req: AuthRequest, res) => {
  try {
    await prisma.content.deleteMany();
    
    // Notify all connected SSE clients
    notifyClients();

    res.json({ success: true, message: 'Content reset to defaults' });
  } catch (error) {
    console.error('Reset content error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
