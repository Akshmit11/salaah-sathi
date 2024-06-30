import PostCollection from "@/components/shared/PostCollection";
import { Button } from "@/components/ui/button";
import { getExpertById } from "@/lib/actions/experts.actions";
import { fetchAllMyPosts } from "@/lib/actions/infiniteScroll.actions";
import { getAllMyPosts } from "@/lib/actions/post.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params: { id },
}: SearchParamProps): Promise<Metadata> {
  const expert = await getExpertById(id);
  return {
    title: expert?.fullName,
    description: expert?.description
  };
}
let currentUser: any = null;

const ExpertsId = async ({ params: { id }, searchParams }: SearchParamProps) => {
  const { userId } = auth();
  if (userId) {
    currentUser = (await getUserById(userId)) as IUser;

    if (!currentUser) {
      redirect("/");
    }
  }

  const expert = await getExpertById(id);
  if (!expert) {
    redirect("/experts");
  }
  const data = await fetchAllMyPosts({ expertId: expert._id });


  const isCurrentUserAnExpert = (expert?.user?._id === currentUser?._id);

  return (
    <>
      {/* name */}
      <section className="py-5 flex flex-col md:flex-row px-4 md:items-center gap-5">
        <div className="mx-auto md:mx-0">
          <Image
            src={expert?.profilePhoto}
            width={250}
            height={450}
            alt="profile photo"
            className="w-[200px] h-[300px] object-contain bg-primary-100 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-lg font-light">Full Name</p>
            <p className="text-2xl font-bold">{expert?.fullName}</p>
          </div>
          <div>
            <p className="text-lg font-light">Phone Number</p>
            <p className="text-2xl font-bold">{expert?.phoneNumber}</p>
          </div>
        </div>
      </section>
      {/* description */}
      <section className="py-5 flex flex-col px-4">
        <h1 className="text-lg font-light">About the Expert</h1>
        <p className="text-2xl font-semibold">
          {expert?.description}
        </p>
      </section>
      {/* other */}
      <section className="py-5 flex flex-col px-4">
        <div className="flex flex-wrap gap-5">
          <div className="border rounded-md p-4 w-80">
            <h2 className="text-lg font-light">Country</h2>
            <h1 className="text-2xl font-bold">{expert?.country}</h1>
          </div>
          <div className="border rounded-md p-4 w-80">
            <h2 className="text-lg font-light">State</h2>
            <h1 className="text-2xl font-bold">{expert?.state}</h1>
          </div>
          <div className="border rounded-md p-4 w-80">
            <h2 className="text-lg font-light">City</h2>
            <h1 className="text-2xl font-bold">{expert?.city}</h1>
          </div>
          <div className="border rounded-md p-4 w-80">
            <h2 className="text-lg font-light">Category</h2>
            <h1 className="text-2xl font-bold">{expert?.category}</h1>
          </div>
        </div>
      </section>
      {
        isCurrentUserAnExpert && (  
          <Button className="my-4 bg-primary mx-4">
            <Link href={'/experts/posts/upload'} className="text-white flex items-center gap-2">
              <Plus /> New Post
            </Link>
          </Button>
        )
      }
      {/* recent post */}
      <section className="py-5 flex flex-col px-4">
        <h1 className="text-lg font-light">Recent Posts</h1>
        <PostCollection
          initialData={data}
          emptyTitle={"No Posts uploaded by the expert"}
          emptySubtitle={"Come back later"}
          postCollectionType={"My_Post"}
        />
      </section>
    </>
  );
};

export default ExpertsId;
