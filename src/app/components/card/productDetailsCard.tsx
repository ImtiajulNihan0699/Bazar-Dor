interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

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
  markets: Market[];
}

interface ProductDetailsCardProps {
  product: Product;
}

export default function ProductDetailsCard({
  product,
}: ProductDetailsCardProps) {
  const formatPrice = (price: number) => price.toLocaleString("bn-BD");

  const priceChangeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-600"
        : "text-gray-500";

  const priceChangeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "●";

  const priceChangeText =
    product.change.dir === "up"
      ? "গতকালের তুলনায় দাম বেড়েছে"
      : product.change.dir === "down"
        ? "গতকালের তুলনায় দাম কমেছে"
        : "দামের পরিবর্তন নেই";

  const minPrice = Math.min(...product.markets.map((market) => market.min));

  const maxPrice = Math.max(...product.markets.map((market) => market.max));

  const averagePrice =
    product.markets.reduce(
      (total, market) => total + (market.min + market.max) / 2,
      0,
    ) / product.markets.length;
  //     {
  //       title: "সর্বনিম্ন দাম",
  //       price: product.yesterday,
  //       icon: "📅",
  //       color: "red",
  //     },
  //     {
  //       title: "গত সপ্তাহ",
  //       price: product.lastWeek,
  //       icon: "📅",
  //       color: "blue",
  //     },
  //     {
  //       title: "গত মাস",
  //       price: product.lastMonth,
  //       icon: "📅",
  //       color: "purple",
  //     },
  //   ];

  const priceDifference = Math.abs(product.today - product.yesterday);
  const getUnitInBangla = (unit: string) => {
    const units: Record<string, string> = {
      kg: "কেজি",
      gram: "গ্রাম",
      liter: "লিটার",
      piece: "টি",
      dozen: "ডজন",
    };

    return units[unit.toLowerCase()] || unit;
  };
  return (
    <main className="min-h-screen bg-[#f0f7f2] px-3 py-5 text-gray-800 sm:px-6 sm:py-8">
      <div className="mx-auto max-w-6xl space-y-5">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-emerald-800">
          <span>⌂</span>
          <span>হোম</span>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <span className="font-semibold">{product.nameBn}</span>
        </nav>

        {/* Product summary */}
        <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* Product image / emoji */}
            <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-[#edf4e7] text-5xl sm:size-36 sm:text-6xl">
              {product.image}
            </div>

            {/* Product information */}
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                প্রতি {getUnitInBangla(product.unit)} : {product.categoryNameBn}
              </p>

              <p className="mt-3 text-sm leading-6 text-gray-600">
                {priceChangeText}:{" "}
                {product.change.dir === "up"
                  ? `${priceDifference.toLocaleString("bn-BD")}`
                  : product.change.dir === "down"
                    ? `${priceDifference.toLocaleString("bn-BD")}`
                    : "০"}{" "}
                টাকা
              </p>
            </div>

            {/* Today's price */}
            <div className="w-full shrink-0 rounded-2xl bg-gradient-to-br from-[#e7f5eb] to-[#dff0e5] p-5 flex flex-col items-center sm:w-64">
              <p className="font-semibold text-emerald-900">আজকের দাম</p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-emerald-800">
                  ৳{formatPrice(product.today)}
                </span>
                <span className="text-sm text-gray-600">
                  /{getUnitInBangla(product.unit)}
                </span>
              </div>

              <p className={`mt-3 text-lg font-bold ${priceChangeColor}`}>
                {priceChangeIcon}{" "}
                {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
              </p>
            </div>
          </div>
        </section>

        {/* Price comparison */}
        <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
          {/* Price Summary */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-gray-800">
              দামের সারসংক্ষেপ
            </h2>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {/* Minimum Price */}
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-600">সর্বনিম্ন দাম</p>

                <p className="mt-1 text-xl font-bold text-green-600">
                  ৳{minPrice.toLocaleString("bn-BD")}
                  <span className="ml-1 text-xs font-normal">টাকা</span>
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  সবচেয়ে কম দামের বাজার
                </p>
              </div>

              {/* Maximum Price */}
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-600">সর্বোচ্চ দাম</p>

                <p className="mt-1 text-xl font-bold text-red-600">
                  ৳{maxPrice.toLocaleString("bn-BD")}
                  <span className="ml-1 text-xs font-normal">টাকা</span>
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  সবচেয়ে বেশি দামের বাজার
                </p>
              </div>

              {/* Average Price */}
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs text-gray-600">গড় দাম</p>

                <p className="mt-1 text-xl font-bold text-green-600">
                  ৳{Math.round(averagePrice).toLocaleString("bn-BD")}
                  <span className="ml-1 text-xs font-normal">টাকা</span>
                </p>

                <p className="mt-1 text-xs text-gray-500">
                প্রতি {getUnitInBangla(product.unit)}-এর হিসাবে
                </p>
              </div>
            </div>
          </section>
        </section>

        {/* Market prices */}
        <section className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 sm:text-2xl">
              বাজারভিত্তিক আজকের দাম
            </h2>
          </div>

          {/* Responsive table */}
          <div className="overflow-x-auto rounded-xl border border-emerald-100">
            <table className="w-full min-w-[600px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#e8f4ed] text-emerald-950">
                  <th className="px-4 py-4 font-bold">বাজারের নাম</th>

                  <th className="px-4 py-4 font-bold">বিভাগ</th>

                  <th className="px-4 py-4 text-right font-bold">
                    সর্বনিম্ন (৳)
                  </th>

                  <th className="px-4 py-4 text-right font-bold">
                    সর্বোচ্চ (৳)
                  </th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className={`border-t border-gray-100 transition-colors hover:bg-emerald-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-[#f5f9f6]"
                    }`}
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-800">
                      {market.market}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-gray-600">
                      {market.division}
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-800">
                      {formatPrice(market.min)} টাকা
                    </td>

                    <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-gray-800">
                      {formatPrice(market.max)} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
