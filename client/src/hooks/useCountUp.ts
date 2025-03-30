import { useState, useEffect } from "react";

export default function useCountUp(targetNumber: number, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Calculate current count value based on progress
      const percentage = Math.min(progress / duration, 1);
      const currentCount = Math.floor(percentage * targetNumber);
      
      setCount(currentCount);

      // Continue animation until we reach the target
      if (progress < duration) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetNumber, duration]);

  return count;
}
