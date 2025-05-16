// src/Navbar.jsx
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "./context/ThemeContext.jsx";

export default function Navbar() {
  /* mobile-меню */
  const [open,    setOpen]   = useState(false);

  /* auto-hide */
  const [hidden,  setHide]   = useState(false);
  const [scrolled,setScr]    = useState(false);

  /* тема */
  const { theme, toggleTheme } = useTheme();

  /* пункты навигации */
  const nav = [
    { to: "services",  label: "Услуги"   },
    { to: "portfolio", label: "Проекты"  },
    { to: "contact",   label: "Контакты" },
  ];

  /* scroll → hide / show / bg-blur */
  useEffect(() => {
    let lastY = window.scrollY;
    const h = () => {
      const y = window.scrollY;
      setScr(y > 0);
      setHide(y > lastY && y > 80);
      lastY = y;
    };
    addEventListener("scroll", h, { passive: true });
    return () => removeEventListener("scroll", h);
  }, []);

  /* Esc закрывает бургер-меню */
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, []);

  /* reduced-motion? */
  const prefersReduced = useReducedMotion();

  /* ---------- JSX ---------- */
  return (
    <motion.header
      role="banner"
      initial={ prefersReduced ? undefined : { y: -80, opacity: 0 } }
      animate={ prefersReduced ? undefined : { y: 0,  opacity: 1 } }
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        fixed inset-x-0 top-0 z-50
        ${scrolled && !hidden ? "bg-gray-900/70 shadow-lg backdrop-blur" : "bg-transparent"}
        transition-[transform,background-color,backdrop-filter] duration-500
        ${hidden ? "-translate-y-full" : "translate-y-0"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* логотип */}
        <span className="text-xl font-bold text-white select-none">AppForge</span>

        {/* кнопка темы */}
        <button
          aria-label="Переключить тему"
          onClick={toggleTheme}
          className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          {theme === "dark" ? (
            <Sun  size={18} className="text-white" />
          ) : (
            <Moon size={18} className="text-white" />
          )}
        </button>

        {/* ---------- навигация desktop ---------- */}
        <nav aria-label="Основная" className="hidden md:flex space-x-6">
          {nav.map((i) => (
            <ScrollLink
              key={i.to}
              to={i.to}
              spy
              smooth
              duration={500}
              offset={-80}
              activeClass="text-indigo-400 after:block after:h-0.5 after:bg-indigo-400 after:mt-1"
              className="cursor-pointer text-white hover:text-indigo-300 transition-colors"
            >
              {i.label}
            </ScrollLink>
          ))}
        </nav>

        {/* ---------- бургер (mobile) ---------- */}
        <button
          className="md:hidden text-white"
          aria-label="Открыть меню"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ---------- mobile-панель ---------- */}
      <div
        className={`
          md:hidden fixed inset-x-0 top-0 z-40 bg-gray-900/90 backdrop-blur
          transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      >
        {nav.map((i) => (
          <ScrollLink
            key={i.to}
            to={i.to}
            spy
            smooth
            duration={500}
            offset={-70}
            onClick={() => setOpen(false)}
            className="block px-6 py-4 text-white border-b border-white/10 hover:text-indigo-300 transition-colors"
          >
            {i.label}
          </ScrollLink>
        ))}
      </div>
    </motion.header>
  );
}
