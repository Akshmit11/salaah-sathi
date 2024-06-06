import { IProblem } from "@/lib/database/models/problem.model";
import Card from "./Card";

type CollectionProps = {
  data: IProblem[];
  emptyTitle: string;
  emptySubtitle: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType: "All_Problems" | "My_Problems" | "Saved_Problems" | "Trending_Problems";
};

const Collection = ({
  data,
  emptyTitle,
  emptySubtitle,
  limit,
  page,
  totalPages = 0,
  urlParamName,
  collectionType,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <ul className="">
            {data.map((problem) => {
              return (
                <li key={problem._id}>
                  <Card problem={problem} />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="flex items-center justify-center max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full min-h-[200px] flex-col gap-3 rounded-[14px] bg-gray-200 py-28 text-center">
          <h3 className="font-bold text-[20px] leading-[30px] tracking-[2%] md:text-[28px] md:leading-[36px]">
            {emptyTitle}
          </h3>
          <p className="text-[14px] font-normal leading-[20px]">
            {emptySubtitle}
          </p>
        </div>
      )}
    </>
  );
};

export default Collection;
