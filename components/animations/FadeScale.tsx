"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function FadeScale({ children }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.25,
      }}
      transition={{
        duration: 0.7,
      }}
    >
      {children}
    </motion.div>
  );
}
