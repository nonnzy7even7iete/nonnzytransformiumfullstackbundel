import { motion, AnimatePresence } from "framer-motion";
const BlurReveal = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(20px)", y: 30 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: false, amount: 0.2 }} // Rejoue l'animation à chaque passage
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} // Courbe fluide type Apple
      className={className}
    >
      {children}
    </motion.div>
  );
};
