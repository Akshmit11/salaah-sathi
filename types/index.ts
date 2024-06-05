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
    description: string;
    category:
      | "Education"
      | "Health"
      | "Career"
      | "Technology"
      | "Personal Finance"
      | "Legal"
      | "Housing"
      | "Transportation"
      | "Environment"
      | "Social Issues"
      | "Government Services"
      | "Consumer Rights"
      | "Relationships"
      | "Personal Development"
      | "Other";
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

