import Collection from "@/components/shared/Collection";
import { getAllTrendingProblems } from "@/lib/actions/problem.actions";
import { SearchParamProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Trending Problems',
  description: 'Discover the most discussed and popular problems on our platform. Stay updated with the trending issues and join the conversation.',
}

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
        emptyTitle={"There are currently no Trending Problems"}
        emptySubtitle={"See if yours could become one"}
        limit={6}
        page={page}
        totalPages={problems?.totalPages}
        collectionType={"Trending_Problems"}
      />
    </main>
  );
};

export default TrendingProblemPage;
