import React from "react";
import ProductCard from "../../components/card/productCard";

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
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`,
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
      </div>
      <div>
        <p className="mb-2 px-3 text-xs text-gray-600 sm:px-4 sm:text-sm">
          মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
        </p>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-600">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </p>
      )}
    </main>
  );
};

export default Category;
