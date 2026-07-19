import React from "react";

const BLUE = "#1B75D0";
const GREEN = "#4AAE3B";

// Footprint mark (baby foot) inspired by the OrtoLook brand.
export const FootMark = ({ size = 34, className = "" }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg">
    {/* sole */}
    <path
      d="M40 24 C50 26 54 36 50 46 C47 54 38 58 30 55 C24 53 22 47 20 42 C18 37 14 34 13 28 C12 20 20 15 28 17 C34 18 36 22 40 24 Z"
      fill={BLUE}
    />
    {/* arch highlight */}
    <path
      d="M24 30 C22 36 24 44 30 49"
      fill="none"
      stroke="#ffffff"
      strokeOpacity="0.35"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {/* toes */}
    <circle cx="27" cy="9" r="5" fill={GREEN} />
    <circle cx="38" cy="8" r="4.4" fill={GREEN} />
    <circle cx="47" cy="11" r="3.9" fill={GREEN} />
    <circle cx="54" cy="16" r="3.3" fill={GREEN} />
    <circle cx="18" cy="13" r="4.2" fill={GREEN} />
  </svg>
);

export const Logo = ({ size = 40, showText = true, className = "" }) => (
  <span className={`flex items-center gap-2.5 ${className}`}>
    <FootMark size={size} />
    {showText && (
      <span className="font-display text-3xl font-bold tracking-tight leading-none sm:text-4xl">
        <span style={{ color: BLUE }}>Orto</span>
        <span style={{ color: GREEN }}>&nbsp;Ook</span>
      </span>
    )}
  </span>
);

export default Logo;
