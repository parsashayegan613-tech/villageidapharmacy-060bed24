"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function ScrollReveal({ children, className, delay = 0, direction = "up" }: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const initial = {
    opacity: 1,
    ...(direction === "up" && { y: 18 }),
    ...(direction === "left" && { x: -18 }),
    ...(direction === "right" && { x: 18 }),
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
