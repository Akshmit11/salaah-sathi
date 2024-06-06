import ProblemForm from "@/components/shared/ProblemForm";
import { getProblemById } from "@/lib/actions/problem.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

type UpdateProblemProps = {
  params: {
    id: string;
  }
}

const ProblemUpdate = async ({ params: { id } }: UpdateProblemProps) => {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");
    const currentUser = await getUserById(userId);

    if (!currentUser) {
      redirect("/");
    }
  
    const problem = await getProblemById(id)

  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center h3-bold sm:text-left">Update Problem</h1>
      </section>
      <div className="my-8 px-5 sm:p-0">
        <ProblemForm userId={currentUser._id} type="Update" problem={problem} problemId={problem._id} />
      </div>
    </>
  );
};

export default ProblemUpdate;
