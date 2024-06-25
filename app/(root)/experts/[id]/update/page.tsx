import ExpertForm from "@/components/shared/ExpertForm";
import { getExpertById } from "@/lib/actions/experts.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type UpdateExpertProps = {
  params: {
    id: string;
  }
}

export const metadata: Metadata = {
  title: 'Update Expert Profile',
  description: 'Update your expert profile to keep your information current and attract more users.',
}

const ExpertProfileUpdate = async ({ params: { id } }: UpdateExpertProps) => {
    const { userId } = auth();
    if (!userId) redirect("/sign-in");
    const currentUser = await getUserById(userId);

    if (!currentUser) {
      redirect("/");
    }
  
    const expert = await getExpertById(id)
    if (expert.user._id !== currentUser._id) {
      redirect("/");
    }

  return (
    <>
      <section className="py-5 md:py-10">
        <div className="px-4 sm:px-0 py-5 pb-2 md:py-10 md:pb-2">
          <h1 className="text-left text-2xl font-bold">
            Update Your Profile
          </h1>
        </div>
      </section>
      <div className="my-8 px-5 sm:p-0">
        <ExpertForm userId={currentUser._id} type="Update" expert={expert} expertId={expert._id} />
      </div>
    </>
  );
};

export default ExpertProfileUpdate;
