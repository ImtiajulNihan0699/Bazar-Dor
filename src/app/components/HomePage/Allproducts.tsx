
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

async function Allproducts() {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

 const increasedProducts = products
  .filter((product) => product.change.dir === "up")
  .slice(0, 6);

 const decreasedProducts = products
  .filter((product) => product.change.dir === "down")
  .slice(0, 6);

  return (
    <main className="mx-auto max-w-7xl space-y-12 px-4 py-8">
      {/* Products with increased prices */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-red-600">
          ▲ আজ দাম বেড়েছে
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {increasedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Products with decreased prices */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-green-600">
          ▼ আজ দাম কমেছে
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {decreasedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All products */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            সব পণ্য
          </h2>

          <p className="mt-2 text-gray-600">
            মোট {products.length.toLocaleString("bn-BD")} টি পণ্য দেখানো হচ্ছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Allproducts;
