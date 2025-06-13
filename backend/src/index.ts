import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import adminRoutes from './routes/adminRoutes';
import jobRoutes from './routes/jobRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/', (req, res) => {
  res.send('Job Board API is running...');
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});