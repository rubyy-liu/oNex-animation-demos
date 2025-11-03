import { useEffect, useState } from 'react';

const FramePlayer = () => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const frameCount = 6; // Adjust based on the number of frames you have
    const frameDuration = 80; // Duration for each frame in milliseconds

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFrame((prevFrame) => (prevFrame + 1) % frameCount);
        }, frameDuration);

        return () => clearInterval(interval);
    }, [frameCount, frameDuration]);

    return (
        <div className="frame-player">
            <img 
                src={`src/demos/frames/useFrameSequence/frame-0${currentFrame}.png`} 
                alt={`Frame ${currentFrame}`} 
            />
        </div>
    );
};

export default FramePlayer;