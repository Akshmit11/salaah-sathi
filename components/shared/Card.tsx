import { IProblem } from "@/lib/database/models/problem.model";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Calendar, Heart, MessageCircle } from "lucide-react";

type CardProps = {
  problem: IProblem;
};

const Card = ({ problem }: CardProps) => {
  const createdAt = new Date(problem.createdAt);

  // Format the date as desired
  const formattedDate = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/problems/${problem._id}`} className="">
      <div className="border-[1px] border-gray-300 rounded-lg transition-all hover:shadow-xl hover:-m-2">
        <div className="p-4">
          <h1 className="text-lg font-semibold">{problem.title}</h1>
          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
            {problem.description}
          </p>
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
            <span className="font-light italic text-sm">{problem.timesSaved}</span>
          </p>
          <p className="flex gap-1 items-center">
            <Calendar color="#0ea5e9" />{" "}
            <span className="font-light italic text-sm">{formattedDate}</span>
          </p>
        </div>
        <p className="px-4 pb-2 italic text-base">{problem.category}</p>
      </div>
    </Link>
  );
};

export default Card;
