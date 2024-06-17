"use server";

import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';
import {
  CreateProblemParams,
  GetAllProblemParams,
  GetMyProblemParams,
  GetSavedProblemParams,
  GetTrendingProblemParams,
  DeleteProblemParams,
  deleteSavedProblemParams,
  UpdateProblemParams,
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

    
    const aiSolution = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: `Problem title: ${problem.title}, and problem category: ${problem.category}. Based on the given data generate a good and realistic and practical solution under 500 characters and reply in the language the user has inputted the problem. Offer concise and effective way to handle the problem. Your goal is to help users find the best possible resolution efficiently and empathetically.`,
    });

    const newProblem = await Problem.create({
      ...problem,
      aiSolution: aiSolution.text,
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

// read problem - r
export const getAllProblems = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllProblemParams) => {
  try {
    await connectToDatabase();

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};
    const categoryCondition = category ? { category: { $in: category } } : {}; // Use $in for filtering multiple categories
    const conditions = {
      $and: [titleCondition, categoryCondition],
    };

    const skipAmount = (Number(page) - 1) * limit

    const problemsQuery = Problem.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
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

// update problem
export const updateProblem = async ({
  userId,
  problem,
  path,
}: UpdateProblemParams) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not present");
    }

    const updatedProblem = await Problem.findByIdAndUpdate(
      problem._id,
      problem,
      { new: true }
    );

    if (!updatedProblem) {
      throw new Error("Problem not found");
    }
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedProblem));
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

    const skipAmount = (Number(page) - 1) * limit

    const problemsQuery = Problem.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
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

    const skipAmount = (Number(page) - 1) * limit

    const problemsQuery = Problem.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
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
    const skipAmount = (Number(page) - 1) * limit

    const problemsQuery = Problem.find(conditions)
      .sort({ timesSaved: "desc" })
      .skip(skipAmount)
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

// delete problem - d
export const deleteProblem = async ({
  problemId,
  path,
}: DeleteProblemParams) => {
  try {
    await connectToDatabase();

    const deleteProblem = await Problem.findByIdAndDelete(problemId);

    if (deleteProblem) {
      await User.updateMany(
        { saveProblems: problemId },
        { $pull: { saveProblems: problemId } }
      );
      await User.findByIdAndUpdate(deleteProblem.user, {
        $inc: { total_problems: -1 },
      });
      revalidatePath(path);
    }
  } catch (error) {
    handleError(error);
  }
};

// delete Save problem
export const deleteSavedProblem = async ({
  problemId,
  path,
  currentUserId,
}: deleteSavedProblemParams) => {
  try {
    await connectToDatabase();
    const problem = await Problem.findByIdAndUpdate(
      problemId,
      { $inc: { timesSaved: -1 } },
      { new: true }
    );
    if (!problem) throw new Error("Problem does not exists");

    const user = await User.findByIdAndUpdate(
      currentUserId,
      { $pull: { saveProblems: problemId } },
      { new: true }
    );
    if (!user) throw new Error("User does not exist");

    // Optionally revalidate the path if needed
    revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

export const getAllProblemsForSitemap = async () => {
  try {
    await connectToDatabase();

    const problemsQuery = Problem.find().sort({ createdAt: "desc" });
    const problems = await populateProblem(problemsQuery);

    return {
      data: JSON.parse(JSON.stringify(problems)),
    };
  } catch (error) {
    handleError(error);
  }
};