"use client";

import { IProblem } from "@/lib/database/models/problem.model";
import Card from "./Card";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import { fetchAllProblem } from "@/lib/actions/infiniteScroll.actions";

type CollectionProps = {
  initialData: IProblem[];
  emptyTitle: string;
  emptySubtitle: string;
  urlParamName?: string;
  currentUserId?: string;
  searchText?: string;
  category?: string;
  collectionType:
    | "All_Problems"
    | "My_Problems"
    | "Saved_Problems"
    | "Trending_Problems";
};

const Collection = ({
  initialData,
  emptyTitle,
  emptySubtitle,
  urlParamName,
  currentUserId,
  collectionType,
  searchText,
  category,
}: CollectionProps) => {
  const { ref, inView } = useInView();
  const [data, setData] = useState<IProblem[]>(initialData);
  const [page, setPage] = useState(1);
  const [hasMoreProblems, setHasMoreProblems] = useState(true);

  async function loadMoreProblems() {
    const next = page + 1;
    const problems = await fetchAllProblem({ page: next, query: searchText, category });
    if (problems?.length) {
      setPage(next);
      setData((prev: IProblem[]) => [...prev, ...problems]);
    } else {
      setHasMoreProblems(false);
    }
  }

  useEffect(() => {
    // Reset data and page number when searchText or category changes
    setData(initialData);
    setPage(1);
    setHasMoreProblems(true); // Reset hasMoreProblems
  }, [initialData]);

  useEffect(() => {
    if (inView && hasMoreProblems) {
      loadMoreProblems();
    }
  }, [inView, hasMoreProblems]);

  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((problem) => (
              <div key={problem._id}>
                <Card
                  problem={problem}
                  collectionType={collectionType}
                  currentUserId={currentUserId}
                />
              </div>
            ))}
          </div>
          <div className="h-8" />
          <section className="flex justify-center items-center w-full">
            {hasMoreProblems ? (
              <div ref={ref}>
                <Image
                  src="/images/loader.svg"
                  alt="spinner"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
            ) : (
              <p className="text-gray-500">You have reached the end</p>
            )}
          </section>
        </>
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
