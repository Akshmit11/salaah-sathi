import Ad from "@/components/shared/Ad";
import Collection from "@/components/shared/Collection";
import { getAllSavedProblems } from "@/lib/actions/problem.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SaveProblemsPage = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const currentUser = await getUserById(userId);

  if (!currentUser) {
    redirect("/");
  }

  const problems = await getAllSavedProblems({
    userId: currentUser._id,
    page: 1,
    limit: 6,
  });

  return (
    <main className="px-4 sm:px-0">
      <Ad />

      <Collection
        data={problems?.data}
        emptyTitle={"You haved no saved problems"}
        emptySubtitle={"Save one if you find it interesting"}
        limit={6}
        page={1}
        totalPages={2}
        collectionType={"Saved_Problems"}
      />
    </main>
  );
};

export default SaveProblemsPage;
