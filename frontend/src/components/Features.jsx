import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, Palette, ShieldCheck } from "lucide-react";

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 18, delay: i * 0.08 },
  }),
};

const Card = ({ children, className, i, testid }) => (
  <motion.div
    variants={reveal}
    custom={i}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.3 }}
    data-testid={testid}
    className={`rounded-3xl border-4 border-[#1A1B41] p-7 shadow-[6px_6px_0px_#1A1B41] ${className}`}
  >
    {children}
  </motion.div>
);

const IconBadge = ({ Icon, bg }) => (
  <span
    className="animate-wiggle mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-[#1A1B41]"
    style={{ background: bg }}
  >
    <Icon color="#1A1B41" strokeWidth={3} size={26} />
  </span>
);

export const Features = () => {
  return (
    <section className="relative bg-[#FAFAFA] px-6 py-24" data-testid="features-section">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 font-display text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Hechos para <span className="text-[#FF3366]">crecer</span> jugando
        </motion.h2>
        <p className="mb-12 max-w-lg text-lg font-semibold text-[#1A1B41]/70">
          Cada par combina tecnología ortopédica con la diversión que los niños
          merecen.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2">
          {/* Big feature */}
          <Card i={0} testid="feature-soporte" className="bg-[#E0FBFC] md:col-span-2 md:row-span-2">
            <IconBadge Icon={ShieldCheck} bg="#00C2D1" />
            <h3 className="font-display text-3xl font-bold">Soporte ortopédico real</h3>
            <p className="mt-3 max-w-md text-lg font-semibold text-[#1A1B41]/70">
              Especialistas en pie plano y mala pisada. Cada par lleva plantilla
              anatómica, talón firme y suela flexible para cuidar el desarrollo
              natural del pie de tu peque en cada paso.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Pie plano", "Mala pisada", "Materiales resistentes", "Excelente soporte"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border-2 border-[#1A1B41] bg-white px-4 py-1.5 font-bold"
                >
                  {t}
                </span>
              ))}
            </div>
          </Card>

          <Card i={1} testid="feature-comodidad" className="bg-[#FFE5EC]">
            <IconBadge Icon={HeartHandshake} bg="#FF3366" />
            <h3 className="font-display text-2xl font-bold">Máxima comodidad</h3>
            <p className="mt-2 font-semibold text-[#1A1B41]/70">
              Acolchado de memoria suave que abraza cada pisada.
            </p>
          </Card>

          <Card i={2} testid="feature-diseno" className="bg-[#E8DFF5]">
            <IconBadge Icon={Palette} bg="#FFD166" />
            <h3 className="font-display text-2xl font-bold">Diseño personalizado</h3>
            <p className="mt-2 font-semibold text-[#1A1B41]/70">
              Colores, personajes y el nombre de tu peque en cada par.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Features;
