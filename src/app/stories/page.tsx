"use client"; // Ensures this component runs on the client side

import React, { useEffect, useState, useRef } from "react";
import { fetchStories } from "@/lib/actions";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import FeatureMotionWrapper from "@/components/FeatureMotionWrapper";
import MotionWrapperDelay from "@/components/MotionWrapperDelay";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StoriesPage = () => {
  const [stories, setStories] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 10;
  const storiesContainerRef = useRef<HTMLDivElement>(null);

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

  // Scroll to top when page changes
  useEffect(() => {
    // Option 1: Smooth scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Option 2: Scroll to stories container if you want more precise scrolling
    if (storiesContainerRef.current) {
      storiesContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  // Calculate paginated stories
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  // Calculate total pages
  const totalPages = Math.ceil(stories.length / storiesPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    // Prevent pagination outside of valid range
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Pagination button variants for animation
  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  // Stories grid animation
  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

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
        <h1
          ref={storiesContainerRef}
          className="text-5xl md:text-7xl lg:text-8xl text-center font-bold mb-4 gradient-title zoom"
        >
          Stories
        </h1>
      </MotionWrapperDelay>

      {/* Stories Grid with Animation */}
      <AnimatePresence>
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {currentStories.length > 0 ? (
            currentStories.map((story, index) => (
              <FeatureMotionWrapper key={story.id} index={index}>
                {/* Image section with hover and tap animation */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
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
              No stories available, or fetching...
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-full ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </motion.button>

        <span className="text-lg font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-full ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default StoriesPage;
