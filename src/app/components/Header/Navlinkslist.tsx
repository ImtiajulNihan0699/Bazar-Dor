"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavlinksProps {
  id: string;
  nameBn: string;
  slug: string;
  icon: string;
}

const baseClass =
  "shrink-0 rounded-full px-3 py-1.5 transition-colors whitespace-nowrap";
const activeClass = "bg-green-100 font-semibold text-green-800";
const inactiveClass = "font-medium text-gray-700 hover:text-green-600";

const NavlinksList = ({ data }: { data: NavlinksProps[] }) => {
  const pathname = usePathname();

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 overflow-x-auto py-3">
        <Link
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          className={`${baseClass} ${
            pathname === "/" ? activeClass : inactiveClass
          }`}
        >
          হোম
        </Link>

        {data.map((item) => {
          const href = `/category/${item.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={item.id}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`${baseClass} ${
                isActive ? activeClass : inactiveClass
              }`}
            >
              <span>{item.icon}</span> {item.nameBn}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavlinksList;