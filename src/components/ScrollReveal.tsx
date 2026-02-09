import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function ScrollReveal({ children, className, delay = 0, direction = "up" }: ScrollRevealProps) {
  const initial = {
    opacity: 0,
    ...(direction === "up" && { y: 30 }),
    ...(direction === "left" && { x: -30 }),
    ...(direction === "right" && { x: 30 }),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
