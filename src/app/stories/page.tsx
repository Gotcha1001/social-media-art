"use client"; // Ensures this component runs on the client side

import React, { useEffect, useState } from "react";
import { fetchStories } from "@/lib/actions";
import MotionImageAll from "@/components/MotionImageAll"; // Import your motion image wrapper

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
    <div className=" mx-auto px-4 py-8 gradient-background2">
      <h1 className="text-3xl font-bold text-center mb-6">Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.length > 0 ? (
          stories.map((story) => (
            <div
              key={story.id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
            >
              <MotionImageAll
                src={story.img}
                alt={`Story by ${
                  story.user.username || story.user.name || "User"
                }`}
                width={600}
                height={400}
                className="w-full h-48"
              />
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
            </div>
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
