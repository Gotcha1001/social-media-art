"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const AdNine = ({ size }: { size: "sm" | "md" | "lg" }) => {
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
          <span>Pet Rescue Fundraiser</span>
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
                src="https://images.pexels.com/photos/5745281/pexels-photo-5745281.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="pet-rescue"
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
                src="https://images.pexels.com/photos/5745281/pexels-photo-5745281.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="rescue-logo"
                height={24}
                width={24}
                className="rounded-full w-6 h-6 object-cover"
              />
            </motion.div>
            <span className="text-yellow-600 font-semibold">
              Pet Rescue Organization
            </span>
          </div>
          <p className={`text-white ${size === "sm" ? "text-xs" : "text-sm"}`}>
            {size === "sm"
              ? "Help rescue and care for pets in need. Join our fundraising events!"
              : size === "md"
              ? "Join our weekend fundraiser to support rescue animals. Your donations make a difference!"
              : "Support our pet rescue mission and make a difference in the lives of animals in need. Participate in our weekend fundraiser, learn about our rescue efforts, and help provide shelter, food, and medical care to animals. Together, we can save lives!"}
          </p>

          <button className="bg-yellow-600 w-full text-white p-2 text-xs rounded-lg hover:bg-yellow-700 transition">
            Donate or Volunteer
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default AdNine;
