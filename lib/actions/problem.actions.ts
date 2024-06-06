"use server";

import {
  CreateProblemParams,
  GetAllProblemParams,
  GetMyProblemParams,
  GetSavedProblemParams,
  GetTrendingProblemParams
} from "@/types";
import { revalidatePath } from "next/cache";
import Problem from "../database/models/problem.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

const populateProblem = async (query: any) => {
  return query.populate([
    {
      path: "user",
      model: User,
      select: "_id username",
    },
    {
      path: "comments.user",
      model: User,
      select: "_id username",
    },
  ]);
};

// create problem - C
export const createProblem = async ({
  problem,
  userId,
  path,
}: CreateProblemParams) => {
  try {
    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { $inc: { total_problems: 1 } },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found!");
    }

    const newProblem = await Problem.create({
      ...problem,
      user: user._id,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newProblem));
  } catch (error) {
    handleError(error);
  }
};

// read single problem
export const getProblemById = async (problemId: string) => {
  try {
    await connectToDatabase();

    const problem = await populateProblem(Problem.findById(problemId));

    if (!problem) {
      throw new Error("No Problem like this");
    }

    return JSON.parse(JSON.stringify(problem));
  } catch (error) {
    handleError(error);
  }
};

// read problem
export const getAllProblems = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllProblemParams) => {
  try {
    await connectToDatabase();

    const conditions = {};

    const problemsQuery = Problem.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit);

    const problems = await populateProblem(problemsQuery);
    const problemsCount = await Problem.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(problems)),
      totalPages: Math.ceil(problemsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// read problems of a particular user
export const getAllMyProblems = async ({
  userId,
  limit = 6,
  page,
}: GetMyProblemParams) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);

    if (!user) throw new Error("No User found");

    const conditions = { user: userId };

    const problemsQuery = Problem.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit);

    const problems = await populateProblem(problemsQuery);
    const problemsCount = await Problem.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(problems)),
      totalPages: Math.ceil(problemsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// read all saved problems
export const getAllSavedProblems = async ({
  userId,
  limit = 6,
  page,
}: GetSavedProblemParams) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) throw new Error("No User found");
    const savedProblemIds = user.saveProblems.map(
      (problem: any) => problem._id
    );

    const conditions = { _id: { $in: savedProblemIds } };

    const problemsQuery = Problem.find(conditions)
      .sort({ createdAt: "desc" })
      .skip((page - 1) * limit)
      .limit(limit);

    const problems = await populateProblem(problemsQuery);
    const problemsCount = savedProblemIds.length;

    return {
      data: JSON.parse(JSON.stringify(problems)),
      totalPages: Math.ceil(problemsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// read all trending problems
export const getAllTrendingProblems = async ({
  query,
  limit = 6,
  page,
  category,
}: GetTrendingProblemParams) => {
  try {
    await connectToDatabase();

    const conditions = {};

    const problemsQuery = Problem.find(conditions)
      .sort({ timesSaved: "desc" })
      .skip(0)
      .limit(limit);

    const problems = await populateProblem(problemsQuery);
    const problemsCount = await Problem.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(problems)),
      totalPages: Math.ceil(problemsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};
