import React, { useEffect, useRef } from 'react';

const PathAnimator = () => {
    const pathRef = useRef<SVGPathElement | null>(null);
    const animationDuration = 2000; // Duration of the animation in milliseconds

    useEffect(() => {
        if (pathRef.current) {
            const path = pathRef.current;
            const length = path.getTotalLength();

            // Set up the initial state of the path
            path.style.strokeDasharray = `${length} ${length}`;
            path.style.strokeDashoffset = `${length}`;
            path.style.transition = `stroke-dashoffset ${animationDuration}ms ease-in-out`;

            // Trigger the animation
            requestAnimationFrame(() => {
                path.style.strokeDashoffset = '0';
            });
        }
    }, []);

    return (
        <svg width="400" height="200">
            <path
                ref={pathRef}
                d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                stroke="black"
                strokeWidth="2"
                fill="transparent"
            />
        </svg>
    );
};

export default PathAnimator;