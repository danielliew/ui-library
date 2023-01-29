import React, { ChangeEvent, CSSProperties, useMemo, useRef } from "react";
import "./TextInput.module.css";
import fontStyles from "../../utils/fonts/fonts.module.css";

import useHoveringState from "../../hooks/useHoverHandler";
import { borderRadius } from "../../utils/borderRadius";
import { borders } from "../../utils/borders";
import { colors } from "../../utils/colors";
import { fontSize } from "../../utils/fontSize";
import { padding } from "../../utils/padding";
import { transition } from "../../utils/transition";
import { TextInputProps } from "./TextInput";
import useFocusedState from "../../hooks/useFocusHandler";
import { spacing } from "../../utils/spacing";
import SearchIcon from "../icons/SearchIcon";

function TextInput({
  value,
  onValueChange,
  size = "md",
  placeholder,
  label,
  extra,
  disabled,
  multiline,
  leftIcon,
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onClick = () => {
    if (multiline) {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
      return;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const { isHovering, onMouseEnter, onMouseLeave } = useHoveringState();
  const { isFocused, onFocus, onBlur } = useFocusedState();

  const inputStyle = useMemo<CSSProperties>(() => {
    let inputStyle: CSSProperties = {
      border: "none",
      padding: 0,
      margin: 0,
      fontSize: "inherit",
      resize: "vertical",
      backgroundColor: "transparent",
      width: "100%",
    };

    if (disabled) {
      return { ...inputStyle, cursor: "not-allowed" };
    }
    return inputStyle;
  }, []);

  const innerPadding = padding[size] + (borders.md - borders.sm);

  const inputContainerStyle = useMemo<CSSProperties>(() => {
    let inputContainerStyle: CSSProperties = {
      border: borders.textInput,
      cursor: "text",
      padding: innerPadding,
      borderRadius: borderRadius[size],
      transition: transition.transition,
      transitionTimingFunction: transition.transitionTimingFunction,
      fontSize: fontSize[size],
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
      display: "flex",
      flexDirection: "row",
    };

    if (disabled) {
      return {
        ...inputContainerStyle,
        backgroundColor: colors.disabledBackground,
        borderColor: colors.disabledBorder,
        cursor: "not-allowed",
      };
    }

    if (isHovering || isFocused) {
      inputContainerStyle.border = borders.textInputActive;
      inputContainerStyle.padding = padding[size];
    }

    return inputContainerStyle;
  }, [isHovering, isFocused]);

  const inputContainerProps = {
    style: inputContainerStyle,
    onMouseEnter,
    onMouseLeave,
    onClick,
  };

  const inputProps = {
    className: fontStyles.textinput,
    style: inputStyle,
    value,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    },
    placeholder,
    onFocus,
    onBlur,
    disabled,
  };

  return (
    <div
      style={{
        margin: spacing.textInput,
      }}
    >
      {label && (
        <p
          className={fontStyles.text}
          style={{
            margin: 0,
            marginLeft: spacing.xs,
          }}
        >
          {label}
        </p>
      )}
      <div {...inputContainerProps}>
        {leftIcon && (
          <div
            style={{
              height: fontSize[size] + 4,
              width: fontSize[size] + 4,
              color: colors.icon,
              paddingRight: innerPadding,
            }}
          >
            {leftIcon === "search" ? <SearchIcon /> : leftIcon}
          </div>
        )}
        {multiline ? (
          <textarea ref={textareaRef} {...inputProps} />
        ) : (
          <input ref={inputRef} {...inputProps} />
        )}
      </div>
      {extra && (
        <small
          className={fontStyles.text}
          style={{
            display: "block",
            marginLeft: spacing.xs,
          }}
        >
          {extra}
        </small>
      )}
    </div>
  );
}

export default TextInput;
