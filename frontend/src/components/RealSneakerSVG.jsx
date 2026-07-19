import React, { useId } from "react";

// A more realistic chunky "dad-shoe" style sneaker rendered in SVG.
// Colors update live: body (colorPrincipal), sole (colorSuela), stripes/laces (colorAccent).
export const RealSneakerSVG = ({
  colorPrincipal = "#FF3366",
  colorSuela = "#FFFFFF",
  colorAccent = "#1A1B41",
  PersonajeIcon = null,
  personajeColor = "#1A1B41",
  className = "",
  ...props
}) => {
  const uid = useId().replace(/:/g, "");
  const clip = `body-${uid}`;
  const hi = `hi-${uid}`;
  const sh = `sh-${uid}`;
  const soleHi = `soleHi-${uid}`;
  const line = "#1A1B41";

  // Body silhouette (toe to the right, heel to the left)
  const bodyPath =
    "M78,250 C72,168 108,132 190,130 L338,130 C372,129 396,150 440,176 C486,203 538,214 552,244 L556,252 L78,252 Z";

  return (
    <svg viewBox="0 0 620 400" className={className} xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <clipPath id={clip}>
          <path d={bodyPath} />
        </clipPath>
        <linearGradient id={hi} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={sh} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="70%" stopColor="#000000" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.28" />
        </linearGradient>
        <linearGradient id={soleHi} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="315" cy="356" rx="240" ry="20" fill="#000000" opacity="0.12" />

      {/* ---------- SOLE ---------- */}
      {/* outsole */}
      <path
        d="M64,300 C60,286 74,282 96,282 L544,282 C568,282 580,290 576,304 C572,322 556,338 520,338 L108,338 C82,338 66,320 64,300 Z"
        fill={colorSuela}
        stroke={line}
        strokeWidth="5"
      />
      {/* tread notches */}
      <g stroke={line} strokeWidth="4" opacity="0.55" strokeLinecap="round">
        <path d="M120,332 L120,300" />
        <path d="M180,334 L180,300" />
        <path d="M245,335 L245,300" />
        <path d="M310,335 L310,300" />
        <path d="M375,335 L375,300" />
        <path d="M440,334 L440,300" />
        <path d="M505,330 L505,300" />
      </g>
      {/* midsole (chunky) */}
      <path
        d="M70,258 C66,244 82,240 104,240 L540,240 C566,240 578,248 574,266 C572,282 556,290 528,290 L100,290 C80,290 72,274 70,258 Z"
        fill={colorSuela}
        stroke={line}
        strokeWidth="5.5"
      />
      <path
        d="M70,258 C66,244 82,240 104,240 L540,240 C566,240 578,248 574,266 C572,282 556,290 528,290 L100,290 C80,290 72,274 70,258 Z"
        fill={`url(#${soleHi})`}
      />
      {/* speckles on midsole */}
      <g fill={line} opacity="0.5">
        {[
          [120, 255], [150, 268], [185, 252], [215, 272], [250, 258],
          [285, 270], [320, 254], [355, 268], [390, 256], [425, 271],
          [460, 258], [495, 268], [520, 256], [135, 275], [300, 248],
          [400, 275], [470, 250], [230, 250], [340, 275], [510, 272],
        ].map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={i % 3 === 0 ? 3 : 2} />
        ))}
      </g>

      {/* ---------- UPPER ---------- */}
      <path d={bodyPath} fill={colorPrincipal} stroke={line} strokeWidth="6" strokeLinejoin="round" />

      {/* shading + highlight clipped to body */}
      <g clipPath={`url(#${clip})`}>
        <rect x="60" y="120" width="510" height="140" fill={`url(#${hi})`} />
        <rect x="60" y="120" width="510" height="140" fill={`url(#${sh})`} />
      </g>

      {/* toe cap */}
      <path
        d="M440,176 C486,203 538,214 552,244 L556,252 L470,252 C458,220 448,196 440,176 Z"
        fill={colorSuela}
        stroke={line}
        strokeWidth="5.5"
        strokeLinejoin="round"
      />
      <path d="M470,200 C500,214 528,224 540,244" stroke={line} strokeWidth="3" fill="none" opacity="0.4" />

      {/* heel counter */}
      <path
        d="M78,250 C74,196 92,160 128,146 C120,178 118,214 122,250 Z"
        fill={colorAccent}
        stroke={line}
        strokeWidth="5.5"
        strokeLinejoin="round"
      />

      {/* three side stripes */}
      <g stroke={colorAccent} strokeWidth="16" strokeLinecap="round" opacity="0.95">
        <path d="M250,250 L300,150" />
        <path d="M285,250 L335,150" />
        <path d="M320,250 L370,150" />
      </g>
      <g stroke={line} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" fill="none">
        <path d="M242,250 L292,150" />
        <path d="M258,250 L308,150" />
        <path d="M277,250 L327,150" />
        <path d="M293,250 L343,150" />
        <path d="M312,250 L362,150" />
        <path d="M328,250 L378,150" />
      </g>

      {/* tongue */}
      <path
        d="M356,132 C362,104 392,100 408,116 L398,150 C382,150 366,146 356,132 Z"
        fill={colorSuela}
        stroke={line}
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* collar padding */}
      <path
        d="M150,132 C158,108 188,106 200,124"
        fill="none"
        stroke={line}
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* laces + eyelets */}
      <g stroke={colorAccent} strokeWidth="7" strokeLinecap="round">
        <path d="M362,168 L410,158" />
        <path d="M360,190 L408,180" />
        <path d="M358,212 L404,204" />
      </g>
      <g fill={line}>
        <circle cx="362" cy="168" r="5" />
        <circle cx="360" cy="190" r="5" />
        <circle cx="358" cy="212" r="5" />
        <circle cx="410" cy="158" r="5" />
        <circle cx="408" cy="180" r="5" />
        <circle cx="404" cy="204" r="5" />
      </g>

      {/* stitch line */}
      <path
        d="M128,250 C118,196 138,158 178,146"
        fill="none"
        stroke={line}
        strokeWidth="2.5"
        strokeDasharray="6 6"
        opacity="0.55"
      />

      {/* character badge on heel */}
      <g>
        <circle cx="118" cy="205" r="26" fill="#FAFAFA" stroke={line} strokeWidth="4.5" />
        {PersonajeIcon && (
          <foreignObject x="99" y="186" width="38" height="38">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px" }}>
              <PersonajeIcon color={personajeColor} strokeWidth={3} size={26} />
            </div>
          </foreignObject>
        )}
      </g>
    </svg>
  );
};

export default RealSneakerSVG;
