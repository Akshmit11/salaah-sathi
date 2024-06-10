import Image from "next/image";
import React from "react";

const Ad = () => {
  return (
    <section className="my-4 w-full border-[1px] rounded-xl p-4">
      <div className="flex flex-col gap-4 lg:flex-row">
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
        <Image
          src="/images/img1.webp"
          alt="hero"
          width={1000}
          height={1000}
          className="rounded-lg object-contain object-center lg:w-1/2"
        />
      </div>
    </section>
  );
};

export default Ad;
