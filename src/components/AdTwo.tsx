"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const AdTwo = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <MotionWrapperDelay
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      variants={{
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 },
      }}
    >
      <div className="p-9 gradient-background1 rounded-lg shadow-md text-sm">
        {/* TOP */}
        <div className="flex items-center justify-between text-gray-500 font-medium">
          <span>Sponsored Ads</span>
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
                src="https://images.pexels.com/photos/3693901/pexels-photo-3693901.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="ad-image"
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
                src="https://images.pexels.com/photos/3693901/pexels-photo-3693901.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="brand-logo"
                height={24}
                width={24}
                className="rounded-full w-6 h-6 object-cover"
              />
            </motion.div>
            <span className="text-indigo-600 font-medium">
              Community Boosters
            </span>
          </div>
          <p className={size === "sm" ? "text-xs" : "text-sm"}>
            {size === "sm"
              ? "Join us in spreading joy and support for local initiatives."
              : size === "md"
              ? "We partner with organizations to support children and families, bringing happiness to the community during the holiday season and beyond."
              : "Partnering with various groups to empower and uplift local communities by providing essential support and spreading holiday cheer. Join us in making a difference and bringing hope to those in need."}
          </p>

          <button className="bg-indigo-600 w-full text-white p-2 text-xs rounded-lg hover:bg-purple-900">
            Learn More...
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default AdTwo;
