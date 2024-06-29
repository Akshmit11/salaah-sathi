import SubscriptionPlan from "@/components/shared/SubscriptionPlan"
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Expert Subscription',
  description: 'Subscribe to gain access to Expert Tags, post unlimited content, increase your reach, and build a global network. Join our platform and leverage your expertise to connect with a broader audience and enhance your professional profile.',
}

const Subscribe = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);

  const plan = user?.plan;
  if (plan !== "free") redirect("/experts");


  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">Subscribe</h1>
      </section>
      <SubscriptionPlan userId={user._id} />
    </>
  )
}

export default Subscribe