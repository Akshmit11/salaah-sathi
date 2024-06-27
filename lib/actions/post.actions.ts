"use server";

import { CreatePostParams, UpdatePostParams } from "@/types";
import Expert from "../database/models/expert.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import Post from "../database/models/post.model";
import { revalidatePath } from "next/cache";
import { handleError } from "../utils";

const populatePost = async (query: any) => {
  return query.populate([
    {
      path: "user",
      model: User,
      select: "_id username",
    },
    {
      path: "expert",
      model: Expert,
      select: "_id fullName category",
    },
  ]);
};

// create problem - C
export const createPost = async ({
  post,
  expertId,
  userId,
  path,
}: CreatePostParams) => {
  try {
    await connectToDatabase();

    const expert = await Expert.findOneAndUpdate(
      { _id: expertId },
      { $inc: { totalPosts: 1 } },
      { new: true }
    );

    if (!expert) {
      throw new Error("Expert not found!");
    }

    const newPost = await Post.create({
      ...post,
      expert: expert._id,
      user: userId
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newPost));
  } catch (error) {
    handleError(error);
  }
};

// read single problem
export const getPostById = async (postId: string) => {
  try {
    await connectToDatabase();

    const post = await populatePost(Post.findById(postId));

    if (!post) {
      throw new Error("No post like this");
    }

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    handleError(error);
  }
};

// read problem - r
// export const getAllProblems = async ({
//   query,
//   limit = 6,
//   page,
//   category,
// }: GetAllProblemParams) => {
//   try {
//     await connectToDatabase();

//     const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {};
//     const categoryCondition = category ? { category: { $in: category } } : {}; // Use $in for filtering multiple categories
//     const conditions = {
//       $and: [titleCondition, categoryCondition],
//     };

//     const skipAmount = (Number(page) - 1) * limit

//     const problemsQuery = Problem.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const problems = await populateProblem(problemsQuery);
//     const problemsCount = await Problem.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(problems)),
//       totalPages: Math.ceil(problemsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// };

// read problems of a particular user
// export const getAllMyProblems = async ({
//   userId,
//   limit = 6,
//   page,
// }: GetMyProblemParams) => {
//   try {
//     await connectToDatabase();
//     const user = await User.findById(userId);

//     if (!user) throw new Error("No User found");

//     const conditions = { user: userId };

//     const skipAmount = (Number(page) - 1) * limit

//     const problemsQuery = Problem.find(conditions)
//       .sort({ createdAt: "desc" })
//       .skip(skipAmount)
//       .limit(limit);

//     const problems = await populateProblem(problemsQuery);
//     const problemsCount = await Problem.countDocuments(conditions);

//     return {
//       data: JSON.parse(JSON.stringify(problems)),
//       totalPages: Math.ceil(problemsCount / limit),
//     };
//   } catch (error) {
//     handleError(error);
//   }
// };

// update post
export const updatePost = async ({
  userId,
  expertId,
  post,
  path,
}: UpdatePostParams) => {
  try {
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not present");
    }

    const expert = await Expert.findById(expertId);
    if (!expert) {
      throw new Error("Expert not present");
    }

    const updatedPost = await Post.findByIdAndUpdate(
      post._id,
      post,
      { new: true }
    );

    if (!updatedPost) {
      throw new Error("Post not found");
    }
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedPost));
  } catch (error) {
    handleError(error);
  }
};

// delete problem - d
// export const deleteProblem = async ({
//   problemId,
//   path,
// }: DeleteProblemParams) => {
//   try {
//     await connectToDatabase();

//     const deleteProblem = await Problem.findByIdAndDelete(problemId);

//     if (deleteProblem) {
//       await User.updateMany(
//         { saveProblems: problemId },
//         { $pull: { saveProblems: problemId } }
//       );
//       await User.findByIdAndUpdate(deleteProblem.user, {
//         $inc: { total_problems: -1 },
//       });
//       revalidatePath(path);
//     }
//   } catch (error) {
//     handleError(error);
//   }
// };



