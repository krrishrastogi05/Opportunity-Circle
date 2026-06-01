import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  googleRefreshToken?: string;
  branch?: string;
  graduationYear?: number;
  gender?: string;
  profileCompleted: boolean;
  alertsEnabled: boolean;
  digestEnabled: boolean;
  savedOpportunities: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    emailVerified: Date,
    image: String,
    googleRefreshToken: String,
    branch: String,
    graduationYear: Number,
    gender: String,
    profileCompleted: { type: Boolean, default: false },
    alertsEnabled: { type: Boolean, default: true },
    digestEnabled: { type: Boolean, default: true },
    savedOpportunities: [{ type: Schema.Types.ObjectId, ref: "Opportunity" }],
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
