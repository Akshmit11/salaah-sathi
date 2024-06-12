import Ad from "@/components/shared/Ad";
import Collection from "@/components/shared/Collection";
import { getAllSavedProblems } from "@/lib/actions/problem.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Saved Problem',
  description: 'Access and review the problems you have saved for later. Keep track of issues that are important to you and revisit them at any time.',
}

const SaveProblemsPage = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const currentUser = await getUserById(userId);

  if (!currentUser) {
    redirect("/");
  }

  const page = Number(searchParams?.page) || 1;
  const problems = await getAllSavedProblems({
    userId: currentUser._id,
    page,
    limit: 6,
  });

  return (
    <main className="px-4 sm:px-0">
      <Collection
        data={problems?.data}
        emptyTitle={"You haved no saved problems"}
        emptySubtitle={"Save one if you find it interesting"}
        limit={6}
        page={page}
        totalPages={problems?.totalPages}
        currentUserId={currentUser._id}
        collectionType={"Saved_Problems"}
      />
    </main>
  );
};

export default SaveProblemsPage;
