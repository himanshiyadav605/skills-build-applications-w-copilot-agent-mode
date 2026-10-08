import { connectDatabase } from './config/database.js';
import app from './server.js';

const port = Number(process.env.PORT || 8000);

try {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
} catch (error) {
  console.error('MongoDB connection failed:', error);
  process.exitCode = 1;
}
