import React from 'react';
import FramePlayer from '../demos/frames/FramePlayer';
import MorphingShape from '../demos/vector/MorphingShape';

const SvgCanvas: React.FC = () => {
    return (
        <div className="svg-canvas">
            <h2>SVG Animation Demos</h2>
            <div className="demo">
                <h3>Frame Animation (GIF-like)</h3>
                <FramePlayer />
            </div>
            <div className="demo">
                <h3>Vector Manipulation</h3>
                <MorphingShape />
            </div>
            <div className="demo">
                <h3>Hybrid Animation</h3>
            
            </div>
        </div>
    );
};

export default SvgCanvas;