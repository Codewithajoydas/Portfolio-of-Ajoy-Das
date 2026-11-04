"use client";
import React from "react";
import { motion } from "motion/react";
import { ReactLenis, useLenis } from 'lenis/react'

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReactLenis root />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
