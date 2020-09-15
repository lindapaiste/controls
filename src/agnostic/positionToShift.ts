import {BaseMoveProps, ShiftPosition, XY} from "../types";
import {useCallback} from "react";
import {shiftPointBy} from "@lindapaiste/geometry";

/**
 * convert props position and setPosition into a shift(pos) function
 */
export const useCreateShift = ({position, setPosition}: BaseMoveProps): (point: XY) => void => {

    return useCallback(
        (pos: XY) => setPosition(shiftPointBy(position, pos)),
        [position.x, position.y, setPosition]
    );
}

export const useMapPropsToShift = <P extends BaseMoveProps>(props: P): ShiftPosition & P => {
    const shift = useCreateShift(props);

    return {
        ...props,
        shift
    }
}
