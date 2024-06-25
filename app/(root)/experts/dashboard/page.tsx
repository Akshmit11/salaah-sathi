import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Expert Dashboard',
  description: 'Manage your profile, view insights, and interact with the community. Join our platform and showcase your expertise. Connect with others and provide valuable solutions in your field.',
}

const ExpertDashboard = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);


  const plan = user?.plan;
  const isExpert = user?.isExpert;

  if (plan !== "free") redirect("/experts");
  if (isExpert) redirect("/experts");
  
  return (
    <div>ExpertDashboard</div>
  )
}

export default ExpertDashboard