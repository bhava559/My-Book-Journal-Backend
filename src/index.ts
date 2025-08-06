import express from 'express';
import cors from 'cors';
import { connectDB } from './db';
import { configureRoutes } from './routes/main_route';
import { port } from './config/myconfig';


const app = express();

app.use(cors());//TODO: Remove this.
app.use(express.json());

connectDB();
configureRoutes(app);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});