import ProblemForm from "@/components/shared/ProblemForm";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: 'Upload Problem',
  description: 'Share your problems with our community and get practical solutions and advice. Post your issues and receive support from others.',
}


const ProblemUpload = async () => {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");

  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">Upload Problem</h1>
      </section>
      <div className="my-4 px-5 sm:p-0">
        <ProblemForm userId={userId} type="Upload" />
      </div>
    </>
  );
};

export default ProblemUpload;
