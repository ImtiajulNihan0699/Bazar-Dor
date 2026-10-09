import React from "react";
import Image from "next/image";

const Hero = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h4 className="text-3xl bg-green-200 p-4 rounded-2xl font-bold text-green-900">
          {date}
        </h4>
        <h1 className="text-5xl font-bold text-gray-900 mt-4">
          আজকের বাজারের দাম এক নজরে
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          বচাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <button className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-sm transition-colors">
          সব পণ্য দেখুন
        </button>
      </div>
      <div>
        <Image  src="/assets/bazar-hero.png"
            alt="Bazar Hero"
            width={800}
            height={400} >
        </Image>
      </div>
    </div>
  );
};

export default Hero;
