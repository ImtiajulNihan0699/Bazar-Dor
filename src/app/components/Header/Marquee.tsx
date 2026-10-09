import MarqueeText from "react-fast-marquee";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  image: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const Marquee = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch market data");
  }

  const data: Product[] = await res.json();

  const products = data
    .filter(
      (item) => item.change.dir === "up" || item.change.dir === "down"
    )
    .slice(0, 10);

  return (
    <div className="w-full overflow-hidden border-t border-gray-200 text-gray-900">
      <div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <MarqueeText
            speed={40}
            direction="left"
            pauseOnHover
            gradient={false}
          >
            {products.map((item) => {
              const isUp = item.change.dir === "up";

              return (
                <span
                  key={item.id}
                  className="mx-4 inline-flex items-center gap-2 whitespace-nowrap py-2"
                >
                  <span className="text-xl">{item.image}</span>

                  <span className="font-medium">{item.nameBn}</span>

                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white ${
                      isUp ? "bg-green-600" : "bg-red-600"
                    }`}
                  >
                    {isUp ? "↑" : "↓"}
                  </span>

                  <span
                    className={`font-semibold ${
                      isUp ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {Math.abs(item.change.pct).toLocaleString("bn-BD")}%
                  </span>
                </span>
              );
            })}
          </MarqueeText>
        </div>
      </div>
    </div>
  );
};

export default Marquee;