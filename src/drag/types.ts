import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface XY {
  x: number;
  y: number;
}

export interface MoveProps {
  isDragging: boolean;
  setIsDragging(isDragging: boolean): void;
  position: XY;
  setPosition(point: XY): void;
  disabled?: boolean;
}

export interface MovePropsXY {
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
export type MoveHook = (
  props: MoveProps
) => DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
