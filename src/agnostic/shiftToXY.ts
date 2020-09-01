import {EitherShift, ShiftPair, ShiftPosition, XY} from "../types";
import {useMemo} from "react";

/**
 * can separate a single shift prop into shiftX and shiftY or vice-versa
 */

const isPair = (props: EitherShift): props is ShiftPair => {
    return "shiftX" in props && "shiftY" in props;
}

const pairToPos = ({shiftX, shiftY}: ShiftPair): ShiftPosition => {
    return useMemo(
        () => ({
            shift: ({x, y}: XY) => {
                shiftX(x);
                shiftY(y);
            }
        }),
        [shiftX, shiftY]
    );
}

const posToPair = ({shift}: ShiftPosition): ShiftPair => {
    return useMemo(
        () => ({
            shiftX: (n: number) => shift({
                x: n,
                y: 0
            }),
            shiftY: (n: number) => shift({
                x: 0,
                y: n
            }),
        }),
        [shift]
    );
}

export const toSingleShift = (props: EitherShift): ShiftPosition => {
    return isPair(props) ? pairToPos(props) : props;
}

export const toPairedShift = (props: EitherShift): ShiftPair => {
    return isPair(props) ? props : posToPair(props);
}
