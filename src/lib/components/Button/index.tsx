import React, { CSSProperties, useMemo } from "react";
import useHoveringState from "../../hooks/useHoverListener";
import { borderRadius } from "../../utils/borderRadius";
import { borders } from "../../utils/borders";
import { colors } from "../../utils/colors";
import { unit } from "../../utils/constants";
import { fontSize } from "../../utils/fontSize";
import { padding } from "../../utils/padding";
import { transition } from "../../utils/transition";
import { ButtonProps } from "./Button";

function Button({
  type = "default",
  size = "md",
  onClick,
  children,
  disabled,
}: ButtonProps): React.ReactElement {
  const { isHovering, onMouseEnter, onMouseLeave } = useHoveringState();

  const style = useMemo<CSSProperties>(() => {
    let buttonStyle: CSSProperties = {
      border: borders.button,
      cursor: "pointer",
      padding: `${size === "sm" ? padding.xs : padding.sm}${unit} ${
        padding[size]
      }${unit}`,
      borderRadius: borderRadius[size],
      transition: transition.transition,
      transitionTimingFunction: transition.transitionTimingFunction,
      fontSize: fontSize[size],
    };

    if (disabled) {
      buttonStyle = {
        ...buttonStyle,
        color: colors.disabled,
        backgroundColor: colors.disabledBackground,
        borderColor: colors.disabledBorder,
        cursor: "not-allowed",
      };
      return buttonStyle;
    }

    switch (type) {
      case "default":
        buttonStyle = {
          ...buttonStyle,
          color: isHovering ? colors.hover : colors.primary,
          borderColor: isHovering ? colors.hover : colors.border,
          backgroundColor: colors.primaryBackground,
        };
        break;
      case "solid":
        buttonStyle = {
          ...buttonStyle,
          color: isHovering ? colors.hover : colors.primaryBackground,
          backgroundColor: isHovering ? colors.hoverBackground : colors.primary,
          borderColor: isHovering ? colors.hoverBackground : colors.border,
        };
        break;
      default:
        break;
    }

    return buttonStyle;
  }, [type, isHovering]);

  return (
    <button
      style={style}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}

export default Button;
