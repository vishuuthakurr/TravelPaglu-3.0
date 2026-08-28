import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  homeCity?: string;
  interests?: string[];
  savedDestinations: mongoose.Types.ObjectId[] | string[];
  isVerified: boolean;
  otpCode?: string | null;
  otpExpiry?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    homeCity: { type: String, default: '' },
    interests: [{ type: String }],
    savedDestinations: [{ type: Schema.Types.ObjectId, ref: 'Destination' }],
    isVerified: { type: Boolean, default: false },
    otpCode: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
