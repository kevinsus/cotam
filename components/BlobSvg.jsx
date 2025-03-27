import React from "react";

const BlobSvg = () => {
  return (
    <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="var(--color-blue-500)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--color-blue-800)" stopOpacity="1" />
        </radialGradient>
        <style>
          {`
            @keyframes morph {
              0% {
                d: path('M769.5 566q-111.5 66-153 213t-188 122.5Q282 877 191 761t-19.5-235Q243 407 319 362.5t160-133Q563 141 714.5 167t159 179.5Q881 500 769.5 566Z');
                transform: rotate(0deg);
              }
              50% {
                d: path('M800 550q-120 80-160 230t-200 130Q300 900 200 750t-20-250Q250 400 320 350t170-150Q580 120 730 150t170 200Q920 500 800 550Z');
                transform: rotate(180deg);
              }
              100% {
                d: path('M769.5 566q-111.5 66-153 213t-188 122.5Q282 877 191 761t-19.5-235Q243 407 319 362.5t160-133Q563 141 714.5 167t159 179.5Q881 500 769.5 566Z');
                transform: rotate(360deg);
              }
            }
            .animated-shape {
              animation: morph 8s ease-in-out infinite;
              transform-origin: center;
            }
          `}
        </style>
      </defs>
      <path className="animated-shape" fill="url(#grad)" d="M769.5 566q-111.5 66-153 213t-188 122.5Q282 877 191 761t-19.5-235Q243 407 319 362.5t160-133Q563 141 714.5 167t159 179.5Q881 500 769.5 566Z" />
    </svg>
  );
};

export default BlobSvg;
