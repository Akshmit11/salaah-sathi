import Ad from "@/components/shared/Ad";
import Collection from "@/components/shared/Collection";
import { getAllTrendingProblems } from "@/lib/actions/problem.actions";
import { SearchParamProps } from "@/types";

const TrendingProblemPage = async ({ searchParams }: SearchParamProps) => {

  const page = Number(searchParams?.page) || 1;
  const problems = await getAllTrendingProblems({
    query: "",
    category: "",
    page,
    limit: 6
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
        collectionType={"Trending_Problems"}
      />
    </main>
  );
};

export default TrendingProblemPage;
