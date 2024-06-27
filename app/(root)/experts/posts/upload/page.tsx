import PostForm from "@/components/shared/PostForm"

const UploadPost = () => {
  // const { userId } = auth();
  // if (!userId) redirect("/sign-in");

  // const currentUser = await getUserById(userId);

  // if (!currentUser) {
  //   redirect("/");
  // }

  // const expert = await getExpertByUserId(currentUser?._id)
  // if (!expert) {
  //   redirect("/experts");
  // }

  const user = {
  _id: "123",
  }

  const expert = {
    _id: "123"
  }

  return (
    <>
    <section className="py-5 md:py-10">
      <h1 className="text-center text-2xl font-bold sm:text-left">Upload Post</h1>
    </section>
    <div className="my-4 px-5 sm:p-0">
      <PostForm userId={user._id} expertId={expert._id} type="Upload" />
    </div>
  </>
  )
}

export default UploadPost