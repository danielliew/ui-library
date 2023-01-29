import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  type?: "default" | "solid" | "text";
  size?: "sm" | "md" | "lg";
  onClick?: MouseEventHandler;
  children?: ReactNode;
  disabled?: boolean;
  htmlType?: "button" | "reset" | "submit";
}
