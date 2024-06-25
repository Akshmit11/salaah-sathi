import { getExpertById } from "@/lib/actions/experts.actions";
import { SearchParamProps } from "@/types";
import { Metadata } from "next";

// export async function generateMetadata({
//   params: { id },
// }: SearchParamProps): Promise<Metadata> {
//   const expert = await getExpertById(id);
//   return {
//     title: expert?.fullName,
//     description: expert?.description
//   };
// }

const ExpertsId = () => {



  return (
    <>
      <section className="py-5 md:py-10">
        <h1 className="text-center text-2xl font-bold sm:text-left">Expert name</h1>
      </section>
    </>
  )
}

export default ExpertsId