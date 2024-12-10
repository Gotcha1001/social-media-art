"use client"; // Add this to ensure it's treated as a client component

import { GiftIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import Link from "next/link";
import MotionWrapperDelay from "../MotionWrapperDelay"; // Import your MotionWrapperDelay
import { motion } from "framer-motion"; // Import motion for animated components

const Birthdays = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* TOP */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500 rounded-lg text-sm ">Birthdays</span>
        <Link href="/" className="text-indigo-600 text-xs">
          See All
        </Link>
      </div>
      {/* USER */}
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full overflow-hidden"
            >
              <Image
                src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="user"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <span className="font-semibold">James Brown</span>
          </div>
          <div className="flex gap-3 justify-end">
            <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-md"
            >
              Celebrate
            </motion.button>
          </div>
        </div>
      </MotionWrapperDelay>
      {/* UPCOMING */}
      <MotionWrapperDelay
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        variants={{
          hidden: { opacity: 0, x: -100 },
          visible: { opacity: 1, x: 0 },
        }}
      >
        <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
          <GiftIcon width={24} height={24} className="text-purple-500" />
          <Link href="/" className="flex flex-col gap-1 text-sm">
            <span className="text-gray-700 font-semibold">
              Upcoming Birthdays
            </span>
            <span className="text-gray-500">
              See other 16 have upcoming birthdays
            </span>
          </Link>
        </div>
      </MotionWrapperDelay>
    </div>
  );
};

export default Birthdays;
