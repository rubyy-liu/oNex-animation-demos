// This file contains the rendering logic for the graphics engine.

import { useEffect, useRef } from 'react';

export const useGraphicsEngine = (canvasRef: React.RefObject<HTMLCanvasElement>, renderFunction: () => void) => {
    const animationFrameId = useRef<number | null>(null);

    const render = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                renderFunction();
            }
        }
        animationFrameId.current = requestAnimationFrame(render);
    };

    useEffect(() => {
        render();
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [canvasRef, renderFunction]);
};