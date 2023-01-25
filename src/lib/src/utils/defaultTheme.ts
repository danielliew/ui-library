const defaultUnit = "px";

const defaultColors = {
  primary: "#000000",
  primaryBackground: "#ffffff",

  secondary: "#213547",
  secondaryBackground: "#213547",

  background: "#ffffff",

  border: "#000000",

  disabled: "#383838",
  disabledBackground: "#ddd",
  disabledBorder: "#ddd",

  hover: "#aaa",
  hoverBackground: "#222",
};

const defaultFontSize = {
  xs: 8,
  sm: 12,
  md: 14,
  lg: 20,
  xl: 24,
};

const defaultPadding = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
};

const defaultBorders = {
  xs: 1,
  sm: 1,
  md: 1,
  lg: 2,
  xl: 3,
};

const defaultBorderRadius = {
  xs: 5,
  sm: 9,
  md: 15.5,
  lg: 17,
  xl: 18
};

const defaultBreakpoints = {
  xs: 0, // phone
  sm: 600, // tablets
  md: 900, // small laptop
  lg: 1200, // desktop
  xl: 1536, // large screens
};

const defaultTransition = {
  transition: ".25s",
  transitionTimingFunction: "ease-in-out",
};

export default {
  unit: defaultUnit,
  colors: defaultColors,
  fontSize: defaultFontSize,
  padding: defaultPadding,
  borders: defaultBorders,
  borderRadius: defaultBorderRadius,
  breakpoints: defaultBreakpoints,
  transition: defaultTransition,
};
