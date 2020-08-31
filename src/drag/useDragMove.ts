import * as React from "react";
import { useState } from "react";

/**
 * like useArrowMove, useDragMove takes in functions to be called on each move
 */
export interface Props {
    moveX(n: number): void;

    moveY(n: number): void;
}

/**
 * it calls the move function itself
 * and returns event handlers to attach to the component
 */
export interface Returns {
    onDragStart(e: React.DragEvent): void;

    onDragEnd(e: React.DragEvent): void;

    onDrag(e: React.DragEvent): void;

    isDragging: boolean;
}

export default ({ moveX, moveY }: Props): Returns => {
    const [isDragging, setIsDragging] = useState(false);

    const [lastE, setLastE] = useState<DragEvent>();

    const onDragStart = (e: React.DragEvent) => {
        //e.preventDefault();
        console.log("beginning drag");
        setIsDragging(true);
        setLastE(e.nativeEvent);
    };

    const onDrag = (e: React.DragEvent) => {
        console.log("drag moving");
        /**
         * note: event contains e.movementX and e.movementY, but these seem to always be zero
         */
        console.log(e.nativeEvent);
        //console.log(e.nativeEvent);
        if (!lastE) {
            console.error("no initial position set");
            return;
        }

        const { pageX, pageY } = e.nativeEvent;
        /**
         * mostly works, except that that mouse release always fires with position [0,0], so have to hackily ignore this
         */
        if (!(pageX === 0 && pageY === 0)) {
            moveX(e.nativeEvent.pageX - lastE.pageX);
            moveY(e.nativeEvent.pageY - lastE.pageY);
            setLastE(e.nativeEvent);
        }
    };

    const onDragEnd = (e: React.DragEvent) => {
        console.log(e.nativeEvent);
        setIsDragging(false);
        console.log("ending drag");
    };

    return {
        onDrag,
        onDragEnd,
        onDragStart,
        isDragging
    };
};
