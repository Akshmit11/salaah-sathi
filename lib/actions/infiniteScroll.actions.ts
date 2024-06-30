"use server";

import { FetchAllMyProblemParams, FetchAllPostParams, FetchAllProblemParams, FetchMyPostParams } from "@/types";
import { handleError } from "../utils";
import { getAllMyProblems, getAllProblems, getAllSavedProblems, getAllTrendingProblems } from "./problem.actions";
import { getAllMyPosts, getAllPosts } from "./post.actions";

// get all problems
export const fetchAllProblem = async ({
  query = "",
  limit = 6,
  page = 1,
  category = "",
}: FetchAllProblemParams) => {
  try {
    const problems = await getAllProblems({ query, limit, page, category });

    return problems?.data;
  } catch (error) {
    handleError(error);
  }
};

// get all my problems
export const fetchAllMyProblem = async ({
  userId,
  limit = 6,
  page = 1,
}: FetchAllMyProblemParams) => {
  try {
    const problems = await getAllMyProblems({ userId, limit, page });

    return problems?.data;
  } catch (error) {
    handleError(error);
  }
};

// get All trending problems
export const fetchAllTrendingProblem = async () => {
  try {
    const problems = await getAllTrendingProblems({});

    return problems?.data;
  } catch (error) {
    handleError(error);
  }
};

// get All saved problems
export const fetchAllSavedProblem = async ({userId}: {userId: string}) => {
  try {
    const problems = await getAllSavedProblems({ userId });

    return problems?.data;
  } catch (error) {
    handleError(error);
  }
};

// get all post - r
export const fetchAllPosts = async ({
  query = "",
  limit = 6,
  page = 1,
  category = "",
}: FetchAllPostParams) => {
  try {
    const posts = await getAllPosts({ query, limit, page, category });

    return posts?.data;
  } catch (error) {
    handleError(error);
  }
};

// read posts of a particular user
export const fetchAllMyPosts = async ({
  expertId,
}: FetchMyPostParams) => {
  try {

    const posts = await getAllMyPosts({ expertId });

    return posts?.data;

  } catch (error) {
    handleError(error);
  }
};