"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

function Counter({ value }: { value: string }) {
  // On extrait le nombre de la string (ex: "+32%" -> 32)
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ""));
  const suffix = value.replace(/[0-9.]/g, ""); // Récupère %, €, M, etc.

  const spring = useSpring(0, { stiffness: 50, damping: 20 });
  const display = useTransform(
    spring,
    (current) =>
      `${suffix.includes("+") ? "+" : ""}${Math.round(current)}${suffix.replace(
        "+",
        ""
      )}`
  );

  useEffect(() => {
    spring.set(numericValue);
  }, [numericValue, spring]);

  return <motion.span>{display}</motion.span>;
}
