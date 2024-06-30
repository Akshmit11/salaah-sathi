'use client'

import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { IPost } from "@/lib/database/models/post.model";
import { fetchAllPosts } from "@/lib/actions/infiniteScroll.actions";
import Image from "next/image";

type PostCollectionProps = {
  initialData: IPost[];
  emptyTitle: string;
  emptySubtitle: string;
  urlParamName?: string;
  currentExpertId?: string;
  searchText?: string;
  category?: string;
  postCollectionType:
    | "All_Post"
    | "My_Post"
    | "My_Editable_Post"
};

const PostCollection = ({
  initialData,
  emptyTitle,
  emptySubtitle,
  urlParamName,
  currentExpertId,
  searchText,
  category,
  postCollectionType,
}: PostCollectionProps) => {
  const { ref, inView } = useInView();
  const [data, setData] = useState<IPost[]>(initialData);
  const [page, setPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  async function loadMorePosts() {
    const next = page + 1;
    const posts = await fetchAllPosts({ page: next, query: searchText, category });
    if (posts?.length) {
      setPage(next);
      setData((prev: IPost[]) => [...prev, ...posts]);
    } else {
      setHasMorePosts(false);
    }
  }

  useEffect(() => {
    // Reset data and page number when searchText or category changes
    setData(initialData);
    setPage(1);
    setHasMorePosts(true); // Reset hasMorePosts
  }, [initialData]);

  useEffect(() => {
    if (inView && hasMorePosts) {
      loadMorePosts();
    }
  }, [inView, hasMorePosts]);

  return (
    <>
      {data.length > 0 ? (
        <>
          <div className="w-full flex flex-col gap-4">
            {data.map((post, index) => {
              return (
                <div key={post._id}>
                  <PostCard
                    post={post}
                    postCollectionType={postCollectionType}
                    currentExpertId={currentExpertId}
                  />
                </div>
              );
            })}
          </div>
          <div className="h-8" />
          <section className="flex justify-center items-center w-full">
            {hasMorePosts ? (
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

export default PostCollection;
