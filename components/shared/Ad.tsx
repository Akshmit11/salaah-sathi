import Image from "next/image";
import React from "react";
import AdCarousel from "./AdCarousel";

const Ad = () => {
  return (
    <section className="my-4 w-full border-[1px] rounded-xl p-4 bg-white shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row items-center ">
        <div className="flex flex-col justify-center gap-8">
          <h1 className="text-2xl font-bold underline underline-offset-4">
            Empowering Solutions for Everyone
          </h1>
          <p className="text-lg font-medium">
            Welcome to Suggest Solutions – a vibrant community where people come
            together to solve each other's problems. Join us in helping one
            another improve every day by sharing practical, effective solutions.
            Together, we make life's challenges easier to overcome.
          </p>
        </div>
        <AdCarousel />
      </div>
    </section>
  );
};

export default Ad;
