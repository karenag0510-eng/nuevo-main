import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Catálogo", href: "#productos" },
  { label: "Personalización", href: "#disena" },
  { label: "Ubicaciones", href: "#ubicaciones" },
  { label: "Contacto", href: "#contacto" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const go = (href) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 350);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed top-4 left-0 right-0 z-50 px-4"
      data-testid="navbar"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border-4 border-[#1A1B41] bg-white px-6 py-3.5 shadow-[6px_6px_0px_#1A1B41]">
        <button onClick={() => go("#inicio")} data-testid="logo-btn" aria-label="Orto Ook inicio">
          <Logo size={48} />
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              data-testid={`nav-${l.href.replace('#', '')}`}
              className="rounded-full px-3.5 py-2 font-bold text-[#1A1B41] transition-colors hover:bg-[#E0FBFC]"
            >
              {l.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => go("#disena")}
          data-testid="nav-cta-disena"
          className="hidden rounded-full border-4 border-[#1A1B41] bg-[#4AAE3B] px-5 py-2 font-display font-bold text-white shadow-[4px_4px_0px_#1A1B41] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1B41] lg:block"
        >
          Personaliza
        </button>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden"
          data-testid="mobile-menu-toggle"
          aria-label="Menú"
        >
          {open ? <X strokeWidth={3} /> : <Menu strokeWidth={3} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto mt-3 max-w-6xl rounded-3xl border-4 border-[#1A1B41] bg-white p-4 shadow-[6px_6px_0px_#1A1B41] lg:hidden"
          data-testid="mobile-menu"
        >
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="block w-full rounded-xl px-4 py-3 text-left font-bold hover:bg-[#E0FBFC]"
            >
              {l.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
