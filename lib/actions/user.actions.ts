"use server";

import { CreateUserParams, UpdateUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";
import Problem from "../database/models/problem.model";
import { Types } from "mongoose";

// create user - C
export const createUser = async (user: CreateUserParams) => {
  try {
    await connectToDatabase();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

// get user by id - R
export const getUserById = async (userId: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

// update user - U
export const updateUser = async (clerkId: string, user: UpdateUserParams) => {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
};

// delete user - D
export const deleteUser = async (clerkId: string) => {
  try {
    await connectToDatabase();
    const userToDelete = await User.findOne({ clerkId });
    if (!userToDelete) {
      throw new Error("User not found");
    }

    // unlink all relationship or delete user information from other models if any
    await Promise.all([
      // Delete problems or comments uploaded by the user
      Problem.deleteMany({ user: userToDelete._id }),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
};

// save problem
export const saveProblem = async (problemId: string, userId: string) => {
  try {
    await connectToDatabase();
    
    const problem = await Problem.findByIdAndUpdate(
      problemId,
      { $inc: { timesSaved: 1 } },
      { new: true }
    );
    if (!problem) throw new Error("Problem does not exists");

    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { saveProblems: problemId } }, // $addToSet prevents duplicates
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }
    return JSON.parse(JSON.stringify(user));
    
  } catch (error) {
    handleError(error);
  }
};


// get if the problem is saved or not
export const getIsSavedProblem = async (problemId: string, userId: string) => {
  try {
    await connectToDatabase();

    const problem = await Problem.findById(problemId);
    if (!problem) throw new Error("Problem does not exists");

    const user: any = await User.findById(userId).lean();
    if (!user) {
      throw new Error("User not found");
    }
    const isSaved = user.saveProblems.some((savedProblemId: Types.ObjectId) => savedProblemId.equals(problemId));
    return isSaved;
  } catch (error) {
    handleError(error);
  }
};
