"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type SortOption = "default" | "price-asc" | "price-desc";

interface ProductSortProps {
value: SortOption;
onChange: (value: SortOption) => void;
}

const ProductSort = ({ value, onChange }: ProductSortProps) => {
const [isOpen, setIsOpen] = useState(false);

const options: { label: string; value: SortOption }[] = [
{ label: "ডিফল্ট", value: "default" },
{ label: "দাম: কম থেকে বেশি", value: "price-asc" },
{ label: "দাম: বেশি থেকে কম", value: "price-desc" },
];

const selectedOption =
options.find((option) => option.value === value) ?? options[0];

return ( <div className="relative inline-block">
<button
type="button"
onClick={() => setIsOpen((prev) => !prev)}
className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
aria-haspopup="listbox"
aria-expanded={isOpen}
> <span className="text-gray-500">সাজান:</span> <span>{selectedOption.label}</span>
<ChevronDown
size={16}
className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
/> </button>
  {isOpen && (
    <ul
      role="listbox"
      className="absolute right-0 z-20 mt-2 min-w-52 overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
    >
      {options.map((option) => (
        <li key={option.value}>
          <button
            type="button"
            role="option"
            aria-selected={value === option.value}
            onClick={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2 text-left text-sm hover:bg-green-50 ${
              value === option.value
                ? "bg-green-50 font-semibold text-green-800"
                : "text-gray-700"
            }`}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  )}
</div>


);
};

export default ProductSort;
