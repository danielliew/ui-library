import { MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
  type?: "default" | "solid"
  size?: 'sm' | 'md' | 'lg'
  onClick?: MouseEventHandler
  children?: ReactNode;
  disabled?: boolean;
}
