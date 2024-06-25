"use server";

import { CreateExpertParams, GetAllExpertParams, UpdateExpertParams } from "@/types";
import { connectToDatabase } from "../database/mongoose";
import { revalidatePath } from "next/cache";
import Expert from "../database/models/expert.model";
import { handleError } from "../utils";
import User from "../database/models/user.model";

const populateExpert = async (query: any) => {
  return query.populate([
    {
      path: "user",
      model: User,
      select: "_id username",
    },
  ]);
};

// create expert - C
export const createExpert = async ({
  expert,
  userId,
  path,
}: CreateExpertParams) => {
  try {
    await connectToDatabase();

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      { $set: { isExpert: true } },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found!");
    }

    const newExpert = await Expert.create({
      ...expert,
      user: user._id,
    });
    revalidatePath(path);

    return JSON.parse(JSON.stringify(newExpert));
  } catch (error) {
    handleError(error);
  }
};

// read single expert
export const getExpertById = async (expertId: string) => {
  try {
    await connectToDatabase();

    const expert = await populateExpert(Expert.findById(expertId));

    if (!expert) {
      throw new Error("No Expert like this");
    }

    return JSON.parse(JSON.stringify(expert));
  } catch (error) {
    handleError(error);
  }
};

// read all experts - r
export const getAllExperts = async ({
  query,
  limit = 6,
  page,
  category,
}: GetAllExpertParams) => {
  try {
    await connectToDatabase();

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};
    const categoryCondition = category ? { category: { $in: category } } : {}; // Use $in for filtering multiple categories
    const conditions = {
      $and: [titleCondition, categoryCondition],
    };

    const skipAmount = (Number(page) - 1) * limit

    const expertsQuery = Expert.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const experts = await populateExpert(expertsQuery);
    const expertsCount = await Expert.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(experts)),
      totalPages: Math.ceil(expertsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// update problem
export const updateExpert = async ({
  expert,
  userId,
  path,
}: UpdateExpertParams) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not present");
    }

    const updatedExpert = await Expert.findByIdAndUpdate(
      expert._id,
      expert,
      { new: true }
    );

    if (!updatedExpert) {
      throw new Error("Expert not found");
    }
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedExpert));
  } catch (error) {
    handleError(error);
  }
};


