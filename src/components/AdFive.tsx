"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const AdFive = ({ size }: { size: "sm" | "md" | "lg" }) => {
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
      <div className="p-9 bg-indigo-500 rounded-lg shadow-lg text-sm border border-indigo-900">
        {/* TOP */}
        <div className="flex items-center justify-between text-gray-800 font-semibold">
          <span>Piano Lessons for All Ages</span>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 1 }}
            className="flex justify-center items-center"
          >
            <Image
              src="https://images.pexels.com/photos/2043571/pexels-photo-2043571.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="more"
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
                transition: { type: "spring", stiffness: 500, damping: 20 },
              }}
              whileTap={{
                scale: 1,
                transition: { type: "spring", stiffness: 500, damping: 20 },
              }}
              className="relative w-full h-full flex justify-center items-center"
            >
              <Image
                src="https://images.pexels.com/photos/2043571/pexels-photo-2043571.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="piano"
                fill
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>
          <p className={size === "sm" ? "text-xs" : "text-sm"}>
            {size === "sm"
              ? "Discover the joy of playing the piano. Lessons for beginners and advanced students."
              : size === "md"
              ? "Whether you're a beginner or an experienced player, our piano lessons offer personalized instruction to help you improve your skills. Learn from an experienced instructor."
              : "Immerse yourself in the world of music with our piano lessons. Suitable for children and adults alike, our classes are designed to nurture talent and provide a fun, engaging experience. Learn at your own pace and play your favorite pieces with confidence. Enroll today and start your musical journey!"}
          </p>

          <button className="bg-gray-800 w-full text-white p-2 text-xs rounded-lg hover:bg-gray-900 transition">
            Sign Up for Lessons
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default AdFive;
