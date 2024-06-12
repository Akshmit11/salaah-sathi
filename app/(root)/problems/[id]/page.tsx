import CommentForm from "@/components/shared/CommentForm";
import SaveProblem from "@/components/shared/SaveProblem";
import { getProblemById } from "@/lib/actions/problem.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params: { id },
}: SearchParamProps): Promise<Metadata> {
  const problem = await getProblemById(id);
  return {
    title: problem?.title,
  };
}

let currentUser: any = null;
const ProblemId = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();
  if (userId) {
    // redirect("/sign-in");
    currentUser = (await getUserById(userId)) as IUser;

    if (!currentUser) {
      redirect("/");
    }
  }

  const problem = await getProblemById(id);
  if (!problem) {
    redirect("/");
  }

  return (
    <>
      <section className="w-full flex flex-col md:flex-row gap-4">
        <section className="w-full">
          <div className="py-5 md:py-10">
            <h1 className="text-center h3-bold sm:text-left">
              {problem.title} <br />
            </h1>
          </div>
          <div className="px-4 sm:px-0 text-justify">
            <p>{problem.description}</p>
          </div>

          {currentUser !== null ? (
            <SaveProblem problemId={problem._id} userId={currentUser._id} />
          ) : (
            <></>
          )}

          <div className="px-4 sm:px-0 text-justify mt-2">
            <h1 className="text-lg font-medium italic">AI Generated</h1>
            <p className="text-sm">{problem.aiSolution}</p>
          </div>
          <div className="mt-10 px-4 sm:px-0 text-justify">
            <h1 className="text-2xl font-bold mb-10">Suggestions</h1>
          </div>

          <div className="mt-10 px-4 sm:px-0">
            {
              <>
                {userId !== null ? (
                  problem.user._id === currentUser._id ? (
                    <></>
                  ) : (
                    <CommentForm userId={userId} problemId={id} />
                  )
                ) : (
                  <>
                    <div className="w-full h-20 flex items-center justify-center border-[2px] border-gray-400 rounded-md border-dashed">
                      <h1>To Suggest a Solution Sign Up...</h1>
                    </div>
                  </>
                )}
              </>
            }
          </div>

          <div className="px-4 mt-10 sm:px-0 text-justify">
            {problem.comments.length !== 0 ? (
              <>
                {problem.comments.map((comment: any) => (
                  <div className="mb-4 border-[1px] p-2 rounded-md">
                    <p className="mb-2">{comment?.text}</p>
                    <p className="italic text-sm">
                      ~ {comment?.user?.username}
                    </p>
                  </div>
                ))}
              </>
            ) : (
              <div className="w-full h-20 flex items-center justify-center border-[2px] border-gray-400 rounded-md border-dashed">
                <h1>No Suggestions till now...</h1>
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
};

export default ProblemId;
