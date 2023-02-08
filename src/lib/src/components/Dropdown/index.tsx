import React, { CSSProperties, useMemo, useRef, useState } from "react";
import useHoveringState from "../../hooks/useHoverHandler";
import { colors } from "../../utils/colors";
import { padding } from "../../utils/padding";
import Button from "../Button";
import { DropdownProps } from "./Dropdown";
import styles from "./Dropdown.module.css";
import fontStyles from "../../utils/fonts/fonts.module.css";
import { borderRadius } from "../../utils/borderRadius";
import { transition } from "../../utils/transition";
import useRefListener from "../../hooks/useRefListener";

function Dropdown({
  items = [],
  anchor,
  customAnchor,
  onItemClick,
}: DropdownProps) {
  const anchorHover = useHoveringState();
  const itemsHover = useHoveringState();

  const dropdownContainerStyle: CSSProperties = {
    position: "relative",
    zIndex: 100,
    width: "max-content",
    height: "max-content",
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const { screenSegments } = useRefListener(dropdownRef);

  const dropdownMenuStyle = useMemo<CSSProperties>(() => {
    let dropdownMenuStyle: CSSProperties = {
      position: "absolute",
      width: "fit-content",
      display: "none",
      listStyle: "none",
      padding: 0,
      margin: 0,
      boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px`,
      minWidth: "100px",
      backgroundColor: "transparent",
      fontFamily: "inherit",
      borderRadius: borderRadius.sm,
      overflow: "hidden",
      zIndex: 9999,
    };
    if (anchorHover.isHovering || itemsHover.isHovering) {
      dropdownMenuStyle.display = "block";
    }
    switch (screenSegments) {
      case "topRight":
        dropdownMenuStyle.top = "100%";
        dropdownMenuStyle.right = "0";
        break;
      case "bottomLeft":
        dropdownMenuStyle.bottom = "100%";
        dropdownMenuStyle.left = "0";
        break;
      case "bottomRight":
        dropdownMenuStyle.bottom = "100%";
        dropdownMenuStyle.right = "0";
        break;
      default:
        dropdownMenuStyle.top = "100%";
        dropdownMenuStyle.left = "0";
        break;
    }
    return dropdownMenuStyle;
  }, [anchorHover.isHovering, itemsHover.isHovering, screenSegments]);

  const [dropdownItemHover, setDropdownItemHover] = useState<number | null>(
    null
  );

  const dropdownItemStyle: CSSProperties[] = useMemo<CSSProperties[]>(() => {
    let dropdownItemStyle: CSSProperties = {
      color: colors.primary,
      cursor: "pointer",
      padding: padding.md,
      fontFamily: "inherit",
      transition: transition.transition,
      transitionTimingFunction: transition.transitionTimingFunction,
    };

    return items.map((_: any, key: number) => {
      const isHovering = dropdownItemHover === key;
      return {
        ...dropdownItemStyle,
        color: isHovering ? colors.hover : colors.primary,
        backgroundColor: isHovering
          ? colors.hoverBackgroundLight
          : colors.background,
      };
    });
  }, [dropdownItemHover]);

  return (
    <div
      ref={dropdownRef}
      className={fontStyles.dropdown}
      style={dropdownContainerStyle}
      onMouseEnter={anchorHover.onMouseEnter}
      onMouseLeave={anchorHover.onMouseLeave}
    >
      {customAnchor || <Button>{anchor}</Button>}
      <ul
        className={styles["dropdown-menu"]}
        style={dropdownMenuStyle}
        onMouseEnter={itemsHover.onMouseEnter}
        onMouseLeave={itemsHover.onMouseLeave}
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={dropdownItemStyle[i]}
            onMouseEnter={() => setDropdownItemHover(i)}
            onMouseLeave={() => setDropdownItemHover(null)}
            onClick={() => {
              if (onItemClick) onItemClick(item, i);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
