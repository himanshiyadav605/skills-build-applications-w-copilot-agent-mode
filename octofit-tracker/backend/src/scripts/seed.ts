import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase(): Promise<void> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const userSeeds = [
      { name: 'Alex Morgan', email: 'alex.morgan@example.com', bio: 'Runner training for a half marathon.' },
      { name: 'Jordan Lee', email: 'jordan.lee@example.com', bio: 'Cyclist who enjoys weekend rides.' },
      { name: 'Sam Rivera', email: 'sam.rivera@example.com', bio: 'Strength training and mobility fan.' },
    ];
    const users = await Promise.all(
      userSeeds.map(async (seed) => {
        const existingUser = await User.findOne({ email: seed.email });
        if (existingUser) {
          existingUser.set(seed);
          return existingUser.save();
        }
        return User.create(seed);
      }),
    );
    const [alex, jordan, sam] = users;
    const teamSeeds = [
      { name: 'Trail Blazers', description: 'A team for runners and outdoor explorers.', members: [alex._id, jordan._id] },
      { name: 'Power Pioneers', description: 'A team focused on strength and consistency.', members: [sam._id, alex._id] },
    ];
    const teams = await Promise.all(
      teamSeeds.map(async (seed) => {
        const existingTeam = await Team.findOne({ name: seed.name });
        if (existingTeam) {
          existingTeam.set(seed);
          return existingTeam.save();
        }
        return Team.create(seed);
      }),
    );
    const [trailBlazers, powerPioneers] = teams;

    const activitySeeds = [
      { user: alex._id, activityType: 'run' as const, durationMinutes: 32, distanceKm: 5.2, completedAt: new Date('2026-10-05T07:30:00.000Z') },
      { user: alex._id, activityType: 'strength' as const, durationMinutes: 45, distanceKm: 0, completedAt: new Date('2026-10-06T17:00:00.000Z') },
      { user: jordan._id, activityType: 'cycle' as const, durationMinutes: 55, distanceKm: 18.4, completedAt: new Date('2026-10-06T08:15:00.000Z') },
      { user: jordan._id, activityType: 'walk' as const, durationMinutes: 28, distanceKm: 2.1, completedAt: new Date('2026-10-07T12:00:00.000Z') },
      { user: sam._id, activityType: 'strength' as const, durationMinutes: 50, distanceKm: 0, completedAt: new Date('2026-10-07T18:30:00.000Z') },
    ];
    await Promise.all(
      activitySeeds.map(async (seed) => {
        const { user, activityType, completedAt, ...values } = seed;
        const existingActivity = await Activity.findOne({ user, activityType, completedAt });
        if (existingActivity) {
          existingActivity.set(values);
          return existingActivity.save();
        }
        return Activity.create(seed);
      }),
    );

    const leaderboardSeeds = [
      { user: alex._id, team: trailBlazers._id, score: 145, period: 'weekly' as const },
      { user: jordan._id, team: trailBlazers._id, score: 120, period: 'weekly' as const },
      { user: sam._id, team: powerPioneers._id, score: 105, period: 'weekly' as const },
    ];
    await Promise.all(
      leaderboardSeeds.map(async (seed) => {
        const existingEntry = await Leaderboard.findOne({ user: seed.user, period: seed.period });
        if (existingEntry) {
          existingEntry.set(seed);
          return existingEntry.save();
        }
        return Leaderboard.create(seed);
      }),
    );

    const workoutSeeds = [
      {
        title: 'Beginner Endurance Run',
        description: 'A steady session to build aerobic fitness.',
        difficulty: 'beginner' as const,
        durationMinutes: 30,
        exercises: ['5-minute warm-up walk', '20-minute easy run', '5-minute cool-down'],
      },
      {
        title: 'Full Body Strength',
        description: 'A balanced strength session using bodyweight movements.',
        difficulty: 'intermediate' as const,
        durationMinutes: 40,
        exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
      },
      {
        title: 'Cycling Interval Ride',
        description: 'Short cycling intervals to improve speed and stamina.',
        difficulty: 'advanced' as const,
        durationMinutes: 45,
        exercises: ['10-minute easy ride', '6 x 2-minute fast intervals', '10-minute cool-down'],
      },
    ];
    await Promise.all(
      workoutSeeds.map(async (seed) => {
        const existingWorkout = await Workout.findOne({ title: seed.title });
        if (existingWorkout) {
          existingWorkout.set(seed);
          return existingWorkout.save();
        }
        return Workout.create(seed);
      }),
    );

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
}

seedDatabase();
