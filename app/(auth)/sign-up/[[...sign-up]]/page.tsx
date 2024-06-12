import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account to join our community and start contributing. Sign up to post problems, offer solutions, and help others.',
}

export default function Page() {
  return <SignUp />;
}