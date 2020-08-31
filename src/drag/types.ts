import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface Props {
  isDragging: boolean;
  setIsDragging(isDragging: boolean): void;
  x: number;
  setX(x: number): void;
  y: number;
  setY(y: number): void;
  disabled?: boolean;
}

/**
 * hook definition for creating div binding
 */
export type Hook = (
  props: Props
) => DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
