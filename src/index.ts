import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import { configureRoutes } from './routes/main_route';

const app = express();
const PORT = 2090;

app.use(cors());
app.use(express.json());

connectDB();
configureRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});