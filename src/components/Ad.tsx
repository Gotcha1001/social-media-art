"use client";
import Image from "next/image";
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
      <div className="p-4 bg-white rounded-lg shadow-md text-sm">
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
              size === "sm" ? "h-24" : size === "md" ? "h-36" : "h48"
            }`}
          >
            <Image
              src="https://images.pexels.com/photos/2552131/pexels-photo-2552131.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="more"
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex items-center gap-4">
            <Image
              src="https://images.pexels.com/photos/2552131/pexels-photo-2552131.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="more"
              height={24}
              width={24}
              className="rounded-full w-6 h-6 object-cover"
            />
            <span className="text-indigo-600 font-medium">BigChef Lounge</span>
          </div>
          <p className={size === "sm" ? "text-xs" : "text-sm"}>
            {size === "sm"
              ? "We are sponsering multiple business and corporations with fundings for the children"
              : size === "md"
              ? "We are sponsering multiple business and corporations with fundings for the children and also for the Elderly to help with this Festive searsons celebrations and to help boost the community with good cheer..."
              : "We are sponsering multiple business and corporations with fundings for the children and also for the Elderly to help with this Festive searsons celebrations and to help boost the community with good cheer.. Lets put our goodness into each gift and help those who are less fortunate and celebrate our commen threads of humanity"}
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
