import { motion } from "framer-motion";

/**
 * Секция, плавно появляющаяся при прокрутке.
 * Используйте вместо обычного <section>.
 */
export default function AnimatedSection({
  children,
  className = "",
  ...rest
}) {
  return (
    <motion.section
      {...rest}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
