import { z } from "zod";

export const headerLinks = [
    {
      label: "Trending",
      route: "/trending",
    },
    {
      label: "Past Problems",
      route: "/past-problems",
    },
    {
      label: "Saved Problems",
      route: "/save-problems",
    }
  ];

export const categoryEnum = z.enum(["Education",
"Health",
"Career",
"Technology",
"Personal Finance",
"Legal",
"Housing",
"Transportation",
"Environment",
"Social Issues",
"Government Services",
"Consumer Rights",
"Relationships",
"Personal Development",
"Other"]);
export type categoryEnum = z.infer<typeof categoryEnum>;


export const ProblemFormDefaultValues = {
  title: "",
  category: categoryEnum.Enum.Education, // Must match one of the enum values
  description: "",
};

export const CommentFormDefaultValues = {
  comment: ""
}