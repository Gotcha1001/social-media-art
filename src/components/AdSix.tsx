"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const AdSix = ({ size }: { size: "sm" | "md" | "lg" }) => {
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
      <div className="p-9 gradient-background7 rounded-lg shadow-lg text-sm border border-blue-700">
        {/* TOP */}
        <div className="flex items-center justify-between text-white font-semibold">
          <span>Midnight Beach Art Classes</span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="flex justify-center items-center"
          >
            <Image
              src="https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800"
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
                src="https://images.pexels.com/photos/1585325/pexels-photo-1585325.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="beach art"
                fill
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>
          <p className={size === "sm" ? "text-xs" : "text-sm"}>
            {size === "sm"
              ? "Join us for creative midnight art sessions on the beach. Bring your friend and enjoy a night of painting under the stars."
              : size === "md"
              ? "Experience the joy of painting in a serene midnight beach setting. Bring a friend and learn new artistic techniques with expert guidance. Unleash your creativity under the moonlight!"
              : "Immerse yourself in an unforgettable night of art and inspiration at our midnight beach art classes. Perfect for friends and solo artists alike, enjoy painting lessons guided by professional instructors, all while being surrounded by the soothing sounds of the waves and a starlit sky. Bring a friend, make new memories, and create your masterpiece under the moonlight!"}
          </p>

          <button className="bg-blue-700 w-full text-white p-2 text-xs rounded-lg hover:bg-blue-800 transition">
            Join the Midnight Class
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default AdSix;
