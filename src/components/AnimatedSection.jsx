// Универсальная обёртка секций c появлением снизу-вверх
import { motion } from "framer-motion";

const defaultVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimatedSection({
  id,
  className = "",
  children,
  variants = defaultVariants,
}) {
  return (
    <motion.section
      id={id}
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.section>
  );
}

