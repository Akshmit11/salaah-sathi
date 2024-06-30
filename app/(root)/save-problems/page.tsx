import Ad from "@/components/shared/Ad";
import Collection from "@/components/shared/Collection";
import { fetchAllSavedProblem } from "@/lib/actions/infiniteScroll.actions";
import { getAllSavedProblems } from "@/lib/actions/problem.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Saved Problem",
  description:
    "Access and review the problems you have saved for later. Keep track of issues that are important to you and revisit them at any time.",
};

const SaveProblemsPage = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const currentUser = await getUserById(userId);

  if (!currentUser) {
    redirect("/");
  }

  const data = await fetchAllSavedProblem({ userId: currentUser._id });

  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">
          Saved Problems
        </h1>
      </section>
      <main className="px-4 sm:px-0">
        <Collection
          initialData={data}
          emptyTitle={"You haved no saved problems"}
          emptySubtitle={"Save one if you find it interesting"}
          currentUserId={currentUser._id}
          collectionType={"Saved_Problems"}
        />
      </main>
    </>
  );
};

export default SaveProblemsPage;
