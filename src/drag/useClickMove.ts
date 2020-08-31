import * as React from "react";
import {useCallback, useState} from "react";
import {Props} from "./types";

/**
 * toggles dragging on and off when clicked.
 * apply move listener to window or component?
 * applying to component mostly works, but if you move to fast then the mouse gets off the component and it stops
 * working,  preferring a window event listener as it does not have this issue.
 *
 * window listener has issues where the callback gets bound to the initial value of lastE rather than the current value
 * at the moment. this version will be easier implemented by calling back with a total change rather than a change since last move
 */

export interface Returns {
    onMouseDown(e: React.MouseEvent): void;
}

export default ({isDragging, setIsDragging, x, setX, y, setY}: Props): Returns => {
    /**
     * store the position of the mouseDown event
     */
    const [mouseDown, setMouseDown] = useState<MouseEvent>();

    /**
     * store the values of x and y at the time of the mouseDown
     */
    const [initial, setInitial] = useState<{ x: number; y: number }>();

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(!isDragging);
        setMouseDown(e.nativeEvent);
        setInitial({ x, y });
    };

    const mouseMoveListener = useCallback(
        (e: MouseEvent) => {
            if (isDragging) {
                console.log("drag moving");
                console.log(e);
                if (!mouseDown || !initial) {
                    console.error("no initial position set");
                    return;
                }
                const delta = {
                    x: e.pageX - mouseDown.pageX,
                    y: e.pageY - mouseDown.pageY
                };
                setX(initial.x + delta.x);
                setY(initial.y + delta.y);
            }
        },
        [initial, mouseDown, isDragging, setX, setY]
    );

    React.useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", mouseMoveListener);
        } else {
            window.removeEventListener("mousemove", mouseMoveListener);
        }

        return () => window.removeEventListener("mousemove", mouseMoveListener);
    }, [isDragging, mouseMoveListener]);

    return {
        onMouseDown
    };
};
