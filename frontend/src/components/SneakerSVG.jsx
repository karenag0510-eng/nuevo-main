import React from "react";

// A cute side-profile sneaker built with SVG so colors update live.
export const SneakerSVG = ({
  colorPrincipal = "#FF3366",
  colorSuela = "#FFFFFF",
  PersonajeIcon = null,
  personajeColor = "#1A1B41",
  className = "",
  ...props
}) => {
  const dark = "#1A1B41";
  return (
    <svg
      viewBox="0 0 420 260"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Sole */}
      <path
        d="M18 210 C18 200 26 196 40 196 L370 196 C392 196 404 202 402 214 C400 230 388 240 360 240 L60 240 C34 240 18 230 18 210 Z"
        fill={colorSuela}
        stroke={dark}
        strokeWidth="6"
      />
      {/* Sole stripe */}
      <path
        d="M26 220 L396 220"
        stroke={dark}
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Main body */}
      <path
        d="M40 198 C36 150 60 96 120 78 C150 69 168 92 196 96 C232 101 250 70 300 84 C356 100 388 150 386 198 Z"
        fill={colorPrincipal}
        stroke={dark}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Toe cap */}
      <path
        d="M40 198 C36 165 48 132 88 118 C104 150 104 176 100 198 Z"
        fill={colorSuela}
        stroke={dark}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      {/* Collar / ankle */}
      <path
        d="M300 84 C312 60 340 58 352 76 C360 88 362 120 360 150"
        fill="none"
        stroke={dark}
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Tongue */}
      <path
        d="M196 96 C205 74 226 70 242 82 L232 120 C214 122 202 116 196 96 Z"
        fill={colorSuela}
        stroke={dark}
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* Laces */}
      <g stroke={dark} strokeWidth="6" strokeLinecap="round">
        <path d="M150 120 L188 108" />
        <path d="M150 142 L188 132" />
        <path d="M150 164 L188 156" />
      </g>
      <g fill={dark}>
        <circle cx="150" cy="120" r="5" />
        <circle cx="150" cy="142" r="5" />
        <circle cx="150" cy="164" r="5" />
        <circle cx="188" cy="108" r="5" />
        <circle cx="188" cy="132" r="5" />
        <circle cx="188" cy="156" r="5" />
      </g>
      {/* Character badge */}
      <g>
        <circle
          cx="312"
          cy="150"
          r="30"
          fill="#FAFAFA"
          stroke={dark}
          strokeWidth="5"
        />
        {PersonajeIcon && (
          <foreignObject x="290" y="128" width="44" height="44">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "44px",
                height: "44px",
              }}
            >
              <PersonajeIcon color={personajeColor} strokeWidth={3} size={30} />
            </div>
          </foreignObject>
        )}
      </g>
    </svg>
  );
};

export default SneakerSVG;
