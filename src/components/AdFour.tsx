"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const AdFour = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <MotionWrapperDelay
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 },
      }}
    >
      <div className="p-9 bg-pink-300 rounded-lg shadow-lg text-sm">
        {/* TOP */}
        <div className="flex items-center justify-between text-gray-800 font-bold">
          <span>Order Your Favorite Cakes</span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="flex justify-center items-center"
          >
            <Image
              src="https://images.pexels.com/photos/1674065/pexels-photo-1674065.jpeg?auto=compress&cs=tinysrgb&w=800"
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
                src="https://images.pexels.com/photos/1674065/pexels-photo-1674065.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="cake"
                fill
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>
          <p className={size === "sm" ? "text-xs" : "text-sm"}>
            {size === "sm"
              ? "Order delicious custom cakes for any occasion. Contact Susan for details."
              : size === "md"
              ? "Looking for the perfect cake for your celebration? Susan's custom cakes are made fresh to your liking. Contact her now to place your order."
              : "Treat yourself and your loved ones to a special custom cake from Susan. Whether it's for a birthday, wedding, or any event, our cakes are crafted with care and creativity. Reach out to Susan to order your cake today!"}
          </p>

          <button className="bg-pink-600 w-full text-white p-2 text-xs rounded-lg hover:bg-pink-700 transition">
            Contact Susan Now
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default AdFour;
