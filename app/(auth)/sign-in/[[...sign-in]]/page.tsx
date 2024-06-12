import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your account to access all features and connect with the community. Use your credentials to log in and start solving problems.',
}

export default function Page() {
  return <SignIn />;
}