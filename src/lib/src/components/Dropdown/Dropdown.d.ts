import { ReactElement } from "react";

type DropdownItems = ReactElement | string

export interface DropdownProps {
  items?: DropdownItems[];
  anchor?: ReactElement | string;
  customAnchor?: ReactElement
  onItemClick?: (item: any, i: number) => any
}