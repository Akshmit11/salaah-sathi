import * as z from "zod";

export const categoryEnum = [
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
  "Other",
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


export const expertFormSchema = z.object({
  fullName: z.string().min(3, { message: "Full Name is required" }),
  phoneNumber: z.string().length(10, { message: "Phone Number is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  state: z.string().min(2, { message: "State is required" }),
  city: z.string().min(2, { message: "City is required" }),
  description: z.string().min(40, { message: "Description is required" }),
  category: z.enum(categoryEnum, {
    errorMap: () => ({ message: "Invalid category" }),
  }),
  profilePhoto: z.string().url({ message: "Profile Photo is required" })
});

export const postFormSchema = z.object({
  description: z.string().min(3, { message: "Description is required" }),
  imageUrls: z.string().url().array().optional(),
  videoUrls: z.string().url().array().optional()
});