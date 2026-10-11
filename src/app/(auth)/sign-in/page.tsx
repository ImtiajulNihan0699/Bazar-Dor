"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";
const labelClass = "mb-2 block text-sm font-semibold text-gray-700";
const socialBtnClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    setLoading(true);
    const { data: resdata, error } = await signIn.email({
      email: data.email,
      password: data.password,
    });
    setLoading(false);

    if (error) {
      alert(error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    if (resdata) {
      router.push("/");
      router.refresh();
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    const { error } = await signIn.social({
      provider,
      callbackURL: "/",
    });
    if (error) {
      alert(error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-green-900/10 sm:p-9">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            সাইন ইন করুন
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            আপনার অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </div>

        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) =>
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                ? "সঠিক ইমেইল ঠিকানা লিখুন"
                : null
            }
          >
            <Label className={labelClass}>ইমেইল</Label>
            <Input className={inputClass} placeholder="you@example.com" />
            <FieldError className="mt-1 text-sm text-red-600" />
          </TextField>

          <TextField isRequired name="password" type="password">
            <Label className={labelClass}>পাসওয়ার্ড</Label>
            <Input className={inputClass} placeholder="আপনার পাসওয়ার্ড লিখুন" />
            <FieldError className="mt-1 text-sm text-red-600" />
          </TextField>

          <Button
            className="mt-2 w-full rounded-lg bg-green-800 px-4 py-3 font-semibold text-white shadow-md transition-colors hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            type="submit"
            isDisabled={loading}
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
          </Button>
        </Form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs font-medium text-gray-400">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="flex flex-col gap-3">
          <Button
            type="button"
            className={socialBtnClass}
            onPress={() => handleSocialSignIn("google")}
          >
            Google দিয়ে সাইন ইন করুন
          </Button>
          <Button
            type="button"
            className={socialBtnClass}
            onPress={() => handleSocialSignIn("github")}
          >
            GitHub দিয়ে সাইন ইন করুন
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            সাইন আপ করুন
          </Link>
        </p>
      </section>

      <Link
        href="/"
        className="text-sm font-medium text-gray-600 transition-colors hover:text-green-800 hover:underline"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
};

export default SignInPage;