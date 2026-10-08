import { model, Schema, type InferSchemaType } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    bio: { type: String, trim: true, default: '' },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof userSchema>;

export default model('User', userSchema);
