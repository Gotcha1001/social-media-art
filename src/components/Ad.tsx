"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const Ad = ({ size }: { size: "sm" | "md" | "lg" }) => {
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
      <div className="p-9 bg-white rounded-lg shadow-md text-sm">
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
                src="https://images.pexels.com/photos/2552131/pexels-photo-2552131.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="more"
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
                src="https://images.pexels.com/photos/2552131/pexels-photo-2552131.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="more"
                height={24}
                width={24}
                className="rounded-full w-6 h-6 object-cover"
              />
            </motion.div>
            <span className="text-indigo-600 font-medium">BigChef Lounge</span>
          </div>
          <p className={size === "sm" ? "text-xs" : "text-sm"}>
            {size === "sm"
              ? "We are sponsoring multiple businesses and corporations with funding for the children."
              : size === "md"
              ? "We are sponsoring multiple businesses and corporations with funding for children and the elderly to help with festive season celebrations and boost the community's cheer."
              : "We are sponsoring multiple businesses and corporations with funding for children and the elderly to help with festive season celebrations and boost community spirit. Let's share our goodness and help those in need while celebrating our common humanity."}
          </p>

          <button className="bg-indigo-600 w-full text-white p-2 text-xs rounded-lg hover:bg-purple-900">
            Learn More...
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default Ad;
