import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data";

const card = {
  hidden: { opacity: 0, y: 50 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 18, delay: i * 0.1 },
  }),
};

export const Catalog = () => {
  const navigate = useNavigate();

  return (
    <section id="productos" className="dot-grid bg-[#E0FBFC] px-6 py-24" data-testid="catalog-section">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-3 inline-block rounded-full border-2 border-[#1A1B41] bg-white px-4 py-1 font-bold">
              Nuestro catálogo
            </span>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Elige tu <span className="text-[#FF3366]">favorito</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <motion.article
              key={p.id}
              variants={card}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8 }}
              data-testid={`product-card-${p.id}`}
              onClick={() => navigate(`/personalizar/${p.id}`)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border-4 border-[#1A1B41] bg-white shadow-[8px_8px_0px_#1A1B41]"
            >
              <div
                className="relative flex items-center justify-center overflow-hidden border-b-4 border-[#1A1B41] p-5"
                style={{ background: p.color }}
              >
                <div className="animate-blob absolute -right-6 -top-6 h-24 w-24 bg-white/40 blur-xl" />
                <span className="absolute left-4 top-4 z-10 rounded-full border-2 border-[#1A1B41] bg-[#FFD166] px-3 py-1 text-sm font-bold">
                  {p.tag}
                </span>
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="relative z-[1] h-56 w-full rounded-2xl border-2 border-[#1A1B41] object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: "center 55%", filter: "contrast(1.06) saturate(1.12) brightness(1.04)" }}
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <p className="mt-1 font-semibold text-[#1A1B41]/70">{p.tagline}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-[#FF3366]">
                    ${p.price}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/personalizar/${p.id}`);
                  }}
                  data-testid={`product-design-${p.id}`}
                  className="mt-5 flex items-center justify-center gap-2 rounded-full border-4 border-[#1A1B41] bg-[#06D6A0] px-5 py-3 font-display font-bold shadow-[4px_4px_0px_#1A1B41] transition-transform hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1A1B41]"
                >
                  Personalizar
                  <ArrowUpRight strokeWidth={3} size={20} />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
