"use client"; // Ensures this component runs on the client side

import React, { useEffect, useState } from "react";
import { fetchStories } from "@/lib/actions";
import Image from "next/image";

import { motion } from "framer-motion";
import FeatureMotionWrapper from "@/components/FeatureMotionWrapper";
import MotionWrapperDelay from "@/components/MotionWrapperDelay";

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
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-center font-bold mb-4 gradient-title zoom">
          Stories
        </h1>
      </MotionWrapperDelay>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.length > 0 ? (
          stories.map((story, index) => (
            <FeatureMotionWrapper key={story.id} index={index}>
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
                  className="max-w-full max-h-[400px] object-cover rounded-xl"
                />
              </motion.div>

              {/* Text section */}
              <div className="p-4">
                <p className="text-sm text-gray-600 text-center">
                  Posted by:{" "}
                  <span className="font-semibold">
                    {story.user.username || story.user.name || "User"}
                  </span>
                </p>
                <p className="mt-2 text-xs text-gray-500 text-center">
                  Created at: {new Date(story.createdAt).toLocaleString()}
                </p>
              </div>
            </FeatureMotionWrapper>
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
