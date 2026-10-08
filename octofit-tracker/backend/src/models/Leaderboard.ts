import { model, Schema, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, min: 0, required: true },
    period: {
      type: String,
      enum: ['weekly', 'monthly', 'all-time'],
      default: 'weekly',
      required: true,
    },
  },
  { timestamps: true },
);

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>;

export default model('Leaderboard', leaderboardSchema);
