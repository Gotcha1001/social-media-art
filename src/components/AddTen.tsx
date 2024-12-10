"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const AdTen = ({ size }: { size: "sm" | "md" | "lg" }) => {
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
          <span>Adoption Opportunity</span>
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
                src="https://images.pexels.com/photos/3776204/pexels-photo-3776204.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="adoption"
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
                src="https://images.pexels.com/photos/3776204/pexels-photo-3776204.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="adoption-logo"
                height={24}
                width={24}
                className="rounded-full w-6 h-6 object-cover"
              />
            </motion.div>
            <span className="text-blue-600 font-semibold">Adopt a Child</span>
          </div>
          <p className={`text-white ${size === "sm" ? "text-xs" : "text-sm"}`}>
            {size === "sm"
              ? "Make a difference—adopt and give a child a loving home."
              : size === "md"
              ? "Join us in providing a bright future for children in need. Open your heart and home through adoption and change a life forever."
              : "Experience the joy of giving a child the love and support they deserve. Adopting a child is an act of compassion that brings hope, happiness, and a brighter future for children who need it the most. Be their hero and create a bond that lasts a lifetime."}
          </p>

          <button className="bg-blue-600 w-full text-white p-2 text-xs rounded-lg hover:bg-blue-700 transition">
            Start Your Adoption Journey
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default AdTen;
