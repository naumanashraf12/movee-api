import React from "react";

export default function notification({ colorOne, colorTwo }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <circle cx="24" cy="24" r="19" fill={colorOne} />
      </g>
      <path
        d="M27.7985 25.7518C27.1055 25.166 26.7082 24.3099 26.7082 23.4028V22.125C26.7082 20.5121 25.5101 19.177 23.9582 18.9533V18.4583C23.9582 18.2049 23.7528 18 23.4998 18C23.2468 18 23.0415 18.2049 23.0415 18.4583V18.9533C21.4891 19.177 20.2915 20.5121 20.2915 22.125V23.4028C20.2915 24.3099 19.8941 25.166 19.197 25.7555C19.0187 25.9081 18.9165 26.1299 18.9165 26.3646C18.9165 26.8069 19.2763 27.1667 19.7186 27.1667H27.2811C27.7234 27.1667 28.0832 26.8069 28.0832 26.3646C28.0832 26.1299 27.981 25.9081 27.7985 25.7518Z"
        fill={colorTwo}
      />
      <path
        d="M23.4998 29C24.3299 29 25.0243 28.4083 25.1838 27.625H21.8159C21.9754 28.4083 22.6698 29 23.4998 29Z"
        fill={colorTwo}
      />
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0"
          width="48"
          height="48"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
