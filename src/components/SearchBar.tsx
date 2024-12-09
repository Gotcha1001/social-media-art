"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface SearchBarProps {
  onSearchSubmit?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchSubmit }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      // Redirect to the search results page
      router.push(`/users/search?query=${encodeURIComponent(value)}`);

      // Call the onSearchSubmit callback if provided
      if (onSearchSubmit) {
        onSearchSubmit();
      }
    }
  };

  const handleFocus = () => {
    // Clear the input when focused, but only if the query is not already empty
    if (query !== "") {
      setQuery("");
    }
  };

  // Reset query when navigating away from search page
  useEffect(() => {
    if (!pathname.includes("/users/search")) {
      setQuery("");
    }
  }, [pathname]);

  return (
    <div className="flex p-2 bg-slate-100 items-center rounded-xl">
      <input
        type="text"
        placeholder="Search for users..."
        value={query}
        onChange={handleSearch}
        onFocus={handleFocus}
        className="bg-transparent outline-none w-full"
      />
    </div>
  );
};

export default SearchBar;
