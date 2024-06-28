import ExpertForm from "@/components/shared/ExpertForm";
import NotSubscribed from "@/components/shared/NotSubscribed";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Register as an Expert',
  description: 'Join our platform and share your expertise. Help others by providing valuable insights and solutions in your field. Register now and become a part of our expert community.',
}

const ExpertRegister = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  if (!user) redirect("/sign-in")

  const plan = user?.plan
  const isExpert = user?.isExpert;

  if (isExpert || plan === "free") redirect("/experts");

  
  return (
    <>
      { plan === "free" && <NotSubscribed />}
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">Upload Your Info</h1>
      </section>
      <div className="my-4 px-5 sm:p-0">
        <ExpertForm userId={user._id} type="Upload" />
      </div>
    </>
  )
}

export default ExpertRegister