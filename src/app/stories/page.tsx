"use client"; // Ensures this component runs on the client side

import React, { useEffect, useState } from "react";
import { fetchStories } from "@/lib/actions";
import Image from "next/image";
import { motion } from "framer-motion";

// Helper function to generate a random number within a range
const getRandomDirection = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const StoriesPage = () => {
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    const getStories = async () => {
      try {
        const fetchedStories = await fetchStories();
        setStories(fetchedStories);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      }
    };

    getStories();
  }, []);

  return (
    <div className="mx-auto px-4 py-8 gradient-background2">
      <h1 className="text-3xl font-bold text-center mb-6">Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.length > 0 ? (
          stories.map((story, index) => (
            <motion.div
              key={story.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col"
              initial={{
                x: getRandomDirection(-200, 200), // Random horizontal movement
                y: getRandomDirection(-200, 200), // Random vertical movement
                opacity: 0,
              }}
              animate={{
                x: 0,
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.5 + index * 0.3, // Different speed for each card
                delay: 0.3 + index * 0.1, // Incremental delay
              }}
            >
              {/* Image section with hover and tap animation */}
              <motion.div
                whileHover={{ scale: 1.05 }} // Scale effect on hover
                whileTap={{ scale: 0.95 }} // Scale effect on tap
                transition={{ type: "spring", stiffness: 300 }} // Snappy spring transition
                className="w-full flex justify-center items-center"
              >
                <Image
                  src={story.img}
                  alt={`Story by ${
                    story.user.username || story.user.name || "User"
                  }`}
                  width={600}
                  height={400}
                  className="max-w-full max-h-[400px] object-contain rounded-md"
                />
              </motion.div>

              {/* Text section */}
              <div className="p-4">
                <p className="text-sm text-gray-600">
                  Posted by:{" "}
                  <span className="font-semibold">
                    {story.user.username || story.user.name || "User"}
                  </span>
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  Created at: {new Date(story.createdAt).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No stories available.
          </p>
        )}
      </div>
    </div>
  );
};

export default StoriesPage;
