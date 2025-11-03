import { useEffect, useRef } from 'react';
import { TweenMax, Power2 } from 'gsap';

const useVectorTweens = (svgElement: SVGSVGElement | null, duration: number) => {
    const animationRef = useRef<GSAPTimeline | null>(null);

    useEffect(() => {
        if (svgElement) {
            animationRef.current = TweenMax.to(svgElement, duration, {
                scale: 1.2,
                rotation: 360,
                transformOrigin: "50% 50%",
                ease: Power2.easeInOut,
                repeat: -1,
                yoyo: true,
            });

            return () => {
                animationRef.current?.kill();
            };
        }
    }, [svgElement, duration]);

    return animationRef;
};

export default useVectorTweens;