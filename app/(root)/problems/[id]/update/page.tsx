import ProblemForm from "@/components/shared/ProblemForm";
import { getProblemById } from "@/lib/actions/problem.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

type UpdateProblemProps = {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Update Problem',
  description: 'Edit and update your previously posted problems. Make changes to your issues to provide more details or update their status.',
}

const ProblemUpdate = async ({ params: { id } }: UpdateProblemProps) => {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");
    const currentUser = await getUserById(userId);

    if (!currentUser) {
      redirect("/");
    }
  
    const problem = await getProblemById(id)
    if (problem.user._id !== currentUser._id) {
      redirect("/");
    }

  return (
    <>
      <section className="py-5 md:py-10">
        <div className="px-4 sm:px-0 py-5 pb-2 md:py-10 md:pb-2">
          <h1 className="text-left text-2xl font-bold">
            Update Problem
          </h1>
        </div>
      </section>
      <div className="my-8 px-5 sm:p-0">
        <ProblemForm userId={currentUser._id} type="Update" problem={problem} problemId={problem._id} />
      </div>
    </>
  );
};

export default ProblemUpdate;
