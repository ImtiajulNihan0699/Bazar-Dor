import Link from "next/link";
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
const formatPrice = (price: number) => price.toLocaleString("bn-BD");
const getUnitInBangla = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    gram: "গ্রাম",
    liter: "লিটার",
    piece: "টি",
    dozen: "ডজন",
  };

  return units[unit] ?? unit;
};

const Marquee = async () => {
  const res = await fetch(
    "https://api.api-store.workers.dev/api/bazardor/products",
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch market data");
  }

  const data: Product[] = await res.json();

  const products = data
    .filter((product) => product.change.dir === "up" || product.change.dir === "down")
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
            {products.map((product) => {
              const isUp = product.change.dir === "up";

              return (
                 <Link key={product.id} href={`/singleProduct/${product.id}`}>
                  
              <span
                  className="mx-4 inline-flex items-center gap-2 whitespace-nowrap py-2 px-2 border-l border-gray-100"
                >
                  <span className="text-xl">{product.image}</span>

                  <span className="font-medium">{product.nameBn}</span>

                  <span className="flex items-baseline gap-1">
                    <span className="text-lg font-extrabold">
                      ৳{formatPrice(product.today)}
                    </span>

                    <span className="text-sm">
                      /{getUnitInBangla(product.unit)}
                    </span>
                  </span>

                  <span
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                      isUp ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {isUp ? "▲" : "▼"}
                  </span>

                  <span
                    className={`font-semibold ${
                      isUp ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                  </span>
                </span>
              </Link>
              );
            })}
          </MarqueeText>
        </div>
      </div>
    </div>
  
  );
    
    
    
};

export default Marquee;
