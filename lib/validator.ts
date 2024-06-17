import * as z from "zod";

export const categoryEnum = [
  "Astrology",
  "Career",
  "Consumer Rights",
  "Education",
  "Environment",
  "Government Services",
  "Health",
  "Housing",
  "Legal",
  "Other",
  "Personal Development",
  "Personal Finance",
  "Politics",
  "Relationships",
  "Social Issues",
  "Sports",
  "Technology",
  "Transportation"
] as const;


export const problemFormSchema = z.object({
  title: z.string().min(3, { message: "Title is required" }),
  category: z.enum(categoryEnum, {
    errorMap: () => ({ message: "Invalid category" }),
  }),
  imageUrls: z.string().url().array().optional()
});

export const commentFormSchema = z.object({
  comment: z.string().min(3, { message: "Comment is required" })
})