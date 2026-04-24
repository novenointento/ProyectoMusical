import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import healthRoutes from './routes/healthRoutes';

dotenv.config();

export const app = express();
const port = Number(process.env.PORT ?? 3010);

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    name: 'project-template-api',
    message: 'Backend template is ready.',
    docs: {
      health: '/health',
      exampleTask: '/api/example-task',
    },
  });
});

app.use(healthRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Backend template listening on http://localhost:${port}`);
  });
}
