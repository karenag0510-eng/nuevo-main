import React from "react";
import { motion } from "framer-motion";

// Live-personalizable shoe preview using a background-removed cutout so ONLY
// the shoe changes color (the color layer is masked to the shoe silhouette).
export const ShoePreview = ({
  image,
  colorPrincipal = "#FFFFFF",
  colorAccent = "#1B75D0",
  PersonajeIcon = null,
  personajeColor = "#1A1B41",
  nombre = "",
  showControls = true,
  className = "",
}) => {
  const maskStyle = {
    WebkitMaskImage: `url("${image}")`,
    maskImage: `url("${image}")`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: "radial-gradient(circle at 50% 42%, #FBFBFC, #E7E8EC)" }}
    >
      <div className="relative h-full w-full p-4">
        <img
          src={image}
          alt="Tenis Orto Ook"
          className="h-full w-full object-contain drop-shadow-[6px_10px_10px_rgba(26,27,65,0.18)]"
        />
        {/* natural recolor: 'color' blend keeps the shoe's shading/highlights */}
        <motion.div
          className="pointer-events-none absolute inset-4"
          animate={{ backgroundColor: colorPrincipal }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          style={{ ...maskStyle, mixBlendMode: "color" }}
        />
        {/* multiply adds depth & saturation so vivid colors read strongly */}
        <motion.div
          className="pointer-events-none absolute inset-4"
          animate={{ backgroundColor: colorPrincipal }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
          style={{ ...maskStyle, mixBlendMode: "multiply", opacity: 0.38 }}
        />
        {/* soft shine, also masked to the shoe */}
        <div
          className="pointer-events-none absolute inset-4"
          style={{
            ...maskStyle,
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.45) 0%, transparent 42%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {showControls && (
        <>
          {/* accent stripe chip */}
          <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full border-2 border-[#1A1B41] bg-white/90 px-3 py-1.5 backdrop-blur">
            <span
              className="h-4 w-4 rounded-full border border-[#1A1B41]"
              style={{ background: colorAccent }}
            />
            <span className="text-xs font-bold text-[#1A1B41]">Franjas</span>
          </div>

          {/* character badge */}
          {PersonajeIcon && (
            <motion.div
              key={personajeColor + (PersonajeIcon?.displayName || "")}
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
              className="absolute bottom-4 left-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#1A1B41] bg-white shadow-[3px_3px_0px_#1A1B41]"
            >
              <PersonajeIcon color={personajeColor} strokeWidth={3} size={26} />
            </motion.div>
          )}

          {/* name ribbon */}
          {nombre && (
            <div className="absolute bottom-4 right-4 rounded-full border-2 border-[#1A1B41] bg-[#FFD166] px-4 py-1.5 font-display font-bold text-[#1A1B41] shadow-[3px_3px_0px_#1A1B41]">
              {nombre}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShoePreview;
