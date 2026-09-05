import express from 'express';
import './config/database.js';
import { apiBaseUrl } from './config/api.js';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';
import { createResourceRouter } from './routes/resources.js';

const app = express();
const port = 8000;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/users', createResourceRouter(User));
app.use('/api/teams', createResourceRouter(Team));
app.use('/api/activities', createResourceRouter(Activity));
app.use('/api/leaderboard', createResourceRouter(Leaderboard));
app.use('/api/workouts', createResourceRouter(Workout));

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(400).json({ error: 'Request could not be processed' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`OctoFit API URL: ${apiBaseUrl}`);
});