"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link for navigation
import Image from "next/image"; // Import Image for optimized image rendering

interface User {
  id: string;
  username: string;
  name?: string;
  surname?: string;
  avatar?: string;
}

const SearchPage = ({ searchParams }: { searchParams: { query: string } }) => {
  const [results, setResults] = useState<User[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `/users?query=${encodeURIComponent(searchParams.query)}`
      );
      const data = await response.json();
      setResults(data.users);
    };

    if (searchParams.query) {
      fetchResults();
    }
  }, [searchParams.query]);

  return (
    <div className="p-6 gradient-background2">
      <h1 className="text-2xl font-bold mb-4">Search Results</h1>
      {results.length > 0 ? (
        <div className="flex flex-col gap-4">
          {results.map((user) => (
            <Link
              key={user.id}
              href={`/profile/${user.username}`} // Navigate to the user's profile page
              className="flex items-center p-4 border rounded-lg shadow-lg bg-white hover:bg-gray-500 transition"
            >
              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt={user.username}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                  width={48} // Set width as per the desired size
                  height={48} // Set height as per the desired size
                  loading="lazy" // Ensures images are lazy-loaded for better performance
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 flex items-center justify-center">
                  <span className="text-gray-600">No Image</span>
                </div>
              )}
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">{user.username}</h2>
                {user.name && user.surname && (
                  <p className="text-sm text-gray-600">
                    {user.name} {user.surname}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default SearchPage;
