import {EitherShift, ShiftPair, ShiftPosition, XY} from "../types";
import {useMemo} from "react";

/**
 * can separate a single shift prop into shiftX and shiftY or vice-versa
 */

const isPair = (props: EitherShift): props is ShiftPair => {
    return "shiftX" in props && "shiftY" in props;
}

const posAsPair = ({shift}: ShiftPosition): ShiftPair => {
    return {
        shiftX: (n: number) => shift({
            x: n,
            y: 0
        }),
        shiftY: (n: number) => shift({
            x: 0,
            y: n
        }),
    }
}

const pairAsPos = ({shiftX, shiftY}: ShiftPair): ShiftPosition => {
    return {
        shift: ({x, y}: XY) => {
            shiftX(x);
            shiftY(y);
        }
    }
}

/**
 * cannot call useMemo conditionally, as doing so would violate the rules of hooks
 */

export const useSingleShift = (props: EitherShift): ShiftPosition => {
    const factory = () => isPair(props) ? pairAsPos(props) : props;
    return useMemo(factory, extractDeps(props));
}

export const usePairedShift = (props: EitherShift): ShiftPair => {
    const factory = () => isPair(props) ? props : posAsPair(props);
    return useMemo(factory, extractDeps(props));
}

const extractDeps = (props: EitherShift) => {
    return isPair(props) ? [props.shiftX, props.shiftY] : [props.shift];
}
