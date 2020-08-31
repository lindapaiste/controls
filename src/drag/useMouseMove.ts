import * as React from "react";
import {useCallback, useState} from "react";
import {MoveProps, XY} from "./types";
import {shiftBy} from "@lindapaiste/geometry";

/**
 * want ClickMove and DragMove to share as much logic as possible
 */

/**
 * return function to start and end move
 * do not need to return a function to execute move because this is attached to the window
 */

export interface Returns {
    startMove(e: React.MouseEvent): void;

    endMove(e: React.MouseEvent): void;

    /**
     * return the mouseDown position for use by ClickDragMove
     */
    mouseDown: MouseEvent;
}

export default ({ isDragging, setIsDragging, position, setPosition, disabled = false }: MoveProps): Returns => {
    /**
     * store the position of the mouseDown event
     */
    const [mouseDown, setMouseDown] = useState<MouseEvent>();

    /**
     * store the values of x and y at the time of the mouseDown
     */
    const [initial, setInitial] = useState<XY>();

    const startMove = (e: React.MouseEvent) => {
        if (!disabled) {
            setIsDragging(true);
            setMouseDown(e.nativeEvent);
            setInitial(position);
        }
    };

    const endMove = () => {
        setIsDragging(false);
    };

    const mouseMoveListener = useCallback(
        (e: MouseEvent) => {
            if (isDragging && !disabled) {
                if (!mouseDown || !initial) {
                    console.error("no initial position set");
                    return;
                }
                const delta = {
                    x: e.pageX - mouseDown.pageX,
                    y: e.pageY - mouseDown.pageY
                };
                setPosition(shiftBy(initial, delta));
            }
        },
        [initial, mouseDown, isDragging, setPosition, disabled]
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
        startMove,
        endMove,
        mouseDown
    };
};
