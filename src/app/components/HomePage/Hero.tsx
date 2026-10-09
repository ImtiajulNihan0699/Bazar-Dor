"use client";

import React, { useState } from "react";
import Image from "next/image";
import BannerButton from "../buttons/bannerButton";

const Hero = () => {
  const [date] = useState(() =>
    new Date().toLocaleDateString("bn-BD", {
      dateStyle: "full",
    }),
  );

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 py-8 sm:px-6 md:flex-row md:gap-4 lg:px-8">
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center text-center md:items-start md:text-left">
        <h4 className="rounded-2xl bg-green-200 mt-4 px-6 py-3 text-lg font-semibold text-green-900 shadow-sm transition-colors hover:bg-green-600">
          {date}
        </h4>

        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mt-2 text-lg text-gray-600">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <BannerButton/>
      </div>

      <div className="flex w-full min-w-0 flex-1 items-center justify-center md:justify-end">
        <Image
          src="/assets/bazar-hero.png"
          alt="Bazar Hero"
          width={800}
          height={400}
          priority
          className="h-auto w-full max-w-xl object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export default Hero;
