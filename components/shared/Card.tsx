import { IProblem } from "@/lib/database/models/problem.model";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Calendar, Heart, MessageCircle, Pencil } from "lucide-react";
import { Button } from "../ui/button";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { DeleteSavedProblem } from "./DeleteSavedProblem";

type CardProps = {
  problem: IProblem;
  collectionType: string;
  currentUserId?: string;
};

const Card = ({ problem, collectionType, currentUserId }: CardProps) => {
  const createdAt = new Date(problem.createdAt);

  // Format the date as desired
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-[1px] border-gray-300 rounded-lg transition-all hover:shadow-xl hover:-m-2 h-48">
      <Link href={`/problems/${problem._id}`} className="">
        <div className="p-4">
          <h1 className="text-lg font-medium line-clamp-2">{problem.title}</h1>
        </div>
        <hr />
        <div className="p-4 flex flex-wrap gap-4">
          <p className="flex gap-1 items-center">
            <MessageCircle color="#0ea5e9" />{" "}
            <span className="font-light italic text-sm">
              {problem.comments.length}
            </span>
          </p>
          <p className="flex gap-1 items-center">
            <Heart color="#0ea5e9" />{" "}
            <span className="font-light italic text-sm">
              {problem.timesSaved}
            </span>
          </p>
          <p className="flex gap-1 items-center">
            <Calendar color="#0ea5e9" />{" "}
            <span className="font-light italic text-sm">{formattedDate}</span>
          </p>
        </div>
        <p className="px-4 pb-2 italic text-base">{problem.category}</p>
      </Link>
      {collectionType === "My_Problems" && (
        <>
          <hr />
          <div className="p-4 flex flex-wrap gap-4 items-center">
            <Link href={`/problems/${problem._id}/update`}>
              <Button className="flex gap-1 items-center bg-amber-400">
                <Pencil color="white" /> Update
              </Button>
            </Link>
            <DeleteConfirmation problemId={problem._id} />
          </div>
        </>
      )}

      {collectionType === "Saved_Problems" && (
        <>
          <hr />
          <div className="p-4 flex flex-wrap gap-4 items-center">
            <DeleteSavedProblem
              problemId={problem._id}
              currentUserId={currentUserId}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
