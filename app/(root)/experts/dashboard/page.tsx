import PostCollection from "@/components/shared/PostCollection";
import { Button } from "@/components/ui/button";
import { getExpertByUserId } from "@/lib/actions/experts.actions";
import { fetchAllMyPosts } from "@/lib/actions/infiniteScroll.actions";
import { getAllMyPosts } from "@/lib/actions/post.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Expert Dashboard",
  description:
    "Manage your profile, view insights, and interact with the community. Join our platform and showcase your expertise. Connect with others and provide valuable solutions in your field.",
};

const ExpertDashboard = async ({ searchParams }: SearchParamProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  if (!user) {
    redirect("/");
  }

  const plan = user?.plan;
  const isExpert = user?.isExpert;

  if (plan === "free" || !isExpert) redirect("/experts");

  const expert = await getExpertByUserId(user._id);
  if (!expert) {
    redirect("/");
  }

  
  const page = Number(searchParams?.page) || 1;
  const data = await fetchAllMyPosts({ expertId: expert._id });

  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">
          Dashboard
        </h1>
      </section>
      <section className="w-full flex flex-col md:flex-row md:flex-wrap gap-4 px-4 sm:px-0">
        <Button className="w-full md:w-52">
          <Link href={`/experts/${expert._id}/update`}>
            Edit Profile
          </Link>
        </Button>
        <Button className="w-full md:w-52">
          <Link href={`/experts/posts/upload`}>
            New Post
          </Link>
        </Button>
        <Button className="w-full md:w-52">
          <Link href={`/experts/${expert._id}`}>
            View Profile
          </Link>
        </Button>
      </section>

      <section className="w-full flex flex-col mt-8">
        <h1 className="text-lg font-light">Your Previous Posts</h1>
        <PostCollection
          initialData={data}
          emptyTitle={"You have uploaded no posts"}
          emptySubtitle={"Upload to reach your audience"}
          postCollectionType={"My_Editable_Post"}
        />
      </section>
    </>
  );
};

export default ExpertDashboard;
