import {Direction, IncrementedShiftProps} from "../types";
import {useCallback, useMemo} from "react";
import {usePairedShift} from "./shiftToXY";

/**
 * creates a function which takes the direction as a props and calls the shift function based on increment props
 */

type Returns = (dir: Direction | null | undefined) => void;

export default ({disabled = false, increment = 1, invert = false, ...props}: IncrementedShiftProps): Returns => {

    const {shiftX, shiftY} = usePairedShift(props);

    /**
     * apply inversion to increment -- or don't
     * handle disabled by setting move to 0
     */
    const _increment = useMemo(
        () => disabled ? 0 : increment * (invert ? -1 : 1),
        [disabled, increment, invert]
    );

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
