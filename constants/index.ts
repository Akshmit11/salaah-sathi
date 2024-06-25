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
  },
  {
    label: "Experts",
    route: "/experts",
  },
];

export const categoryEnum = z.enum([
  "Agriculture",
  "Astrology",
  "Automotive",
  "Career",
  "Consumer Rights",
  "Education",
  "Environment",
  "Finance",
  "Food & Nutrition",
  "Government Services",
  "Health",
  "Housing",
  "Insurance",
  "Legal",
  "Marketing",
  "Mental Health",
  "Other",
  "Personal Development",
  "Personal Finance",
  "Pets",
  "Politics",
  "Real Estate",
  "Relationships",
  "Retail",
  "Science",
  "Social Issues",
  "Sports",
  "Technology",
  "Transportation",
  "Travel & Tourism",
]);
export type categoryEnum = z.infer<typeof categoryEnum>;

export const ProblemFormDefaultValues = {
  title: "",
  category: categoryEnum.Enum.Agriculture, // Must match one of the enum values
  imageUrls: [],
};

export const CommentFormDefaultValues = {
  comment: "",
};

export const ExpertFormDefaultValues = {
  fullName: "",
  phoneNumber: "",
  country: "",
  state: "",
  city: "",
  description: "",
  category: categoryEnum.Enum.Agriculture, // Must match one of the enum values
  profilePhoto: "",
};
