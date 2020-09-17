import {Direction, IncrementedShiftProps} from "../types";
import {useCallback} from "react";
import {usePairedShift} from "./shiftToXY";
import {useIncrement} from "./useIncrement";

/**
 * creates a function which takes the direction as a props and calls the shift function based on increment props
 */

type Returns = (dir: Direction | null | undefined) => void;

export default (props: IncrementedShiftProps): Returns => {

    const {shiftX, shiftY} = usePairedShift(props);

    const _increment = useIncrement(props);

    /**
     * map direction to movement
     * can take direction null or undefined and simply do nothing
     */
    return useCallback(
        (direction: Direction | null | undefined) => {
            switch (direction) {
                case "left":
                    return shiftX(-1 * _increment);
                case "right":
                    return shiftX(_increment);
                case "up":
                    return shiftY(-1 * _increment);
                case "down":
                    return shiftY(_increment);
            }
        },
        [shiftX, shiftY, _increment]
    );
}
