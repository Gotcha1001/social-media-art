"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getFriends, deleteFriend } from "@/lib/actions"; // Import the delete action
import MotionWrapperDelay from "@/components/MotionWrapperDelay";
import FeatureMotionWrapper from "@/components/FeatureMotionWrapper";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast"; // Import toast

interface User {
  id: string;
  username: string;
  name?: string | null;
  surname?: string | null;
  avatar?: string | null;
}

const FriendsPage = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const { isSignedIn, isLoaded } = useAuth();

  useEffect(() => {
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

  const handleDeleteFriend = async (friendId: string) => {
    try {
      await deleteFriend(friendId); // Call the server action
      setFriends((prev) => prev.filter((friend) => friend.id !== friendId)); // Update the local state

      // Show a success toast
      toast.success("Friend removed successfully!");
    } catch (error) {
      console.error("Failed to delete friend:", error);

      // Show an error toast
      toast.error("Failed to remove friend.");
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
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
            {friends.map((friend, index) => (
              <FeatureMotionWrapper key={friend.id} index={index}>
                <div className="flex items-center p-4 border rounded-lg shadow-lg bg-white hover:bg-gray-500 transition relative">
                  {friend.avatar ? (
                    <Image
                      src={friend.avatar}
                      alt={friend.username}
                      width={50}
                      height={50}
                      className="rounded-full mr-4"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 mr-4" />
                  )}
                  <Link
                    href={`/profile/${friend.username}`}
                    className="flex-grow"
                  >
                    <div>
                      <p className="font-bold text-lg">
                        {friend.name || "Unknown"}
                      </p>
                      <p className="text-gray-500">@{friend.username}</p>
                    </div>
                  </Link>
                  <button
                    onClick={() => handleDeleteFriend(friend.id)}
                    className="absolute top-2 right-2 p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-700 transition"
                    aria-label={`Unfollow ${friend.username}`}
                  >
                    Unfollow
                  </button>
                </div>
              </FeatureMotionWrapper>
            ))}
          </div>
        ) : (
          <p>No friends found.</p>
        )}
      </MotionWrapperDelay>
    </div>
  );
};

export default FriendsPage;
