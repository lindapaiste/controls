import {IncrementedMoveProps} from "../types";
import useArrowShift from "./useArrowShift";
import {mapProps} from "../agnostic/positionToShift";

/**
 * uses the same props interface as drag movers instead of than the shift function props on useArrowShift
 *
 * does not return anything because it attaches listener to the window
 */

export default (props: IncrementedMoveProps) => useArrowShift(mapProps(props));
