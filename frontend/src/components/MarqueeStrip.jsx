import React from "react";
import Marquee from "react-fast-marquee";
import { Footprints } from "lucide-react";

const WORDS = [
  { t: "Comodidad", bg: "#FF3366", fg: "#fff" },
  { t: "Soporte ortopédico", bg: "#FFD166", fg: "#1A1B41" },
  { t: "Personalización", bg: "#06D6A0", fg: "#1A1B41" },
  { t: "Materiales resistentes", bg: "#00C2D1", fg: "#1A1B41" },
  { t: "Para niños", bg: "#8B5CF6", fg: "#fff" },
  { t: "Estilo y salud", bg: "#FFD166", fg: "#1A1B41" },
];

export const MarqueeStrip = () => {
  return (
    <div
      className="border-y-4 border-[#1A1B41] bg-[#1B75D0] py-4"
      data-testid="marquee-strip"
    >
      <Marquee speed={42} gradient={false} autoFill>
        {WORDS.map((w, i) => (
          <div key={`${w.t}-${i}`} className="flex items-center gap-4 px-4">
            <span
              className="flex items-center gap-2 rounded-full border-[3px] border-[#1A1B41] px-5 py-2 font-display text-lg font-bold shadow-[3px_3px_0px_#1A1B41] sm:text-xl"
              style={{ background: w.bg, color: w.fg }}
            >
              <Footprints strokeWidth={3} size={20} />
              {w.t}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeStrip;
