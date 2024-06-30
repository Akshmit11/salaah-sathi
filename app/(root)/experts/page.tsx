import CategoryFilter from "@/components/shared/CategoryFilter";
import PostCollection from "@/components/shared/PostCollection";
import SearchComponent from "@/components/shared/SearchComponent";
import { Button } from "@/components/ui/button";
import { fetchAllPosts } from "@/lib/actions/infiniteScroll.actions";
import { getAllPosts } from "@/lib/actions/post.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { CircleCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

const Experts = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  if (!user) redirect("/sign-in");

  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const data = await fetchAllPosts({ query: searchText, category });

  const plan = user?.plan;
  const isExpert = user?.isExpert;

  return (
    <div className="flex flex-col mx-4 mt-4">
      <div className="flex flex-wrap gap-4 items-center">
        <Button
          className={`w-full sm:w-40 ${
            plan !== "free" ? "bg-green-500" : ""
          } transition-all`}
          disabled={plan === "free" ? false : true}
        >
          <Link
            href={"/experts/subscribe"}
            className=" flex items-center gap-2"
          >
            <CircleCheck className={`${plan !== "free" ? "flex" : "hidden"}`} />{" "}
            Subscribe
          </Link>
        </Button>
        <Button
          className={`w-full sm:w-52 ${
            plan !== "free" && isExpert ? "bg-green-500" : ""
          } transition-all`}
          disabled={plan === "free" ? true : isExpert ? true : false}
        >
          <Link href={"/experts/register"} className=" flex items-center gap-2">
            <CircleCheck
              className={`${plan !== "free" && isExpert ? "flex" : "hidden"}`}
            />{" "}
            Register Yourself
          </Link>
        </Button>
        <Button
          className="w-full sm:w-40"
          disabled={plan !== "free" && isExpert ? false : true}
        >
          <Link href={"/experts/dashboard"} className="flex items-center gap-2">
            Dashboard
          </Link>
        </Button>
      </div>
      <div className="w-full mt-4 flex flex-col lg:flex-row items-center">
        <SearchComponent />
        <CategoryFilter type="expert" />
      </div>
      <PostCollection
        initialData={data}
        emptyTitle={"No Posts uploaded by the experts"}
        emptySubtitle={"Coming Soon"}
        searchText={searchText}
        category={category}
        postCollectionType={"All_Post"}
      />
    </div>
  );
};

export default Experts;
