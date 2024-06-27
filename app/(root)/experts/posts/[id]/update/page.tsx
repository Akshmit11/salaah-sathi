import PostForm from "@/components/shared/PostForm";
import { getExpertByUserId } from "@/lib/actions/experts.actions";
import { getPostById } from "@/lib/actions/post.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type UpdatePostProps = {
  params: {
    id: string;
  }
}


export const metadata: Metadata = {
  title: 'Update Post',
  description: 'Edit and update your previously posted Posts. Make changes to your issues to provide more details or update their status.',
}

const PostUpdate = async ({ params: { id } }: UpdatePostProps) => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const currentUser = await getUserById(userId);

  if (!currentUser) {
    redirect("/");
  }

  const expert = await getExpertByUserId(currentUser?._id)
  if (!expert) {
    redirect("/experts");
  }

  // TODO
  const post = await getPostById(id)
  if (post.user._id !== currentUser._id) {
    redirect("/");
  }

  return (
    <>
    <section className="py-5 md:py-10">
        <div className="px-4 sm:px-0 py-5 pb-2 md:py-10 md:pb-2">
          <h1 className="text-left text-2xl font-bold">
            Update Post
          </h1>
        </div>
      </section>
      <div className="my-8 px-5 sm:p-0">
        <PostForm userId={currentUser._id} expertId={expert._id} type="Update" post={post} postId={post._id} />
      </div>
    </>
  )
}

export default PostUpdate