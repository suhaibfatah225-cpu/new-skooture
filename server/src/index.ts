import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/auth';
import contentRoutes from './routes/content';
import messagesRoutes from './routes/messages';

const app = express();
export const prisma = new PrismaClient();

// مهم جداً: Railway يمرر المنفذ عبر متغير بيئة
const PORT = process.env.PORT || 3001;

// CORS - إعدادات مرنة للموقع
app.use(cors({
  origin: true, // يسمح لجميع المصادر حالياً لحل مشكلة الـ CORS نهائياً
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));

// Health check - للتأكد أن السيرفر يعمل
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/messages', messagesRoutes);

// Error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// تعديل هام جداً لـ Railway: الاستماع على 0.0.0.0
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Server is ready and listening on port ${PORT}`);
});