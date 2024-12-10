import React, { ReactNode } from "react";
import {
  motion,
  Variants,
  MotionProps,
  TargetAndTransition,
} from "framer-motion";

type MotionWrapperProps = {
  children: ReactNode;
  initial?: MotionProps["initial"];
  whileInView?: MotionProps["whileInView"];
  viewport?: MotionProps["viewport"];
  transition?: MotionProps["transition"];
  variants?: Variants;
};

const MotionWrapperDelay: React.FC<MotionWrapperProps> = ({
  children,
  initial,
  whileInView,
  viewport,
  transition,
  variants,
}) => {
  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapperDelay;
