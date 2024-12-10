"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const AdThree = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <MotionWrapperDelay
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <div className="p-9 gradient-background2 rounded-lg shadow-lg text-sm">
        {/* TOP */}
        <div className="flex items-center justify-between text-gray-200 font-semibold">
          <span>Weekend Special</span>
          <Image src="/more.png" alt="more" width={16} height={16} />
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
                scale: 1.2,
                transition: { type: "spring", stiffness: 500, damping: 20 },
              }}
              whileTap={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 500, damping: 20 },
              }}
              className="relative w-full h-full flex justify-center items-center"
            >
              <Image
                src="https://images.pexels.com/photos/1087727/pexels-photo-1087727.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="flea-market"
                fill
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{
                scale: 1.2,
                transition: { type: "spring", stiffness: 500, damping: 20 },
              }}
              whileTap={{
                scale: 1.2,
                transition: { type: "spring", stiffness: 500, damping: 20 },
              }}
              className="flex justify-center items-center"
            >
              <Image
                src="https://images.pexels.com/photos/1087727/pexels-photo-1087727.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="market-logo"
                height={24}
                width={24}
                className="rounded-full w-6 h-6 object-cover"
              />
            </motion.div>
            <span className="text-green-600 font-semibold">
              Golden Hours Market
            </span>
          </div>
          <p className={`text-white ${size === "sm" ? "text-xs" : "text-sm"}`}>
            {size === "sm"
              ? "Find unique items and vintage treasures at our flea market every Sunday."
              : size === "md"
              ? "Join us at Golden Hours Market every Sunday for a day filled with shopping, live music, and hidden treasures. Perfect for families and vintage enthusiasts."
              : "Come explore Golden Hours Market every Sunday for an unforgettable flea market experience. Discover unique items, vintage finds, handmade crafts, and much more. Enjoy live music, food stalls, and a vibrant community atmosphere."}
          </p>

          <button className="bg-green-600 w-full text-white p-2 text-xs rounded-lg hover:bg-green-700 transition">
            Visit Us This Sunday!
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default AdThree;
