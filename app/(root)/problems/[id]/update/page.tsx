import ProblemForm from "@/components/shared/ProblemForm";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const ProblemUpdate = async () => {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");

  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center h3-bold sm:text-left">Update Problem</h1>
      </section>
      <div className="my-8 px-5 sm:p-0">
        <ProblemForm userId={userId} type="Update" />
      </div>
    </>
  );
};

export default ProblemUpdate;
