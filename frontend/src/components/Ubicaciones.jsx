import React from "react";
import { motion } from "framer-motion";
import { MapPin, MessageCircle, Navigation } from "lucide-react";

const WHATSAPP = "3344621544";

const SUCURSALES = [
  {
    nombre: "Sucursal Zapopan SUR",
    zona: "Las Águilas",
    dir: "Río Cuitzmala 5439 A, Col. Las Águilas, Zapopan",
    nota: "Hacemos esquina con 18 de Marzo",
    bg: "#E0FBFC",
    map: "https://www.google.com/maps?q=Rio+Cuitzmala+5439+Las+Aguilas+Zapopan&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=Rio+Cuitzmala+5439+Las+Aguilas+Zapopan",
  },
  {
    nombre: "Sucursal Guadalajara NORTE",
    zona: "Santa Elena de la Cruz",
    dir: "Av. Experiencia 2721, Unidad Médica, Consultorio #4",
    nota: "Santa Elena de la Cruz, Guadalajara",
    bg: "#FFE5EC",
    map: "https://www.google.com/maps?q=Av+Experiencia+2721+Guadalajara&output=embed",
    link: "https://www.google.com/maps/search/?api=1&query=Av+Experiencia+2721+Guadalajara",
  },
];

export const Ubicaciones = () => {
  return (
    <section id="ubicaciones" className="dot-grid bg-[#FAFAFA] px-6 py-24" data-testid="ubicaciones-section">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border-2 border-[#1A1B41] bg-[#4AAE3B] px-4 py-1 font-bold text-white">
            <MapPin strokeWidth={3} size={18} /> Ubicaciones
          </span>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Visítanos en <span style={{ color: "#1B75D0" }}>Zapopan</span> y{" "}
            <span style={{ color: "#4AAE3B" }}>Guadalajara</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-semibold text-[#1A1B41]/70">
            Agenda tu consulta y encuentra el diseño que siempre quisiste lucir.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {SUCURSALES.map((s, i) => (
            <motion.div
              key={s.nombre}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 180, damping: 18, delay: i * 0.1 }}
              data-testid={`ubicacion-${i}`}
              className="overflow-hidden rounded-[2rem] border-4 border-[#1A1B41] bg-white shadow-[8px_8px_0px_#1A1B41]"
            >
              <iframe
                title={s.nombre}
                src={s.map}
                className="h-56 w-full border-b-4 border-[#1A1B41]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="p-6" style={{ background: s.bg }}>
                <h3 className="font-display text-2xl font-bold">{s.nombre}</h3>
                <p className="font-display font-bold" style={{ color: "#1B75D0" }}>{s.zona}</p>
                <p className="mt-2 flex items-start gap-2 font-semibold text-[#1A1B41]/80">
                  <MapPin strokeWidth={3} size={18} className="mt-0.5 shrink-0 text-[#FF3366]" />
                  {s.dir}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#1A1B41]/60">{s.nota}</p>
                <a
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`ubicacion-maps-${i}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full border-4 border-[#1A1B41] bg-white px-5 py-2.5 font-display font-bold shadow-[4px_4px_0px_#1A1B41] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1B41]"
                >
                  <Navigation strokeWidth={3} size={18} /> Cómo llegar
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.a
          href={`https://wa.me/52${WHATSAPP}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="whatsapp-cta"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-col items-center justify-center gap-3 rounded-[2rem] border-4 border-[#1A1B41] bg-[#4AAE3B] p-8 text-center text-white shadow-[8px_8px_0px_#1A1B41] transition-transform hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_#1A1B41] sm:flex-row sm:gap-6"
        >
          <MessageCircle strokeWidth={3} size={44} className="animate-bob" />
          <div>
            <p className="font-display text-xl font-bold">Agenda tu consulta</p>
            <p className="font-display text-4xl font-bold tracking-tight">334 462 1544</p>
          </div>
        </motion.a>
      </div>
    </section>
  );
};

export default Ubicaciones;
