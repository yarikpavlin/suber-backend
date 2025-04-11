import express from "express";
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
const app = express();
const PORT = 3030;

app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
