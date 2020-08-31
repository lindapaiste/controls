import { MoveProps as DragProps } from "../drag/types";
import useArrowShift, { Props as ArrowProps } from "./useArrowShift";
import { useCallback } from "react";
import {shiftX as shiftPointX, shiftY as shiftPointY} from "@lindapaiste/geometry";

/**
 * uses the same props interface as drag movers instead of than the shift function props on useArrowShift
 *
 * does not return anything because it attaches listener to the window
 */

export type Props = Pick<DragProps, "position" | "setPosition"> &
  Omit<ArrowProps, "shiftX" | "shiftY">;

export default ({ position, setPosition, ...passed }: Props) => {
  const shiftX = useCallback(
      (n: number) => setPosition(shiftPointX(position, n)),
      [position.x, setPosition]
  );
  const shiftY = useCallback(
      (n: number) => setPosition(shiftPointY(position, n)),
      [position.y, setPosition]
  );

  return useArrowShift({
    ...passed,
    shiftX,
    shiftY
  });
};
