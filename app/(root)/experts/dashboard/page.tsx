import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Expert Dashboard",
  description:
    "Manage your profile, view insights, and interact with the community. Join our platform and showcase your expertise. Connect with others and provide valuable solutions in your field.",
};

const ExpertDashboard = async () => {
  // const { userId } = auth();
  // if (!userId) redirect("/sign-in");

  // const user = await getUserById(userId);
  // if (!user) {
  //   redirect("/");
  // }


  const user = {
    plan: "pro",
    isExpert: true,
  };

  const plan = user?.plan;
  const isExpert = user?.isExpert;

  if (plan === "free" || !isExpert) redirect("/experts");

  // const expert = await getExpertByUserId(user._id);
  // if (!expert) {
  //   redirect("/");
  // }
  const expert = {
    _id: "123"
  }

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
      </section>

      <section className="w-full flex flex-col mt-4">
        All Post Come Here.
      </section>
    </>
  );
};

export default ExpertDashboard;
