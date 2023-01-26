import { useState } from "react";

const useFocusedState = () => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  return {
    isFocused,
    onFocus,
    onBlur,
  };
};

export default useFocusedState