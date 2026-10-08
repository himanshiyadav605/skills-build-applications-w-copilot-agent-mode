import { model, Schema, type InferSchemaType } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, min: 1, required: true },
    exercises: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;

export default model('Workout', workoutSchema);
