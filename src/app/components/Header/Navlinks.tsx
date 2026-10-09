import Link from "next/link";

interface NavlinksProps {
  id: string;
  nameBn: string;
  slug: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch navigation links");
  }

  const data: NavlinksProps[] = await res.json();

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6 overflow-x-auto py-3">
        <Link href="/" className="shrink-0 font-semibold">
          হোম
        </Link>

        {data.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.slug}`}
            className="shrink-0 font-medium hover:text-green-600"
          >
            <span>{item.icon}</span>{" "}
            {item.nameBn}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navlinks;
