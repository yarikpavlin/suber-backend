import express from "express";
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
