import cors from "cors";
import express from "express";
import userRoutes from './routes/users';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
