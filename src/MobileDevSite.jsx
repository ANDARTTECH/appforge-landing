// src/MobileDevSite.jsx
import React from "react";
imort { motion } from "framer-motion";
import AnimatedSection from "./components/AnimatedSection.jsx";

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      /* задержка между карточками */
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};
/* ------------------------------------------------------------------ */

export default function MobileDevSite() {
  return (
    <main className="font-sans text-gray-800 dark:text-gray-100 scroll-smooth">
      {/* ---------- Hero ---------- */}
      <AnimatedSection
        className="
          min-h-screen flex flex-col items-center justify-center
          bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-8
          dark:from-indigo-900 dark:to-gray-900
        "
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-center">
          Мы превращаем идеи в мобильные приложения
        </h1>

        <p className="text-lg md:text-2xl mb-8 text-center max-w-2xl">
          Полный цикл разработки: от прототипа до публикации и поддержки
        </p>

        <a
          href="#contact"
          className="
            bg-white text-indigo-700 dark:bg-indigo-600 dark:text-white
            font-semibold px-6 py-3 rounded-2xl shadow-lg
            hover:shadow-xl transition
          "
        >
          Обсудить проект
        </a>
      </AnimatedSection>

      {/* ---------- Services ---------- */}
      <AnimatedSection id="services" className="max-w-7xl mx-auto py-24 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Наши услуги</h2>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[
            { title: "Нативные приложения", desc: "iOS и Android с высоким FPS" },
            {
              title: "Кросс-платформа",
              desc: "Flutter и React Native под один бюджет",
            },
            {
              title: "Вывод на рынок",
              desc: "Публикация, аналитика, поддержка",
            },
          ].map((s) => (
            <motion.div
              key={s.title}
              variants={cardVariants}
              className="
                rounded-2xl bg-white dark:bg-gray-800 shadow-lg p-6
                hover:-translate-y-1 transition
              "
            >
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>

      {/* ---------- Portfolio ---------- */}
      <AnimatedSection
        id="portfolio"
        className="
          bg-gray-50 py-24 px-4 border-y border-gray-100
          dark:bg-gray-900 dark:border-gray-800
        "
      >
        <h2 className="text-3xl font-bold text-center mb-12">Проекты</h2>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
        >
          {[
            { src: "/portfolio/repeats.png", alt: "RepEats — доставка еды" },
            { src: "/portfolio/qvedo.png", alt: "Qvedo — сервис путешествий" },
            {
              src: "/portfolio/clever-market.png",
              alt: "Clever Market — интернет-магазин",
            },
            {
              src: "/portfolio/planner.png",
              alt: "Ежедневник / Планер дел",
            },
            {
              src: "/portfolio/vivendi.png",
              alt: "Vivendi — fashion e-commerce",
            },
          ].map((p) => (
            <motion.img
              key={p.src}
              variants={cardVariants}
              src={p.src}
              alt={p.alt}
              className="
                rounded-2xl shadow-lg hover:shadow-2xl transition no-fade
                border border-transparent dark:border-gray-700
              "
            />
          ))}
        </motion.div>
      </AnimatedSection>

      {/* ---------- Contact ---------- */}
      <AnimatedSection
        id="contact"
        className="max-w-3xl mx-auto py-24 px-4 scroll-mt-20"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Обсудим вашу идею?
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
          }}
          className="grid gap-4"
        >
          <input
            type="text"
            placeholder="Ваше имя"
            className="
              p-3 rounded-2xl border shadow-sm focus:ring-2 focus:ring-indigo-500
              dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100
              dark:placeholder-gray-500 dark:focus:ring-indigo-400
            "
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="
              p-3 rounded-2xl border shadow-sm focus:ring-2 focus:ring-indigo-500
              dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100
              dark:placeholder-gray-500 dark:focus:ring-indigo-400
            "
            required
          />
          <textarea
            rows={4}
            placeholder="Расскажите о проекте"
            className="
              p-3 rounded-2xl border shadow-sm focus:ring-2 focus:ring-indigo-500
              dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100
              dark:placeholder-gray-500 dark:focus:ring-indigo-400
            "
            required
          ></textarea>

          <button
            type="submit"
            className="
              justify-self-center bg-indigo-600 text-white font-semibold px-6 py-3
              rounded-2xl shadow-lg hover:bg-indigo-700 transition
            "
          >
            Отправить
          </button>
        </form>
      </AnimatedSection>

      {/* ---------- Footer ---------- */}
      <footer className="bg-gray-900 text-gray-300 dark:bg-gray-950 dark:text-gray-400 py-8">
        <div
          className="
            max-w-7xl mx-auto px-4 flex flex-col md:flex-row
            justify-between items-center gap-4
          "
        >
          <p>© {new Date().getFullYear()} AppForge. Все права защищены.</p>
          <nav className="space-x-4">
            <a href="#" className="hover:text-white">
              LinkedIn
            </a>
            <a href="#" className="hover:text-white">
              GitHub
            </a>
            <a href="#" className="hover:text-white">
              Telegram
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
}
