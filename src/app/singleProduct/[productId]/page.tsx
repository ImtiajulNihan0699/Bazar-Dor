import ProductDetailsCard from "@/app/components/card/productDetailsCard";
import React from "react";

const page = async ({ params }: { params: { productId: string } }) => {
  const { productId } = await params;
  const response = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product data");
  }
  const product = await response.json();
  console.log(product);
  return (
    <div>
      <ProductDetailsCard product={product} />
    </div>
  );
};

export default page;
