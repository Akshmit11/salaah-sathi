import Ad from "@/components/shared/Ad";
import Collection from "@/components/shared/Collection";
import { getAllProblems } from "@/lib/actions/problem.actions";

export default async function Home() {

  const problems = await getAllProblems({
    query: "",
    category: "",
    page: 1,
    limit: 6
  });

  return (
    <main className="px-4 sm:px-0">
      <Ad />
      <div className="mb-4">
        Search and Filter
      </div>
      <Collection
        data={problems?.data}
        emptyTitle={"No Problems Found"}
        emptySubtitle={"Come back later"}
        limit={6}
        page={1}
        totalPages={2}
        collectionType={"All_Problems"}
      />
    </main>
  );
}
