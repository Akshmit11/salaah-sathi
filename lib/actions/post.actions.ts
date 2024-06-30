"use server";

import { CreatePostParams, DeletePostParams, GetAllPostParams, GetMyPostParams, UpdatePostParams } from "@/types";
import Expert from "../database/models/expert.model";
import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import Post from "../database/models/post.model";
import { revalidatePath } from "next/cache";
import { handleError } from "../utils";
import PostId from "@/app/(root)/experts/posts/[id]/page";

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
      select: "_id fullName category profilePhoto",
    },
  ]);
};

// create post - C
export const createPost = async ({
  post,
  expertId,
  userId,
  path,
}: CreatePostParams) => {
  try {
    await connectToDatabase();

    const expert = await Expert.findByIdAndUpdate(
      expertId,
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

// read single post
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

// read post - r
export const getAllPosts = async ({
  query = "",
  limit = 6,
  page = 1,
  category = "",
}: GetAllPostParams) => {
  try {
    await connectToDatabase();

    const descriptionCondition = query ? { description: { $regex: query, $options: 'i' } } : {};
    const categoryCondition = category ? { 'expert.category': { $in: Array.isArray(category) ? category : [category] } } : {}; // Ensure category is an array
    const conditions = {
      $and: [descriptionCondition, categoryCondition],
    };


    const skipAmount = (Number(page) - 1) * limit

    const postsQuery = Post.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const posts = await populatePost(postsQuery);
    const postsCount = await Post.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(posts)),
      totalPages: Math.ceil(postsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

// read posts of a particular user
export const getAllMyPosts = async ({
  expertId,
  limit = 6,
  page = 1,
}: GetMyPostParams) => {
  try {
    await connectToDatabase();
    const expert = await Expert.findById(expertId);

    if (!expert) throw new Error("No Expert found");

    const conditions = { expert: expertId };

    const skipAmount = (Number(page) - 1) * limit

    const postsQuery = Post.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const posts = await populatePost(postsQuery);
    const postsCount = await Post.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(posts)),
      totalPages: Math.ceil(postsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
};

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

// delete post - d
export const deletePost = async ({
  postId,
  path,
}: DeletePostParams) => {
  try {
    await connectToDatabase();

    const deletePost = await Post.findByIdAndDelete(postId);

    if (deletePost) {
      await Expert.findByIdAndUpdate(deletePost.expert, {
        $inc: { totalPosts: -1 },
      });
      revalidatePath(path);
    }
  } catch (error) {
    handleError(error);
  }
};



