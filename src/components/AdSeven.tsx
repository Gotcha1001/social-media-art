"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const AdSeven = ({ size }: { size: "sm" | "md" | "lg" }) => {
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
      <div className="p-8 bg-green-100 rounded-lg shadow-lg text-sm border border-green-300">
        {/* TOP */}
        <div className="flex items-center justify-between text-green-800 font-semibold">
          <span>Holiday Cooking Classes</span>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1 }}
            className="flex justify-center items-center"
          >
            <Image
              src="https://images.pexels.com/photos/5593699/pexels-photo-5593699.jpeg?auto=compress&cs=tinysrgb&w=800"
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
                src="https://images.pexels.com/photos/5593699/pexels-photo-5593699.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="holiday cooking"
                fill
                className="rounded-lg object-cover"
              />
            </motion.div>
          </div>
          <p className={size === "sm" ? "text-xs" : "text-sm"}>
            {size === "sm"
              ? "Join us this holiday season to learn new recipes and cooking techniques."
              : size === "md"
              ? "Experience the magic of cooking during the holidays. Our classes will teach you festive recipes, perfect for your holiday table. Bring your friends and make unforgettable memories!"
              : "Celebrate the holiday season by mastering festive recipes and cooking techniques. Whether you're a seasoned chef or a beginner, our cooking classes are perfect for learning new skills, sharing laughter, and creating delicious dishes to share with family and friends. Sign up today and make this holiday one to remember!"}
          </p>

          <button className="bg-green-600 w-full text-white p-2 text-xs rounded-lg hover:bg-green-700 transition">
            Sign Up for Classes
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default AdSeven;
