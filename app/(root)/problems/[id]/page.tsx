import Ad from "@/components/shared/Ad";
import CommentForm from "@/components/shared/CommentForm";
import SaveProblem from "@/components/shared/SaveProblem";
import { Button } from "@/components/ui/button";
import { getProblemById } from "@/lib/actions/problem.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const ProblemId = async ({ params: { id } }: SearchParamProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const currentUser = await getUserById(userId);

  if (!currentUser) {
    redirect("/");
  }

  const problem = await getProblemById(id);
  if (!problem) {
    redirect("/");
  }

  return (
    <>
      <section className="w-full flex flex-col md:flex-row gap-4">
        <section className="w-full md:w-3/4">
          <div className="py-5 md:py-10">
            <h1 className="text-center h3-bold sm:text-left">
              {problem.title} <br />
            </h1>
          </div>
          <div className="px-4 sm:px-0 text-justify">
            <p>{problem.description}</p>
          </div>
          {/* Save */}
          {/* TODO */}
          <SaveProblem />

          <div className="mt-10 px-4 sm:px-0 text-justify">
            <h1 className="text-2xl font-bold mb-10">Comments</h1>
          </div>
          <div className="mt-10 px-4 sm:px-0">
            {problem.user._id === currentUser._id ? (
              <></>
            ) : (
              <CommentForm userId={userId} problemId={id} />
            )}
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
                <h1>No Comments</h1>
              </div>
            )}
          </div>
        </section>
        <section className="w-full md:w-1/4 space-y-4">
          <Ad />
        </section>
      </section>
    </>
  );
};

export default ProblemId;
