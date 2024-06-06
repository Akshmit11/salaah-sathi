import Ad from "@/components/shared/Ad";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import SearchComponent from "@/components/shared/SearchComponent";
import { getAllProblems } from "@/lib/actions/problem.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || '';
  const category = (searchParams?.category as string) || '';

  const problems = await getAllProblems({
    query: searchText,
    category,
    page,
    limit: 6
  });

  return (
    <main className="px-4 sm:px-0">
      <Ad />
      <div className="w-full mb-4 flex flex-col lg:flex-row items-center">
        <SearchComponent /> 
        <CategoryFilter />
      </div>
      <Collection
        data={problems?.data}
        emptyTitle={"No Problems Found"}
        emptySubtitle={"Come back later"}
        limit={6}
        page={page}
        totalPages={problems?.totalPages}
        collectionType={"All_Problems"}
      />
    </main>
  );
}
