import Ad from "@/components/shared/Ad";
import Collection from "@/components/shared/Collection";
import { fetchAllMyProblem } from "@/lib/actions/infiniteScroll.actions";
import { getAllMyProblems } from "@/lib/actions/problem.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "My Past Problems",
  description:
    "Explore and review your previously posted problems and the solutions provided by the community. Stay informed and keep track of your problem-solving journey.",
};

const PastProblemsPage = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const currentUser = await getUserById(userId);
  if (!currentUser) {
    redirect("/");
  }

  const data = await fetchAllMyProblem({
    userId: currentUser._id,
  });

  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">
          Past Problems
        </h1>
      </section>
      <main className="px-4 sm:px-0">
        <Collection
          initialData={data}
          emptyTitle={"No Problems Found"}
          emptySubtitle={"Come back later"}
          collectionType={"My_Problems"}
        />
      </main>
    </>
  );
};

export default PastProblemsPage;
