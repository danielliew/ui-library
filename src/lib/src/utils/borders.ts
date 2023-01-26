import { colors } from "./colors";
import { unit } from "./constants";
import { theme } from "./theme";

export const borders = {
  ...theme.borders,
  button: `${theme.borders.sm}${unit} solid ${colors.border}`,
  textInput: `${theme.borders.sm}${unit} solid ${colors.border}`,
  textInputActive: `${theme.borders.md}${unit} solid ${colors.border}`
};
