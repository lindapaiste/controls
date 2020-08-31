import { Props as DragProps } from "../drag/types";
import useArrowShift, { Props as ArrowProps } from "./useArrowShift";
import { useCallback } from "react";

/**
 * uses the same props interface as drag movers instead of than the shift function props on useArrowShift
 *
 * does not return anything because it attaches listener to the window
 */

export type Props = Pick<DragProps, "x" | "y" | "setX" | "setY"> &
  Omit<ArrowProps, "shiftX" | "shiftY">;

export default ({ x, y, setX, setY, ...passed }: Props) => {
  const shiftX = useCallback((n: number) => setX(x + n), [x, setX]);
  const shiftY = useCallback((n: number) => setY(y + n), [y, setY]);

  return useArrowShift({
    ...passed,
    shiftX,
    shiftY
  });
};
