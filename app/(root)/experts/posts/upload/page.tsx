import PostForm from "@/components/shared/PostForm"
import { getExpertByUserId } from "@/lib/actions/experts.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const UploadPost = async () => {
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

  return (
    <>
    <section className="py-5 md:py-10">
      <h1 className="text-center text-2xl font-bold sm:text-left">Upload Post</h1>
    </section>
    <div className="my-4 px-5 sm:p-0">
      <PostForm userId={currentUser._id} expertId={expert._id} type="Upload" />
    </div>
  </>
  )
}

export default UploadPost