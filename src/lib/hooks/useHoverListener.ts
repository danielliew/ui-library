import { useState } from "react";

const useHoveringState = () => {
  const [isHovering, setIsHovering] = useState(false);

  const onMouseEnter = () => {
    setIsHovering(true);
  };

  const onMouseLeave = () => {
    setIsHovering(false);
  };

  return {
    isHovering,
    onMouseEnter,
    onMouseLeave,
  };
};

export default useHoveringState