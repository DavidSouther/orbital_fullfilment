import { createContext, useEffect, useRef, useState } from "react";

export const AnimationTimer = createContext<number>(0);

export const useTimer = () => {
  const [tick, setTick] = useState(0);

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  // eslint-disable-next-line
  const animate = (time: number) => {
    if (previousTimeRef.current) {
      const deltaTime = time - previousTimeRef.current;

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setTick((prevCount) => prevCount + deltaTime * 1000);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, [animate]); // Make sure the effect runs only once

  return tick;
};
