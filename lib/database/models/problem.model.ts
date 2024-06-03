import { Document, Schema, model, models } from "mongoose";

export interface IComment extends Document {
  _id: string;
  text: string;
  user: { _id: string; username: string };
  createdAt: Date;
}

const CommentSchema: Schema<IComment> = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface IProblem extends Document {
  _id: string;
  title: string;
  description?: string;
  category:
    | "Education"
    | "Health"
    | "Career"
    | "Technology"
    | "Personal Finance"
    | "Legal"
    | "Housing"
    | "Transportation"
    | "Environment"
    | "Social Issues"
    | "Government Services"
    | "Consumer Rights"
    | "Relationships"
    | "Personal Development"
    | "Other";
  user: { _id: string; username: string };
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const ProblemSchema: Schema<IProblem> = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: [
      "Education",
      "Health",
      "Career",
      "Technology",
      "Personal Finance",
      "Legal",
      "Housing",
      "Transportation",
      "Environment",
      "Social Issues",
      "Government Services",
      "Consumer Rights",
      "Relationships",
      "Personal Development",
      "Other",
    ],
  },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: { type: [CommentSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Problem = models.Problem || model("Problem", ProblemSchema);

export default Problem;
