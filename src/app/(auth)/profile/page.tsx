"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient, updateUser, useSession } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";
const labelClass = "mb-2 block text-sm font-semibold text-gray-800";
const cardClass =
  "rounded-2xl border border-gray-200 bg-white shadow-sm";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();

    setLoading(true);
    const toastId = toast.loading("আপডেট হচ্ছে...");

    try {
      const { error } = await updateUser({ name });

      if (error) {
        toast.error(
          error.message || "প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।",
          { id: toastId }
        );
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে", { id: toastId });
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const toastId = toast.loading("সাইন আউট হচ্ছে...");
    try {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি।", { id: toastId });
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
    return (
      <main className="min-h-[60vh] bg-[#f4f7f2] px-4 py-10">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="h-10 w-48 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-28 animate-pulse rounded-2xl bg-gray-200" />
          <div className="h-56 animate-pulse rounded-2xl bg-gray-200" />
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#f4f7f2] px-4 py-10">
        <section className={`${cardClass} w-full max-w-md p-8 text-center`}>
          <h1 className="text-2xl font-bold text-gray-900">
            প্রোফাইল দেখতে সাইন ইন করুন
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            আপনার প্রোফাইল দেখতে আগে সাইন ইন করতে হবে।
          </p>
          <Link
            href="/sign-in"
            className="mt-6 inline-block w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-800"
          >
            সাইন ইন করুন
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[#f4f7f2] px-4 py-10">
      <div className="mx-auto max-w-3xl">
        {/* শিরোনাম */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">আমার প্রোফাইল</h1>
          <p className="mt-1 text-sm text-gray-600">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* ইউজার কার্ড */}
        <section
          className={`${cardClass} flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between`}
        >
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold text-gray-900">
              {session.user?.name}
            </h2>
            <p className="mt-1 truncate text-base text-gray-500">
              {session.user?.email}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-600 bg-white px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 active:scale-95"
          >
            <span aria-hidden="true">↩</span>
            সাইন আউট
          </button>
        </section>

        {/* তথ্য কার্ড */}
        <section className={`${cardClass} mt-6 p-6 sm:p-8`}>
          <h2 className="mb-6 text-lg font-bold text-gray-900">তথ্য</h2>

          <Form className="flex w-full flex-col gap-5" onSubmit={handleUpdateUser}>
            <TextField
              isRequired
              name="name"
              defaultValue={session.user?.name ?? ""}
              validate={(value) =>
                value.trim().length < 3
                  ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে"
                  : null
              }
            >
              <Label className={labelClass}>নাম</Label>
              <Input className={inputClass} placeholder="আপনার নাম লিখুন" />
              <FieldError className="mt-1 text-sm text-red-600" />
            </TextField>

            <Button
              type="submit"
              isDisabled={loading}
              className="w-full rounded-lg bg-[#00843d] px-4 py-3 font-semibold text-white shadow-md transition-colors hover:bg-[#006b31] disabled:opacity-70"
            >
              {loading ? "অপেক্ষা করুন..." : "আপডেট"}
            </Button>
          </Form>
        </section>
      </div>
    </main>
  );
}