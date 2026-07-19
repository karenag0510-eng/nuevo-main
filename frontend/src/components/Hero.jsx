import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Star, Heart, Cloud, Sun, Zap } from "lucide-react";
import ShoePreview from "./ShoePreview";
import { HERO_IMG } from "../data";

const line = {
  hidden: { y: "110%" },
  show: (i) => ({
    y: "0%",
    transition: { type: "spring", stiffness: 200, damping: 18, delay: 0.15 * i },
  }),
};

const MaskLine = ({ children, i, className }) => (
  <span className="block overflow-hidden py-1">
    <motion.span
      variants={line}
      custom={i}
      initial="hidden"
      animate="show"
      className={`block ${className}`}
    >
      {children}
    </motion.span>
  </span>
);

// Floating sticker decoration
const Sticker = ({ Icon, className, bg, delay = 0, size = 26 }) => (
  <motion.span
    initial={{ scale: 0, rotate: -30 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 10, delay }}
    className={`absolute flex items-center justify-center rounded-2xl border-4 border-[#1A1B41] shadow-[4px_4px_0px_#1A1B41] ${className}`}
    style={{ background: bg }}
  >
    <Icon color="#1A1B41" strokeWidth={3} size={size} />
  </motion.span>
);

export const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const rotate = useTransform(scrollY, [0, 600], [-8, 6]);

  const scrollTo = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="inicio"
      className="dot-grid relative min-h-screen overflow-hidden bg-[#E8DFF5] pt-32"
      data-testid="hero-section"
    >
      {/* Colorful morphing blobs */}
      <div className="animate-blob absolute -left-24 top-24 h-72 w-72 bg-[#FFD166] opacity-60 blur-2xl" />
      <div className="animate-blob absolute -right-16 bottom-10 h-80 w-80 bg-[#00C2D1] opacity-40 blur-2xl" style={{ animationDelay: "2s" }} />
      <div className="animate-blob absolute left-1/2 top-1/2 h-64 w-64 bg-[#FF3366] opacity-25 blur-2xl" style={{ animationDelay: "4s" }} />

      {/* Scattered stickers */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <Sticker Icon={Star} bg="#FFD166" className="left-6 top-40 h-14 w-14 animate-wiggle" delay={0.5} />
        <Sticker Icon={Sparkles} bg="#00C2D1" className="right-10 top-44 h-14 w-14 animate-bob" delay={0.7} />
        <Sticker Icon={Heart} bg="#FF3366" className="left-[46%] top-24 h-12 w-12 animate-bob-slow" delay={0.9} size={22} />
        <Sticker Icon={Cloud} bg="#E0FBFC" className="left-10 bottom-24 h-14 w-14 animate-bob" delay={1.1} />
        <Sticker Icon={Sun} bg="#FFD166" className="right-[42%] bottom-16 h-12 w-12 animate-wiggle" delay={1.3} size={22} />
        <Sticker Icon={Zap} bg="#06D6A0" className="right-20 bottom-40 h-12 w-12 animate-bob-slow" delay={1.5} size={22} />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-6 pb-20 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ scale: 0, rotate: -6 }}
            animate={{ scale: 1, rotate: -3 }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
            className="mb-5 inline-block rounded-2xl border-4 border-[#1A1B41] bg-[#06D6A0] px-4 py-1.5 font-display font-bold text-[#1A1B41] shadow-[4px_4px_0px_#1A1B41]"
          >
            Tenemos el diseño que siempre quisiste lucir
          </motion.span>

          <h1 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-[#1A1B41] sm:text-5xl lg:text-6xl">
            <MaskLine i={0}>Tenis</MaskLine>
            <MaskLine i={1}>ortopédicos</MaskLine>
            <MaskLine i={2} className="text-rainbow">personalizados</MaskLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-6 max-w-md text-lg font-semibold text-[#1A1B41]/80"
          >
            Zapatos con soporte ortopédico de verdad y diseños que tus peques
            aman. Elige colores, personajes y ¡crea el par perfecto!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <motion.button
              onClick={() => scrollTo("#disena")}
              data-testid="hero-cta-disena"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="group flex items-center gap-2 rounded-full border-4 border-[#1A1B41] bg-[#FF3366] px-7 py-4 font-display text-lg font-bold text-white shadow-[6px_6px_0px_#1A1B41] transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_#1A1B41]"
            >
              Diseña tus tenis
              <ArrowRight strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
            <button
              onClick={() => scrollTo("#productos")}
              data-testid="hero-cta-productos"
              className="rounded-full border-4 border-[#1A1B41] bg-white px-7 py-4 font-display text-lg font-bold shadow-[6px_6px_0px_#1A1B41] transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0px_#1A1B41]"
            >
              Ver catálogo
            </button>
          </motion.div>
        </div>

        {/* Hero shoe */}
        <motion.div style={{ y, rotate }} className="relative flex justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: -6 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.4 }}
            className="relative w-full max-w-lg"
          >
            <motion.div
              animate={{ rotate: [-6, -2, -6], y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-[2.5rem] border-4 border-[#1A1B41] bg-[#FFD166] p-3 shadow-[10px_10px_0px_#1A1B41]"
            >
              <ShoePreview
                image={HERO_IMG}
                colorPrincipal="#FFFFFF"
                colorAccent="#1B75D0"
                showControls={false}
                className="aspect-[16/11] w-full rounded-[2rem] border-2 border-[#1A1B41]"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
