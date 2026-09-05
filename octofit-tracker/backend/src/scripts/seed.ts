import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'alex.rivera',
        email: 'alex.rivera@example.com',
        name: 'Alex Rivera',
        avatarUrl: 'https://i.pravatar.cc/150?img=12',
      },
      {
        username: 'jamie.chen',
        email: 'jamie.chen@example.com',
        name: 'Jamie Chen',
        avatarUrl: 'https://i.pravatar.cc/150?img=32',
      },
      {
        username: 'sam.taylor',
        email: 'sam.taylor@example.com',
        name: 'Sam Taylor',
        avatarUrl: 'https://i.pravatar.cc/150?img=49',
      },
    ]);

    await Team.create([
      {
        name: 'Summit Striders',
        description: 'A friendly team focused on consistent outdoor training.',
        members: [users[0]._id, users[1]._id],
      },
      {
        name: 'Core Crew',
        description: 'Short, focused sessions and steady progress.',
        members: [users[1]._id, users[2]._id],
      },
    ]);

    await Activity.create([
      { user: users[0]._id, type: 'Running', durationMinutes: 35, calories: 320, completedAt: new Date('2026-08-30') },
      { user: users[1]._id, type: 'Cycling', durationMinutes: 50, calories: 410, completedAt: new Date('2026-08-31') },
      { user: users[2]._id, type: 'Strength', durationMinutes: 30, calories: 210, completedAt: new Date('2026-09-01') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, points: 860, rank: 1 },
      { user: users[1]._id, points: 740, rank: 2 },
      { user: users[2]._id, points: 615, rank: 3 },
    ]);

    await Workout.create([
      {
        name: 'Morning Momentum',
        description: 'A balanced session to build an energized start.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: [
          { name: 'Bodyweight squat', sets: 3, repetitions: 12 },
          { name: 'Push-up', sets: 3, repetitions: 8 },
          { name: 'Plank', sets: 3, repetitions: 30 },
        ],
      },
      {
        name: 'Trail Builder',
        description: 'A stronger lower-body session for trail days.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: [
          { name: 'Reverse lunge', sets: 4, repetitions: 10 },
          { name: 'Step-up', sets: 3, repetitions: 12 },
          { name: 'Mountain climber', sets: 3, repetitions: 20 },
        ],
      },
    ]);

    console.log('Database seeding complete: 3 users, 2 teams, 3 activities, 3 leaderboard entries, 2 workouts');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
