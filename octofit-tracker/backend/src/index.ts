import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8000;
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());
app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-backend' });
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log('Connected to octofit_db');
    app.listen(port, () => {
      console.log(`OctoFit API listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
