import Link from "next/link";
import React from "react";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  const changeColor = isUp
    ? "text-red-600"
    : isDown
      ? "text-green-600"
      : "text-gray-500";

  const changeBg = isUp
    ? "bg-red-50"
    : isDown
      ? "bg-green-50"
      : "bg-gray-100";

  const arrow = isUp ? "▲" : isDown ? "▼" : "—";

  const unitLabel: Record<string, string> = {
    kg: "প্রতি কেজি",
    piece: "প্রতি পিস",
    liter: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
  };
console.log(product)
  return (
   <Link href={`/singleProduct/${product.id}`}>
    <article className="rounded-[22px] border border-[#dce5dc] bg-[#fbfcfb] p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-md">
      <div className="flex items-center gap-4">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-2xl bg-[#eff4ef] text-3xl">
          {product.image}
        </div>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-bold text-gray-900">
            {product.nameBn}
          </h2>

          <p className="mt-1 text-sm text-gray-600">
            {unitLabel[product.unit] ?? `প্রতি ${product.unit}`}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm text-gray-600">আজকের দাম</p>

        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="text-xl font-bold text-gray-900">
            {product.today.toLocaleString("bn-BD")} টাকা
          </p>

          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${changeBg} ${changeColor}`}
          >
            <span className="text-xs">{arrow}</span>

            {!isFlat
              ? `${Math.abs(product.change.pct).toLocaleString("bn-BD")}٪`
              : "০.০٪"}
          </span>
        </div>
      </div>
    </article>
   </Link>
  );
};

export default ProductCard;