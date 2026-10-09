"use client";

import { useMemo, useState } from "react";
import ProductCard from "../card/productCard";
import ProductSort, { type SortOption } from "./productSort";

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

const CategoryProducts = ({ products }: { products: Product[] }) => {
const [sort, setSort] = useState<SortOption>("default");

const sortedProducts = useMemo(() => {
const result = [...products];

if (sort === "price-asc") {
  result.sort((a, b) => a.today - b.today);
} else if (sort === "price-desc") {
  result.sort((a, b) => b.today - a.today);
}

return result;

}, [products, sort]);

return (
<> <div className="mb-4 flex justify-end"> <ProductSort value={sort} onChange={setSort} /> </div>

  <p className="mb-2 px-3 text-xs text-gray-600 sm:px-4 sm:text-sm">
    মোট {sortedProducts.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
  </p>

  {sortedProducts.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {sortedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <p className="rounded-xl bg-gray-50 p-6 text-center text-gray-600">
      এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
    </p>
  )}
</>


);
};

export default CategoryProducts;
