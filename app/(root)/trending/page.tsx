import Ad from "@/components/shared/Ad";
import Collection from "@/components/shared/Collection";
import { getAllTrendingProblems } from "@/lib/actions/problem.actions";

const TrendingProblemPage = async () => {
  const problems = await getAllTrendingProblems({
    query: "",
    category: "",
    page: 1,
    limit: 6
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

export default TrendingProblemPage;
