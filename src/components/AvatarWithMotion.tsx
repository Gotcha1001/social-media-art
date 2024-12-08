"use client";
import { motion } from "framer-motion";
import Image from "next/image";

type AvatarWithMotionProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const AvatarWithMotion = ({ src, alt, width, height }: AvatarWithMotionProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.2, transition: { type: "spring", stiffness: 500, damping: 20 } }}
      whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 500, damping: 20 } }}
      className="absolute left-0 right-0 m-auto -bottom-16 w-32 h-32"
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        className="object-cover rounded-full ring-1 ring-white z-10"
      />
    </motion.div>
  );
};

export default AvatarWithMotion;