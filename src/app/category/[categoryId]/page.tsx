import React from "react";
import ProductCard from "../../components/card/productCard";
import CategoryProducts from "@/app/components/categoryProducts/CategoryProducts";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface CategoryPageProps {
  params: Promise<{
    categoryId: string;
  }>;
}

const Category = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;

  const response = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products?category=${categoryId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  }

  const products: Product[] = await response.json();

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-xl border border-gray-200 p-4">
        <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
          {products[0]?.categoryIcon} {products[0]?.categoryNameBn ?? "পণ্য"}
        </h1>

        <p className="mt-2 text-gray-600">
          {products.length.toLocaleString("bn-BD")} টি পণ্যের আজকের দাম ও
          পরিবর্তন
        </p>
        <CategoryProducts products={products} />
      </div>
    </main>
  );
};

export default Category;
