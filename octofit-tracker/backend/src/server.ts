import express, { type ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import Activity from './models/Activity.js';
import Leaderboard from './models/Leaderboard.js';
import Team from './models/Team.js';
import User from './models/User.js';
import Workout from './models/Workout.js';
import { createResourceRouter } from './routes/resources.js';

const app = express();
const codespaceName = process.env.CODESPACE_NAME;
const frontendOrigin = process.env.FRONTEND_ORIGIN;

export const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
  ...(frontendOrigin ? [frontendOrigin] : []),
]);

app.use((request, response, next) => {
  const origin = request.get('origin');
  response.vary('Origin');
  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-backend' });
});
app.use('/api/users/', createResourceRouter(User));
app.use('/api/teams/', createResourceRouter(Team));
app.use('/api/activities/', createResourceRouter(Activity));
app.use('/api/leaderboard/', createResourceRouter(Leaderboard, { score: -1 }));
app.use('/api/workouts/', createResourceRouter(Workout));
app.use('/api', (_request, response) => {
  response.status(404).json({ error: 'API route not found' });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
    response.status(400).json({ error: 'Invalid request' });
    return;
  }

  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

export default app;
