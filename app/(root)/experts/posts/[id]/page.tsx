import PostCarousel from "@/components/shared/PostCarousel";
import { getExpertByUserId } from "@/lib/actions/experts.actions";
import { getPostById } from "@/lib/actions/post.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params: { id },
}: SearchParamProps): Promise<Metadata> {
  const post = await getPostById(id);
  return {
    title: post?.expert?.fullName,
    description: post?.description
  };
}

let currentUser: any = null;
const PostId = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();
  if (userId) {
    currentUser = (await getUserById(userId)) as IUser;

    if (!currentUser) {
      redirect("/");
    }
  }

  const expert = await getExpertByUserId(currentUser._id)
  if (!expert) {
    redirect("/experts");
  }
  const post = await getPostById(id);
  if (!post) {
    redirect("/experts");
  }

  return (
    <>
      <section className="w-full flex flex-col md:flex-row gap-4">
        <section className="w-full">
          <div className="px-4 sm:px-0 py-5 pb-2 md:py-10 md:pb-2">
            <h1 className="text-left text-2xl font-bold">Post by {expert?.fullName}</h1>
          </div>

          {post?.fileUrls.length > 0 && (
            <PostCarousel data={post?.fileUrls} />
          )}

          <div className="mt-4">
            <h1 className="text-lg font-light">{post?.description}</h1>
          </div>

        </section>
      </section>
    </>
  );
};

export default PostId;
