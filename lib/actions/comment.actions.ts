"use server";

import { CreateCommentParams } from "@/types";
import { connectToDatabase } from "../database/mongoose";
import Problem from "../database/models/problem.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";



// create comment - c
export const createComment = async ({
  comment,
  problemId,
  userId,
  path,
}: CreateCommentParams) => {
  try {
    await connectToDatabase();

    const problem = await Problem.findById(problemId);

    if (!problem) {
      throw new Error("Problem not found!");
    }

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found!");
    }

    const newComment = {
      text: comment,
      user: user._id,
    };

    // Add the new comment to the problem's comments array
    const updatedProblem = await Problem.findByIdAndUpdate(
      problemId,
      { $push: { comments: newComment } },
      { new: true } // Return the updated document
    ).populate("comments.user", "username"); // Populate the username field in comments

    return JSON.parse(JSON.stringify(updatedProblem));
  } catch (error) {
    handleError(error);
  }
};
