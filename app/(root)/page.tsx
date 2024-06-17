import Ad from "@/components/shared/Ad";
import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import SearchComponent from "@/components/shared/SearchComponent";
import { Button } from "@/components/ui/button";
import { getAllProblems } from "@/lib/actions/problem.actions";
import { SearchParamProps } from "@/types";
import { Plus } from "lucide-react";
import Link from "next/link";

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
        <Button asChild className="mb-4 w-full md:hidden gap-2 text-white">
          <Link href={"/problems/upload"}>
            <Plus className="w-5 h-5" color="white" />
            Share Your Problem
          </Link>
        </Button>
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
