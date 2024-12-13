"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getSuggestedFriends, addFriend } from "@/lib/actions";
import MotionWrapperDelay from "@/components/MotionWrapperDelay"; // Optional animation component
import Image from "next/image";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import FeatureMotionWrapper from "@/components/FeatureMotionWrapper";

// FindFriends Component
const FindFriends = () => {
  const { user, isSignedIn } = useUser();
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch suggested friends
  useEffect(() => {
    const fetchFriends = async () => {
      if (!isSignedIn || !user) return;

      try {
        const friendSuggestions = await getSuggestedFriends();
        setFriends(friendSuggestions);
      } catch (error) {
        console.error("Error fetching friend suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [isSignedIn, user]);

  // Handle adding a friend
  const handleAddFriend = async (friendId: string) => {
    setError(null);

    if (!user || !user.id) {
      setError("User is not signed in.");
      return;
    }

    try {
      const response = await addFriend(friendId, user.id);

      if (response.error) {
        setError(response.error);
      } else {
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend.id !== friendId)
        );
        toast.success("Friend added successfully!");
      }
    } catch (error) {
      setError("Failed to add friend. Please try again.");
      console.error("Error adding friend:", error);
    }
  };

  if (loading) {
    return <div>Loading friend suggestions...</div>;
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
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-center font-bold mb-6 gradient-title">
          Friend Suggestions
        </h1>
      </MotionWrapperDelay>
      {error && <p className="error-message text-red-500 mb-4">{error}</p>}
      <div>
        {friends.length === 0 ? (
          <p>No suggestions available.</p>
        ) : (
          <ul className="space-y-4">
            {friends.map((friend) => (
              <FeatureMotionWrapper
                key={friend.id}
                index={friends.indexOf(friend)}
              >
                <motion.li
                  className="flex items-center justify-between p-4 border rounded-lg shadow-lg bg-white hover:bg-gray-100 transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                        {friend.avatar ? (
                          <Image
                            src={friend.avatar}
                            alt={friend.name}
                            height={20}
                            width={20}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-600">
                            {friend.name?.charAt(0)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{friend.name}</h2>
                    </div>
                  </div>
                  {friend.alreadyConnected ? (
                    <button
                      disabled
                      className="ml-4 py-2 px-4 bg-gray-500 text-white rounded-lg cursor-not-allowed"
                    >
                      Already Friends
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAddFriend(friend.id)}
                      className="ml-4 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      Add Friend
                    </button>
                  )}
                </motion.li>
              </FeatureMotionWrapper>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FindFriends;
