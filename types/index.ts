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
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

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
      | "Astrology"
      | "Career"
      | "Consumer Rights"
      | "Education"
      | "Environment"
      | "Government Services"
      | "Health"
      | "Housing"
      | "Legal"
      | "Personal Development"
      | "Personal Finance"
      | "Politics"
      | "Relationships"
      | "Social Issues"
      | "Sports"
      | "Technology"
      | "Transportation"
      | "Other";
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
}

// get all problems
export type GetAllProblemParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
}

// get amy problems
export type GetMyProblemParams = {
  userId: string;
  limit: number;
  page: number;
}

// get all saved problems
export type GetSavedProblemParams = {
  userId: string;
  limit: number;
  page: number;
}

// get all trending problems
export type GetTrendingProblemParams = {
  query: string;
  category: string;
  limit: number;
  page: number;
}

// delete problem
export type DeleteProblemParams = {
  problemId: string;
  path: string;
}

// delete saved problem
export type deleteSavedProblemParams = {
  problemId: string;
  path: string;
  currentUserId?: string;
}

// update problem
export type UpdateProblemParams = {
  userId: string;
  problem: {
    _id: string;
    title: string;
    category: string;
    imageUrls: string[] | undefined
  };
  path: string;
}