import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const PostCarousel = ({ data }: { data: string[] | undefined }) => {
  let videoExt: any = "mp4";
  const getFileExtension = (url: string) => {
    return url?.split(/[#?]/)[0]?.split(".")?.pop()?.trim();
  };

  const isImage = (url: string) => {
    const ext: any = getFileExtension(url);
    return ["jpeg", "jpg", "gif", "png", "bmp", "svg", "webp"].includes(ext);
  };

  const isVideo = (url: string) => {
    const ext: any = getFileExtension(url);
    videoExt = ext;
    return ["mp4", "mov", "wmv", "flv", "avi", "mkv", "webm"].includes(ext);
  };

  return (
    <Carousel className="flex justify-center max-w-[280px] md:max-w-[700px] mx-auto">
      <CarouselContent>
        {data?.map((url, index) => (
          <CarouselItem key={index} className="rounded-md flex items-center justify-center">
            {isImage(url) ? (
              <Image
                src={url}
                alt={`image-${index}`}
                width={200}
                height={200}
                className="w-[280px] h-[180px] md:w-[700px] md:h-[350px] rounded-md"
                priority
              />
            ) : isVideo(url) ? (
              <video
                width="320"
                height="240"
                className="w-[280px] h-[180px] md:w-[780px] md:h-[420px] rounded-md"
                controls
                preload="none"
              >
                <source src={url} type={`video/${videoExt}`} />
                Your browser does not support the video tag.
              </video>
            ) : (
              "Unsupported File Type"
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-4 sm:ml-0" />
      <CarouselNext className="mr-4 sm:mr-0" />
    </Carousel>
  );
};

export default PostCarousel;
