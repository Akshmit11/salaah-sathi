"use server";

import { CreateProblemParams, GetAllProblemParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database/mongoose";
import User from "../database/models/user.model";
import Problem from "../database/models/problem.model";
import { revalidatePath } from "next/cache";

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

    const user = await User.findOne({ clerkId: userId });

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
export const getAllProblems = async ({ query, limit = 6, page, category }: GetAllProblemParams) => {
  try {
    await connectToDatabase();

    const conditions = {};

    const problemsQuery = Problem.find(conditions)
      .sort({ createdAt: "desc"})
      .skip(0)
      .limit(limit);

    const problems = await populateProblem(problemsQuery)
    const problemsCount = await Problem.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(problems)),
      totalPages: Math.ceil(problemsCount / limit)
    }
  } catch (error) {
    handleError(error);
  }
};