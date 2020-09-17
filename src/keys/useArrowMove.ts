import {IncrementedMoveProps} from "../types";
import useArrowShift from "./useArrowShift";
import {useMapPropsToShift} from "../agnostic";

/**
 * uses the same props interface as drag movers instead of than the shift function props on useArrowShift
 *
 * does not return anything because it attaches listener to the window
 */

export default (props: IncrementedMoveProps) => useArrowShift(useMapPropsToShift(props));
