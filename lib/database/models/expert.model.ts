import { Document, Schema, model, models } from "mongoose";

export interface IUserContacted extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
}

const UserContactedSchema: Schema<IUserContacted> = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export interface IExpert extends Document {
  _id: string;
  fullName: string;
  user: { _id: string; username: string };
  ratings: number;
  numberOfRatings: number;
  description: string;
  category: string;
  phoneNumber: string;
  profilePhoto: string;
  numberOfProblemsCommented: number;
  totalPosts: number;
  userContacted: IUserContacted[];
  country: string;
  state: string;
  city: string;
  createdAt: Date;
  updatedAt: Date;
}

const ExpertSchema: Schema<IExpert> = new Schema({
  fullName: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  profilePhoto: { type: String, required: true },
  ratings: { type: Number, default: 5 },
  numberOfRatings: { type: Number, default: 0 },
  numberOfProblemsCommented: { type: Number, default: 0 },
  totalPosts: { type: Number, default: 0 },
  userContacted: { type: [UserContactedSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Expert = models.Expert || model("Expert", ExpertSchema);

export default Expert;
