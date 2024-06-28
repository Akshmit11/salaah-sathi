import { Schema } from "mongoose";

// create user params
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// update user params
export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// create problem params
export type CreateProblemParams = {
  problem: {
    title: string;
    category:
      | "Agriculture"
      | "Astrology"
      | "Automotive"
      | "Career"
      | "Consumer Rights"
      | "Education"
      | "Environment"
      | "Finance"
      | "Food & Nutrition"
      | "Government Services"
      | "Health"
      | "Housing"
      | "Insurance"
      | "Legal"
      | "Marketing"
      | "Mental Health"
      | "Other"
      | "Personal Development"
      | "Personal Finance"
      | "Pets"
      | "Politics"
      | "Real Estate"
      | "Relationships"
      | "Retail"
      | "Science"
      | "Social Issues"
      | "Sports"
      | "Technology"
      | "Transportation"
      | "Travel & Tourism";
    imageUrls: string[] | undefined;
  };
  userId: string;
  path: string;
};

// create comment params
export type CreateCommentParams = {
  comment: string;
  problemId: string;
  userId: string;
  path: string;
};

// get all problems
export type GetAllProblemParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

// get amy problems
export type GetMyProblemParams = {
  userId: string;
  limit: number;
  page: number;
};

// get all saved problems
export type GetSavedProblemParams = {
  userId: string;
  limit: number;
  page: number;
};

// get all trending problems
export type GetTrendingProblemParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

// delete problem
export type DeleteProblemParams = {
  problemId: string;
  path: string;
};

// delete saved problem
export type deleteSavedProblemParams = {
  problemId: string;
  path: string;
  currentUserId?: string;
};

// update problem
export type UpdateProblemParams = {
  userId: string;
  problem: {
    _id: string;
    title: string;
    category: string;
    imageUrls: string[] | undefined;
  };
  path: string;
};


// create problem params
export type CreateExpertParams = {
  expert: {
    fullName: string;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    description: string;
    profilePhoto: string;
    category:
      | "Agriculture"
      | "Astrology"
      | "Automotive"
      | "Career"
      | "Consumer Rights"
      | "Education"
      | "Environment"
      | "Finance"
      | "Food & Nutrition"
      | "Government Services"
      | "Health"
      | "Housing"
      | "Insurance"
      | "Legal"
      | "Marketing"
      | "Mental Health"
      | "Other"
      | "Personal Development"
      | "Personal Finance"
      | "Pets"
      | "Politics"
      | "Real Estate"
      | "Relationships"
      | "Retail"
      | "Science"
      | "Social Issues"
      | "Sports"
      | "Technology"
      | "Transportation"
      | "Travel & Tourism";
  };
  userId: string;
  path: string;
};

// get all experts
export type GetAllExpertParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

// update expert
export type UpdateExpertParams = {
  expert: {
    _id: string;
    fullName: string;
    phoneNumber: string;
    country: string;
    state: string;
    city: string;
    description: string;
    profilePhoto: string;
    category:
      | "Agriculture"
      | "Astrology"
      | "Automotive"
      | "Career"
      | "Consumer Rights"
      | "Education"
      | "Environment"
      | "Finance"
      | "Food & Nutrition"
      | "Government Services"
      | "Health"
      | "Housing"
      | "Insurance"
      | "Legal"
      | "Marketing"
      | "Mental Health"
      | "Other"
      | "Personal Development"
      | "Personal Finance"
      | "Pets"
      | "Politics"
      | "Real Estate"
      | "Relationships"
      | "Retail"
      | "Science"
      | "Social Issues"
      | "Sports"
      | "Technology"
      | "Transportation"
      | "Travel & Tourism";
  };
  userId: string;
  path: string;
};

export type NewComment = {
  text: string;
  user: Schema.Types.ObjectId;
  isExpert: boolean;
  expert?: Schema.Types.ObjectId;
}

// create post params
export type CreatePostParams = {
  post: {
    description: string;
    fileUrls: string[] | undefined;
  };
  userId: string;
  expertId: string;
  path: string;
};

// update post
export type UpdatePostParams = {
  userId: string;
  expertId: string;
  post: {
    _id: string;
    description: string;
    fileUrls: string[] | undefined;
  };
  path: string;
};

// delete post
export type DeletePostParams = {
  postId: string;
  path: string;
};

// get all posts
export type GetMyPostParams = {
  expertId: string;
  limit: number;
  page: number;
};

// get all problems
export type GetAllPostParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
};

// create payment
export type CreatePaymentParams = {
  userId: string;
  razorpayId: string;
  razorpaySubscriptionId: string;
}