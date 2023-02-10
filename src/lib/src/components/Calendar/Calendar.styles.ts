import { CSSProperties } from "react";

import { colors } from "../../utils/colors";
import { fontSize } from "../../utils/fontSize";
import { borders } from "../../utils/borders";
import { borderRadius } from "../../utils/borderRadius";
import { padding } from "../../utils/padding";
import { transition } from "../../utils/transition";
import { unit } from "../../utils/constants";

export const iconStyle: CSSProperties = {
  height: fontSize.xl + 4,
  width: fontSize.xl + 4,
  color: colors.icon,
  cursor: "pointer",
};

export const calendarTopBarItemStyle: CSSProperties = {
  padding: padding.sm,
};

export const calendarBottomBarItemStyle: CSSProperties = {
  padding: padding.sm,
};

export const calendarItemContainerStyle: CSSProperties = {
  padding: padding.sm,
  position: "relative"
};

export const calendarItemStyle: CSSProperties = {
  color: colors.primary,
  backgroundColor: colors.primaryBackground,
  border: borders.calendarItem,
  borderRadius: borderRadius.md,
  cursor: "pointer",
  height: fontSize.xl + 8,
  width: fontSize.xl + 8,
  transition: transition.transition,
  transitionTimingFunction: transition.transitionTimingFunction,
};

export const calendarItemSelectedStyle: CSSProperties = {
  backgroundColor: colors.primary,
  color: colors.primaryBackground,
};

export const calendarItemHoveringStyle: CSSProperties = {
  backgroundColor: colors.hoverBackgroundGrey,
};

export const calendarMonthItemStyle: CSSProperties = {
  padding: `${padding.xl}${unit} ${padding.lg}${unit}`,
  backgroundColor: colors.primaryBackground,
  transition: transition.transition,
  transitionTimingFunction: transition.transitionTimingFunction,
};

export const calendarMonthItemHoveringStyle: CSSProperties = {
  backgroundColor: `rgb(248, 248, 248)`,
};

export const calendarMonthItemSelectedStyle: CSSProperties = {
  fontWeight: "bold",
};

export const calendarCardStyle: CSSProperties = {
    padding: padding.lg,
}

export const calendarCardInnerStyle: CSSProperties = {
    backgroundColor: colors.primaryBackground,
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px`,
    padding: `${padding.md}${unit} ${padding.sm}${unit} ${padding.sm}${unit} ${padding.sm}${unit}`,
    borderRadius: borderRadius.md
}

export const hoverMenuContentStyle: CSSProperties = {
    position: "absolute",
    overflow: "auto",
    display: "none",
    listStyle: "none",
    margin: 0,
    backgroundColor: "transparent",
    fontFamily: "inherit",
    zIndex: 5,
    opacity: 0,
    transition: `all 0.3s ease-in-out`,
    minHeight: `100px`,
    minWidth: `100px`,
}