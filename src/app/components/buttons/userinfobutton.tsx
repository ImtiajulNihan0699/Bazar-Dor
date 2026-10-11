"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const UserInfoButton = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    const toastId = toast.loading("সাইন আউট হচ্ছে...");

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।", {
          id: toastId,
        });
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে", { id: toastId });
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    }
  };

  if (isPending) {
    return <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-100" />;
  }

  return (
    <div className="flex w-full items-center gap-2 sm:w-auto">
      {user ? (
        <div className="flex items-center gap-3">
          <span className="max-w-[140px] truncate font-semibold text-gray-800">
            {user.name}
          </span>

          <Link
            href="/profile"
            className="inline-flex items-center justify-center rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-800 active:scale-95"
          >
            আপডেট
          </Link>

          <button
            type="button"
            onClick={handleSignOut}
            className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600 active:scale-95"
          >
            সাইন আউট
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="inline-block rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="inline-block rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfoButton;