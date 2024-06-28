import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { IPost } from "@/lib/database/models/post.model";

type PostCollectionProps = {
  data: IPost[];
  emptyTitle: string;
  emptySubtitle: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  currentExpertId?: string;
  postCollectionType:
    | "All_Post"
    | "My_Post"
    | "My_Editable_Post"
};

const PostCollection = ({
  data,
  emptyTitle,
  emptySubtitle,
  limit,
  page,
  totalPages = 0,
  urlParamName,
  currentExpertId,
  postCollectionType,
}: PostCollectionProps) => {


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
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
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
