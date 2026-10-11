"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-[#f0f7f2] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm">
        <div className="text-5xl">🛒</div>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          পণ্যগুলো দেখানো যাচ্ছে না
        </h1>

        <p className="mt-3 text-gray-600">
          এই ক্যাটাগরির পণ্য লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা
          করুন।
        </p>

        <button
          onClick={() => router.push("/")}
          className="rounded-xl border border-emerald-700 px-5 py-3 font-semibold text-emerald-800 hover:bg-emerald-50"
        >
          হোমে ফিরে যান
        </button>
      </div>
    </main>
  );
}
