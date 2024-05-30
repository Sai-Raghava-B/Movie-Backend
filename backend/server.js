import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import cors from 'cors';

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
const corsOptions = {
    origin: 'https://movie-front-end-omega.vercel.app',
    // origin:'http://localhost:3000', // Your frontend's URL
    optionsSuccessStatus: 200, // For legacy browser support
  };
  
  // Use CORS middleware
  app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
