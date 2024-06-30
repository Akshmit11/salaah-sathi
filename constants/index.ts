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

export const PostFormDefaultValues = {
  description: "",
  imageUrls: [],
};

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
};


export const adCarouselImageUrls = [
  "https://utfs.io/f/409a78bd-af17-4c58-b2bb-93543218f5fd-t4bwmb.jpeg",
  "https://utfs.io/f/db295597-f78c-4beb-a96c-5e74ef125ce5-t3s40y.jpeg",
  "https://utfs.io/f/5e9689c8-ccb0-4e43-b21f-e37557c17abd-gqyb8g.20.33.jpeg",
  "https://utfs.io/f/ea8a50f1-e0a2-44be-bc0c-b729224ef6ac-gqyb8g.20.32.jpeg"
]

export const adCarouselImagePublicUrls = [
  "1",
  "2",
  "3",
  "4"
]