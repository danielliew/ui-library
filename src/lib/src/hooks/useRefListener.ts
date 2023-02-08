import { RefObject, useEffect, useState } from "react";
import { RefListenerState, screenSegments } from "./useRefListener.types";

const threshold = 0.69;

export const getScreenSegment = (
  boundingRect: DOMRect | undefined
): screenSegments => {
  const top = boundingRect?.top || 0;
  const left = boundingRect?.left || 0;
  let screenSegments = top / window.innerHeight > threshold ? "bottom" : "top";
  screenSegments += left / window.innerWidth > threshold ? "Right" : "Left";
  return screenSegments as screenSegments;
};

const useRefListener = (ref: RefObject<HTMLDivElement>) => {
  const [refState, setRefState] = useState<RefListenerState>({
    x: 0,
    y: 0,
    screenSegments: "topLeft",
  });

  useEffect(() => {
    const handleRefScreenPosition = () => {
      const boundingRect = ref.current?.getBoundingClientRect();
      const top = boundingRect?.top || 0;
      const left = boundingRect?.left || 0;
      setRefState({
        x: left,
        y: top,
        screenSegments: getScreenSegment(boundingRect),
      });
    };

    window.addEventListener("scroll", handleRefScreenPosition);

    return () => {
      window.removeEventListener("scroll", handleRefScreenPosition);
    };
  }, []);

  return refState;
};

export default useRefListener;
