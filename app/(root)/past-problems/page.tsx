import Ad from "@/components/shared/Ad";
import Collection from "@/components/shared/Collection";
import { getAllMyProblems } from "@/lib/actions/problem.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: 'My Past Problems',
  description: 'Explore and review your previously posted problems and the solutions provided by the community. Stay informed and keep track of your problem-solving journey.',
}

const PastProblemsPage = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const currentUser = await getUserById(userId);
  if (!currentUser) {
    redirect("/");
  }
  
  const page = Number(searchParams?.page) || 1;
  const problems = await getAllMyProblems({
    userId: currentUser._id,
    page,
    limit: 6,
  });

  return (
    <main className="px-4 sm:px-0">
      <Collection
        data={problems?.data}
        emptyTitle={"You uploaded no problems"}
        emptySubtitle={"Upload one if you have"}
        limit={6}
        page={page}
        totalPages={problems?.totalPages}
        collectionType={"My_Problems"}
      />
    </main>
  );
};

export default PastProblemsPage;
