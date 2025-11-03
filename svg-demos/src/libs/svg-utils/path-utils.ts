// This file contains utility functions for manipulating SVG paths.

export function getPathLength(path: SVGPathElement): number {
    return path.getTotalLength();
}

export function getPathPointAtLength(path: SVGPathElement, length: number): DOMPoint {
    return path.getPointAtLength(length);
}

export function createPathD(points: Array<{ x: number; y: number }>): string {
    if (points.length === 0) return '';
    const d = points.map((point, index) => {
        return index === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`;
    }).join(' ');
    return d + ' Z'; // Close the path
}

export function animatePath(path: SVGPathElement, duration: number): void {
    const length = getPathLength(path);
    path.style.transition = `stroke-dasharray ${duration}s ease-in-out`;
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;
    requestAnimationFrame(() => {
        path.style.strokeDashoffset = '0';
    });
}