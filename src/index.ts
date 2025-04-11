import express, { RequestHandler } from "express";
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import dotenv from 'dotenv';
import { apiKey } from "./midleware/auth";
import { connectToDatabase } from "./db/mongoose";

dotenv.config();
connectToDatabase();

const app = express();

app.use(express.json());
app.use(apiKey as RequestHandler);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
