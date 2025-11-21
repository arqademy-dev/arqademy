'use client';
import svgPaths from "./svg-42qo8h2p9j"; // adjust path

export default function HeroOverlay() {
  return (
    <div className="absolute inset-0">
      <svg
        className="w-full h-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 1448 940"
      >
        <g filter="url(#filter0_d_1_10)" opacity="0.5">
          <rect fill="url(#paint0_linear_1_10)" height="932" transform="translate(4)" width="1440" />
          <path d={svgPaths.p2177a500} stroke="var(--stroke-0, black)" />
        </g>
        <defs>
          <filter
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
            height="940"
            id="filter0_d_1_10"
            width="1448"
            x="0"
            y="0"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              result="hardAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_10" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_10" mode="normal" result="shape" />
          </filter>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_1_10"
            x1="720"
            x2="720"
            y1="932"
            y2="0"
          >
            <stop stopColor="#0A3E49" stopOpacity="0.5" />
            <stop offset="0.322115" stopColor="#E9F8F3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
