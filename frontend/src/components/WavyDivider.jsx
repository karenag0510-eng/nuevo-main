import React from "react";

// Playful wavy divider between sections.
// topColor = color of the section ABOVE, bottomColor = section BELOW.
export const WavyDivider = ({ topColor = "#FFFFFF", bottomColor = "#E0FBFC", flip = false }) => {
  return (
    <div className="relative -mb-1 leading-[0]" style={{ background: topColor }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[70px] w-full sm:h-[110px]"
        style={{ transform: flip ? "scaleX(-1)" : "none" }}
      >
        <path
          fill={bottomColor}
          d="M0,64 C180,120 360,10 540,40 C720,70 900,120 1080,96 C1260,72 1350,40 1440,56 L1440,120 L0,120 Z"
        />
      </svg>
    </div>
  );
};

export default WavyDivider;
