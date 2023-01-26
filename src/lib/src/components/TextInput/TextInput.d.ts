import { ReactElement } from "react";

export interface TextInputProps {
  value?: string;
  onValueChange?: (value: string | undefined) => any
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  label?: string;
  extra?: string;
  disabled?: boolean;
  multiline?: boolean;
  leftIcon?: string | ReactElement
}
