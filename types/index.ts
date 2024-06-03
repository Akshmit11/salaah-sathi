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
  
  // update user params
  export type UpdateUserParams = {
      firstName: string;
      lastName: string;
      username: string;
      photo: string;
  }
  