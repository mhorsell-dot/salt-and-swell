"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function HoverLift({ children, className = "" }: Props) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
