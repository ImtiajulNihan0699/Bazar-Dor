"use client";

import React from "react";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    if (data.password !== data.confirmPassword) {
      alert("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    const { data: resdata, error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    if (error) {
      alert(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    if (resdata) {
      router.push("/");
    }

    console.log("Sign up successful:", resdata);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-green-900/10 sm:p-9">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.trim().length < 3) {
                return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে";
              }
              return null;
            }}
          >
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              নাম
            </Label>
            <Input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="যেমন: রহিম উদ্দিন"
            />
            <FieldError className="mt-1 text-sm text-red-600" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "সঠিক ইমেইল ঠিকানা লিখুন";
              }
              return null;
            }}
          >
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              ইমেইল
            </Label>
            <Input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="you@example.com"
            />
            <FieldError className="mt-1 text-sm text-red-600" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            minLength={8}
            validate={(value) => {
              if (value.length < 8) {
                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
              }
              if (!/[A-Z]/.test(value)) {
                return "কমপক্ষে একটি ইংরেজি বড় হাতের অক্ষর দিন";
              }
              if (!/[0-9]/.test(value)) {
                return "কমপক্ষে একটি সংখ্যা দিন";
              }
              return null;
            }}
          >
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              পাসওয়ার্ড
            </Label>
            <Input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
            <FieldError className="mt-1 text-sm text-red-600" />
          </TextField>

          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            validate={(value) => {
              const passwordInput = document.querySelector<HTMLInputElement>(
                'input[name="password"]',
              );

              if (value !== passwordInput?.value) {
                return "পাসওয়ার্ড দুটি মিলছে না";
              }
              return null;
            }}
          >
            <Label className="mb-2 block text-sm font-semibold text-gray-700">
              পাসওয়ার্ড নিশ্চিত করুন
            </Label>
            <Input
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
              placeholder="আবার পাসওয়ার্ড লিখুন"
            />
            <FieldError className="mt-1 text-sm text-red-600" />
          </TextField>

          <Button
            className="mt-2 w-full rounded-lg bg-green-800 px-4 py-3 font-semibold text-white shadow-md transition-colors hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            type="submit"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Button>
        </Form>

        <p className="mt-6 text-center text-xs leading-5 text-gray-500">
          সাইন আপ করার মাধ্যমে আপনি আপনার অ্যাকাউন্ট তৈরি করতে সম্মত হচ্ছেন।
        </p>
      </section>
    </main>
  );
};

export default SignUpPage;