import {BaseMoveProps, ShiftPosition, XY} from "../types";
import {useCallback} from "react";
import {shiftBy} from "@lindapaiste/geometry/lib/points/move";

/**
 * convert props position and setPosition into a shift(pos) function
 */
export const makeShift = ({position, setPosition}: BaseMoveProps): (point: XY) => void => {

    return useCallback(
        (pos: XY) => setPosition(shiftBy(position, pos)),
        [position.x, position.y, setPosition]
    );
}

export const mapProps = <P extends BaseMoveProps>(props: P): ShiftPosition & P => {
    const shift = makeShift(props);

    return {
        ...props,
        shift
    }
}
