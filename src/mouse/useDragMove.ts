import {MouseMoveProps} from "../types";
import useMouseMove from "./useMouseMove";
import {MouseEvent, useCallback} from "react";
import * as React from "react";

/**
 * begins move when the mouse is pressed down and stops when it it released, only moving while held down
 *
 * needs a window event listener for mouse up in case the mouse is no longer on top of the target when it is released,
 * for example when dragging the corner of a fixed-ratio bounding box
 */

export interface Returns {
    onMouseDown(e: MouseEvent): void;

    onMouseUp(e: MouseEvent): void;
}

export default (props: MouseMoveProps): Returns => {
    const {startMove, endMove} = useMouseMove(props);

    const mouseUpListener = useCallback(
        () => endMove(),
        [endMove]
    );

    React.useEffect(() => {
        if (props.isDragging) {
            window.addEventListener("mouseup", mouseUpListener);
        } else {
            window.removeEventListener("mouseup", mouseUpListener);
        }

        return () => window.removeEventListener("mouseup", mouseUpListener);
    }, [props.isDragging, mouseUpListener]);

    return {
        onMouseDown: startMove,
        onMouseUp: endMove
    };
};
