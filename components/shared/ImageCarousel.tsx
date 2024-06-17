import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";

const ImageCarousel = ({ data }: { data: string[] | undefined }) => {
  return (
    <Carousel className="w-full max-w-[300px] sm:max-w-[500px] md:max-w-[700px] mx-auto">
      <CarouselContent>
        {data?.map((url, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="border rounded-md">
                <div className="flex aspect-square items-center justify-center p-2">
                  <Image 
                    src={url}
                    alt={`image-${index}`}
                    width={1000}
                    height={300}
                    className="h-full min-h-[300px] object-cover object-center rounded-md"
                  />
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="ml-4 sm:ml-0" />
      <CarouselNext className="mr-4 sm:mr-0" />
    </Carousel>
  )
}

export default ImageCarousel;