import React from 'react';

const WaveSvg = () => (
    <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        overflow="auto"
        shapeRendering="auto"
        fill="#ffffff"
    >
        <defs>
        <path
            id="wavepath"
            d="M 0 2000 0 500 Q 150 244 300 500 t 300 0 300 0 300 0 300 0 300 0  v1000 z"
        />
        <path id="motionpath" d="M -600 0 0 0" />
        </defs>
        <g>
        <use href="#wavepath" y="192" fill="#ffffff">
            <animateMotion dur="5s" repeatCount="indefinite">
            <mpath href="#motionpath" />
            </animateMotion>
        </use>
        </g>
    </svg>
);

export default WaveSvg;