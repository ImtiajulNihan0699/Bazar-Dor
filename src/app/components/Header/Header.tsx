
import React from 'react';
import Image from 'next/image';
import { connection } from "next/server";
import Navlinks from './Navlinks';
import Marquee from './Marquee';
import Link from 'next/link';

const Header = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-center gap-4">

        {/* Logo, Title and Date */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="bg-green-500 rounded-xl p-3 flex items-center justify-center shrink-0 shadow-sm">
         <Link href="/">
            <Image 
              src="/assets/logo-icon.png"
              alt="Logo"
              width={44}
              height={44}
              className="object-contain"
            />
         </Link>
          </div>

          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              বাজার দর
            </h1>

            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              {date}
            </p>
          </div>
        </div>

        {/* Sign In and Sign Up */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            সাইন ইন
          </button>

          <button className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors">
            সাইন আপ
          </button>
        </div>
      </div>

      <Navlinks />
      <Marquee/>
    </header>
  );
};

export default Header;