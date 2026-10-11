// app/(auth)/sign-up/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signIn, signUp, signOut } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";
const labelClass = "mb-2 block text-sm font-semibold text-gray-700";
const socialBtnClass =
  "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50";

const SignUpPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    // ব্যাকআপ validation (toast সহ)
    if (!data.name || data.name.trim().length < 3) {
      toast.error("নাম কমপক্ষে ৩ অক্ষরের হতে হবে");
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data.email ?? "")) {
      toast.error("সঠিক ইমেইল ঠিকানা লিখুন");
      return;
    }
    if (
      !data.password ||
      data.password.length < 8 ||
      !/[A-Z]/.test(data.password) ||
      !/[0-9]/.test(data.password)
    ) {
      toast.error(
        "পাসওয়ার্ড কমপক্ষে ৮ অক্ষর, একটি বড় হাতের অক্ষর ও একটি সংখ্যা সহ হতে হবে"
      );
      return;
    }
    if (data.password !== data.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("অ্যাকাউন্ট তৈরি হচ্ছে...");

    try {
      const { data: resdata, error } = await signUp.email({
        name: data.name.trim(),
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(
          error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।",
          { id: toastId }
        );
        return;
      }

      if (resdata) {
        // অটো লগইন বাতিল করে login পেজে পাঠানো
        await signOut();
        toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এখন সাইন ইন করুন।", {
          id: toastId,
        });
        router.push("/sign-in");
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    const toastId = toast.loading(
      provider === "google"
        ? "Google-এ নেওয়া হচ্ছে..."
        : "GitHub-এ নেওয়া হচ্ছে..."
    );
    try {
      const { error } = await signIn.social({
        provider,
        callbackURL: "/",
      });
      if (error) {
        toast.error(error.message || "সাইন ইন করা যায়নি। আবার চেষ্টা করুন।", {
          id: toastId,
        });
      }
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।", {
        id: toastId,
      });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-green-900/10 sm:p-9">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <Form
          className="flex w-full flex-col gap-5"
          onSubmit={onSubmit}
          onInvalid={() => toast.error("অনুগ্রহ করে ফর্মের ভুলগুলো ঠিক করুন")}
        >
          <TextField
            isRequired
            name="name"
            validate={(value) =>
              value.trim().length < 3 ? "নাম কমপক্ষে ৩ অক্ষরের হতে হবে" : null
            }
          >
            <Label className={labelClass}>নাম</Label>
            <Input className={inputClass} placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError className="mt-1 text-sm text-red-600" />
          </TextField>

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

          <TextField
            isRequired
            name="password"
            type="password"
            value={password}
            onChange={setPassword}
            validate={(value) => {
              if (value.length < 8) return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              if (!/[A-Z]/.test(value))
                return "কমপক্ষে একটি ইংরেজি বড় হাতের অক্ষর দিন";
              if (!/[0-9]/.test(value)) return "কমপক্ষে একটি সংখ্যা দিন";
              return null;
            }}
          >
            <Label className={labelClass}>পাসওয়ার্ড</Label>
            <Input className={inputClass} placeholder="কমপক্ষে ৮ অক্ষর" />
            <FieldError className="mt-1 text-sm text-red-600" />
          </TextField>

          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            validate={(value) =>
              value !== password ? "পাসওয়ার্ড দুটি মিলছে না" : null
            }
          >
            <Label className={labelClass}>পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input className={inputClass} placeholder="আবার পাসওয়ার্ড লিখুন" />
            <FieldError className="mt-1 text-sm text-red-600" />
          </TextField>

          <Button
            className="mt-2 w-full rounded-lg bg-green-800 px-4 py-3 font-semibold text-white shadow-md transition-colors hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            type="submit"
            isDisabled={loading}
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
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
            Google দিয়ে সাইন আপ করুন
          </Button>
          <Button
            type="button"
            className={socialBtnClass}
            onPress={() => handleSocialSignIn("github")}
          >
            GitHub দিয়ে সাইন আপ করুন
          </Button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            সাইন ইন করুন
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

export default SignUpPage;