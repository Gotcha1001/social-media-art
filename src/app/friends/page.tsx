"use client";
import { useEffect, useState } from "react";
import Link from "next/link"; // Import Link for navigation
import Image from "next/image"; // Import Image for optimized image rendering
import { getFriends } from "@/lib/actions";
import MotionWrapperDelay from "@/components/MotionWrapperDelay";
import { useAuth } from "@clerk/nextjs";

interface User {
  id: string;
  username: string;
  name?: string | null; // Allow null as the response type is string | null
  surname?: string | null; // Allow null
  avatar?: string | null; // Allow null
}

const FriendsPage = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const { isSignedIn, isLoaded } = useAuth(); // Clerk's auth state

  useEffect(() => {
    // Fetch friends only if the user is authenticated
    const fetchFriends = async () => {
      try {
        if (isSignedIn) {
          const data = await getFriends();
          setFriends(data);
        }
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, [isSignedIn]);

  if (!isLoaded) {
    // Wait for the auth state to load
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    // Display a message if not authenticated
    return (
      <div className="p-6 gradient-background2 flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
        <p className="text-gray-500 mb-6">
          Please sign in to view your friends.
        </p>
        <Link href="/sign-in" className="text-blue-500 hover:underline">
          Go to Sign In Page
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 gradient-background2">
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 2, delay: 0.9 }}
        variants={{
          hidden: { opacity: 0, x: 100 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-center font-bold mb-4 gradient-title">
          My Friends
        </h1>
      </MotionWrapperDelay>

      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        variants={{
          hidden: { opacity: 0, y: 100 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        {friends.length > 0 ? (
          <div className="flex flex-col gap-4">
            {friends.map((friend) => (
              <Link
                key={friend.id}
                href={`/profile/${friend.username}`} // Navigate to the friend's profile page
                className="flex items-center p-4 border rounded-lg shadow-lg bg-white hover:bg-gray-500 transition"
              >
                {friend.avatar ? (
                  <Image
                    src={friend.avatar}
                    alt={friend.username}
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
                  <h2 className="text-lg font-semibold">{friend.username}</h2>
                  {friend.name && friend.surname && (
                    <p className="text-sm text-gray-600">
                      {friend.name} {friend.surname}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You have no friends yet.</p>
        )}
      </MotionWrapperDelay>
    </div>
  );
};

export default FriendsPage;
