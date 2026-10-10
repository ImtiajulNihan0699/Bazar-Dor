"use client";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const UserInfoButton = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  console.log(user);

  const handleSignOut=async() => {
    await authClient.signOut();
  }

  return (
    <div className="flex items-center gap-2 w-full sm:w-auto">
      {user ? (
        <div>
          <h2> {user?.name} </h2>
          <button onClick={handleSignOut} className="p-2 border-2 bg-red-500 text-white">Signout</button>
        </div>
      ) : (
        <div>
          <Link href="/sign-in">
            <button className="flex-1 sm:flex-none text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              সাইন ইন
            </button>
          </Link>
          <Link href="/sign-up">
            <button className="flex-1 sm:flex-none bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm transition-colors">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfoButton;
