"use server";

import { CreateCommentParams, NewComment } from "@/types";
import { connectToDatabase } from "../database/mongoose";
import Problem from "../database/models/problem.model";
import User from "../database/models/user.model";
import { handleError } from "../utils";
import Expert from "../database/models/expert.model";
import Lottery from "../database/models/lottery.model";

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
    
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { $inc: { total_comments: 1 } },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found!");
    }

    let newComment: NewComment = {
      text: comment,
      user: user._id,
      isExpert: user.isExpert
    };

    if (user.isExpert) {
      const expertUser = await Expert.findOne({ user: user._id });
      if (!expertUser) {
        throw new Error("Expert not found!");
      }
      newComment = {
        ...newComment,
        expert: expertUser._id
      };
    }

    const update: any = {
      $push: { comments: newComment },
    };
    
    // adding lottery logic
    if (user.isExpert) {
      update.$inc = { expertComments: 1 };
      
      // Lottery logic
      const currentDate = new Date();
      const problemCreationDate = new Date(problem.createdAt);

      // Check if the problem was created today
      const isToday = currentDate.toDateString() === problemCreationDate.toDateString();

      // Update the lottery if the problem was created today and the comment is from an expert
      if (isToday) {
        const lottery = await Lottery.findOne({ date: currentDate.toDateString() });
        if (lottery) {
          // Add user to eligible users if not already added
          if (!lottery.eligibleUsers.includes(problem.user._id)) {
            lottery.eligibleUsers.push(problem.user._id);
          }
          lottery.todayPrizeMoney += 1; // Increment the prize money
        } else {
          // Create a new lottery document if it doesn't exist for today
          await Lottery.create({
            date: currentDate.toDateString(),
            eligibleUsers: [problem.user._id],
            todayPrizeMoney: 1,
            totalPrizeDistributed: 0,
            pastWinners: []
          });
        }
      }
    }

    // Add the new comment to the problem's comments array
    const updatedProblem = await Problem.findByIdAndUpdate(
      problemId,
      update,
      { new: true } // Return the updated document
    ).populate("comments.user", "username") // Populate the username field in comments
      .populate("comments.expert", "fullName _id"); // Populate the fullName field in comments for experts

    return JSON.parse(JSON.stringify(updatedProblem));
  } catch (error) {
    handleError(error);
  }
};