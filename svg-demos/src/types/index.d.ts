// This file contains TypeScript type definitions used throughout the project.

declare module "*.svg" {
    const content: string;
    export default content;
}

interface Frame {
    id: string;
    src: string;
}

interface AnimationProps {
    frames: Frame[];
    duration: number;
    loop?: boolean;
}

interface MorphingShapeProps {
    initialShape: string;
    finalShape: string;
    duration: number;
}

interface PathAnimationProps {
    path: string;
    duration: number;
    easing?: (t: number) => number;
}

interface EngineIntegrationProps {
    scene: string;
    renderer: string;
    options?: Record<string, any>;
}