import Collection from "@/components/shared/Collection";
import { fetchAllTrendingProblem } from "@/lib/actions/infiniteScroll.actions";
import { getAllTrendingProblems } from "@/lib/actions/problem.actions";
import { SearchParamProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending Problems",
  description:
    "Discover the most discussed and popular problems on our platform. Stay updated with the trending issues and join the conversation.",
};

const TrendingProblemPage = async ({ searchParams }: SearchParamProps) => {
  const data = await fetchAllTrendingProblem();

  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">
          Trending Problems
        </h1>
      </section>
      <main className="px-4 sm:px-0">
        <Collection
          initialData={data}
          emptyTitle={"There are currently no Trending Problems"}
          emptySubtitle={"See if yours could become one"}
          collectionType={"Trending_Problems"}
        />
      </main>
    </>
  );
};

export default TrendingProblemPage;
