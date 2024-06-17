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
];

export const categoryEnum = z.enum([
  "Astrology",
  "Career",
  "Consumer Rights",
  "Education",
  "Environment",
  "Government Services",
  "Health",
  "Housing",
  "Legal",
  "Personal Development",
  "Personal Finance",
  "Politics",
  "Relationships",
  "Social Issues",
  "Sports",
  "Technology",
  "Transportation",
  "Other",
]);
export type categoryEnum = z.infer<typeof categoryEnum>;

export const ProblemFormDefaultValues = {
  title: "",
  category: categoryEnum.Enum.Astrology, // Must match one of the enum values
  imageUrls: []
};

export const CommentFormDefaultValues = {
  comment: "",
};
