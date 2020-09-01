import { MouseMoveProps } from "../types";
import useMouseMove from "./useMouseMove";
import {MouseEvent} from "react";

/**
 * begins move when the mouse is pressed down and stops when it it released, only moving while held down
 */

export interface Returns {
    onMouseDown(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}

export default (props: MouseMoveProps): Returns => {
    const { startMove, endMove } = useMouseMove(props);

    return {
        onMouseDown: startMove,
        onMouseUp: endMove
    };
};
