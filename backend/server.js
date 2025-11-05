// backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pool from './db.js';

//  Import all route modules
import authRoutes from './routes/authRoutes.js';
import donorRoutes from './routes/donorRoutes.js';
import recipientRoutes from './routes/recipientRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

//  Enable CORS
app.use(
  cors({
    origin: '*', // you can change this to your frontend URL later
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

//  Parse JSON & URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Debug logs
console.log(' Admin Key Loaded:', process.env.ADMIN_KEY || '(not found)');
console.log(' Database Pool Connected:', !!pool);

//  Root route
app.get('/', (req, res) => {
  res.json({ message: ' Food Donation Tracker API is running ' });
});

//  Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/donor', donorRoutes);
app.use('/api/recipient', recipientRoutes);
app.use('/api/admin', adminRoutes);

//  404 fallback route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

//  Global error handler
app.use((err, req, res, next) => {
  console.error(' Server Error:', err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

//  Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` API running on http://localhost:${PORT}`));
