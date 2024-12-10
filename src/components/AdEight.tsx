"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const AdEight = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <MotionWrapperDelay
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      variants={{
        hidden: { opacity: 0, translateY: 20 },
        visible: { opacity: 1, translateY: 0 },
      }}
    >
      <div className="p-8 gradient-background5 rounded-lg shadow-lg text-sm border border-blue-300">
        {/* TOP */}
        <div className="flex items-center justify-between text-black font-semibold">
          <span>Programming Classes for All Levels</span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="flex justify-center items-center"
          >
            <Image
              src="https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="coding"
              width={16}
              height={16}
            />
          </motion.div>
        </div>
        {/* BOTTOM */}
        <div
          className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
        >
          <div
            className={`relative w-full ${
              size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
            }`}
          >
            <motion.div
              whileHover={{
                scale: 1.1,
                y: -10, // Bounce effect on hover
                transition: { type: "spring", stiffness: 500, damping: 20 },
              }}
              whileTap={{
                scale: 1,
                y: 0, // Reset bounce on tap
                transition: { type: "spring", stiffness: 500, damping: 20 },
              }}
              className="relative w-full h-full flex justify-center items-center"
            >
              <Image
                src="https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="coding"
                fill
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>
          <p className={size === "sm" ? "text-xs" : "text-sm"}>
            {size === "sm"
              ? "Enhance your coding skills with our interactive programming courses."
              : size === "md"
              ? "Ready to master programming? Join our classes designed for all levels—from beginner to expert—and start coding today!"
              : "Unlock the power of programming with our comprehensive classes. Perfect for beginners and experienced coders alike, our courses cover a range of languages and frameworks. Join us and start building your projects and enhancing your career!"}
          </p>

          <button className="bg-blue-600 w-full text-white p-2 text-xs rounded-lg hover:bg-blue-700 transition">
            Join the Programming Class
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default AdEight;
