import React from "react";
import { motion } from "framer-motion";
import { MANIFESTO_IMG } from "../data";

const CHAPTERS = [
  {
    n: "01",
    title: "El pie que crece",
    text: "Los primeros años definen la postura de por vida. Nuestros zapatos respetan el crecimiento natural del pie, sin forzar ni apretar.",
    bg: "#FFE5EC",
    img: "https://customer-assets-cm19k8pv.emergentagent.net/job_healthy-steps-kids/artifacts/285qx0nq_Image%20%283%29.jfif",
  },
  {
    n: "02",
    title: "Soporte que abraza",
    text: "Plantillas anatómicas y contrafuertes firmes que dan estabilidad en cada carrera, cada salto y cada aventura del día.",
    bg: "#E8DFF5",
    img: MANIFESTO_IMG,
  },
  {
    n: "03",
    title: "Diversión sin límites",
    text: "Porque un zapato saludable también debe ser el favorito. Colores vivos y personajes que hacen que quieran ponérselos solitos.",
    bg: "#E0FBFC",
    img: "https://customer-assets-cm19k8pv.emergentagent.net/job_healthy-steps-kids/artifacts/dw6xm70g_Image%20%287%29.jfif",
  },
];

const Reveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ type: "spring", stiffness: 160, damping: 18 }}
  >
    {children}
  </motion.div>
);

export const Manifesto = () => {
  return (
    <section id="historia" className="bg-[#FAFAFA] px-6 py-24" data-testid="manifesto-section">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <span className="mb-3 inline-block rounded-full border-2 border-[#1A1B41] bg-[#FFD166] px-4 py-1 font-bold">
            Nuestra filosofía
          </span>
          <h2 className="mb-16 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Tres pasos que lo cambian todo
          </h2>
        </Reveal>

        <div className="space-y-10">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.n}>
              <div
                className={`relative overflow-hidden rounded-[2rem] border-4 border-[#1A1B41] p-8 shadow-[8px_8px_0px_#1A1B41] md:p-12 ${
                  i % 2 === 1 ? "md:ml-16" : "md:mr-16"
                }`}
                style={{ background: c.bg }}
              >
                <span className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[10rem] font-bold leading-none text-[#1A1B41]/10">
                  {c.n}
                </span>
                <div className="relative grid items-center gap-6 md:grid-cols-2">
                  <div>
                    <span className="font-display text-3xl font-bold text-[#FF3366]">
                      {c.n}
                    </span>
                    <h3 className="mt-1 font-display text-3xl font-bold">{c.title}</h3>
                    <p className="mt-4 text-lg font-semibold text-[#1A1B41]/75">
                      {c.text}
                    </p>
                  </div>
                  {c.img && (
                    <img
                      src={c.img}
                      alt={c.title}
                      className="h-64 w-full rounded-2xl border-4 border-[#1A1B41] object-cover"
                    />
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
