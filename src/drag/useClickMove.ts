import * as React from "react";
import {MoveProps} from "./types";
import useMouseMove from "./useMouseMove";

/**
 * toggles dragging on and off when clicked.
 * apply move listener to window or component?
 * applying to component mostly works, but if you move to fast then the mouse gets off the component and it stops
 * working,  preferring a window event listener as it does not have this issue.
 *
 * window listener has issues where the callback gets bound to the initial value of lastE rather than the current value
 * at the moment. this version will be easier implemented by calling back with a total change rather than a change
 * since last move
 */

export interface Returns {
    onMouseDown(e: React.MouseEvent): void;
}

export default (props: MoveProps): Returns => {
    const {startMove, endMove} = useMouseMove(props);

    return {
        onMouseDown: (e) => {
            props.isDragging ? endMove(e) : startMove(e);
        }
    };
};
