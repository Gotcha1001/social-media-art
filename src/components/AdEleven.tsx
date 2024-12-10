"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MotionWrapperDelay from "./MotionWrapperDelay";

const AdEleven = ({ size }: { size: "sm" | "md" | "lg" }) => {
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
          <span>Gardening Services</span>
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
                src="https://images.pexels.com/photos/1727409/pexels-photo-1727409.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="gardening"
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
                src="https://images.pexels.com/photos/1727409/pexels-photo-1727409.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="gardening-logo"
                height={24}
                width={24}
                className="rounded-full w-6 h-6 object-cover"
              />
            </motion.div>
            <span className="text-green-600 font-semibold">
              Expert Gardening
            </span>
          </div>
          <p className={`text-white ${size === "sm" ? "text-xs" : "text-sm"}`}>
            {size === "sm"
              ? "Transform your garden with professional gardening services."
              : size === "md"
              ? "Our gardening services are tailored to your needs, whether it's planting, maintenance, or landscape design. Let us bring your outdoor space to life."
              : "Enhance your home's beauty with our comprehensive gardening services. From plant selection and landscaping to regular maintenance, we create a lush, inviting outdoor space for you to enjoy year-round."}
          </p>

          <button className="bg-green-600 w-full text-white p-2 text-xs rounded-lg hover:bg-green-700 transition">
            Book Your Gardening Service
          </button>
        </div>
      </div>
    </MotionWrapperDelay>
  );
};

export default AdEleven;
