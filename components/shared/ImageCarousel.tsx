import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const ImageCarousel = ({ data }: { data: string[] | undefined }) => {
  return (
    <Carousel className="flex justify-center max-w-[200px] max-h-[200px] md:max-w-[700px] md:max-h-[700px] mx-auto">
      <CarouselContent>
        {data?.map((url, index) => (
          <CarouselItem key={index} className="rounded-md">
            <Image
              src={url}
              alt={`image-${index}`}
              width={200}
              height={200}
              className="w-[200px] h-[200px] md:w-[700px] md:h-[700px] rounded-md"
              priority
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-4 sm:ml-0" />
      <CarouselNext className="mr-4 sm:mr-0" />
    </Carousel>
  );
};

export default ImageCarousel;
