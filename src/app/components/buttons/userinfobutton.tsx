
"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const UserInfoButton = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  if (isPending) {
    return (
      <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-100" />
    );
  }

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      {user ? (
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-gray-800">{user.name}</h2>

          <button
            onClick={handleSignOut}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-600 active:scale-95"
          >
            সাইন আউট
          </button>
        </div>
      ) : (
        <div>
          <Link
            href="/sign-in"
            className="inline-block rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="ml-2 inline-block rounded-lg bg-green-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-green-600"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfoButton;
