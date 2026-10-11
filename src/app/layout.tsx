import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "./components/Header/Header";
import { Suspense } from "react";
import Footer from "./components/Header/footer";
import { Toaster } from "react-hot-toast";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজারদর",
  description: "প্রতিদিনের নিত্যপণ্যের দাম এক জায়গায়",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<div className="h-16 w-full animate-pulse bg-gray-100" />}>
          <Header />
        </Suspense>
        <div>{children}</div>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}