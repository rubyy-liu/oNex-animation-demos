import React, { useEffect, useRef } from 'react';

const MorphingShape = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const shapes = [
        'M10 10 H 90 V 90 H 10 L 10 10', // Square
        'M50 10 C 90 10, 90 90, 50 90 C 10 90, 10 10, 50 10', // Circle
        'M10 10 Q 95 0, 90 90 T 10 90', // Wave
    ];
    const duration = 2000; // Duration for each morphing in milliseconds

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        let currentShape = 0;

        const animate = () => {
            svg.querySelector('path')?.setAttribute('d', shapes[currentShape]);
            currentShape = (currentShape + 1) % shapes.length;
            setTimeout(animate, duration);
        };

        animate();

        return () => {
            // Cleanup if necessary
        };
    }, [shapes]);

    return (
        <svg ref={svgRef} width="100" height="100">
            <path d={shapes[0]} fill="none" stroke="black" strokeWidth="2" />
        </svg>
    );
};

export default MorphingShape;