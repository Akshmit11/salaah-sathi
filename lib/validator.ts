import * as z from "zod";

export const categoryEnum = [
  "Education",
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
  "Other"
] as const;

export const problemFormSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  description: z.string().min(2, { message: "Description is required" }),
  category: z.enum(categoryEnum, {
    errorMap: () => ({ message: "Invalid category" }),
  }),
});

export const commentFormSchema = z.object({
  comment: z.string().min(3, { message: "Comment is required" })
})