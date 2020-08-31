import { useState } from "react";
import * as React from "react";
import {Props} from "./types";

/**
 * this version doesn't manage the position internally
 * could potentially have an internal version of isDragging so that passing it down could be optional
 */

export interface Returns {
    onClick: React.MouseEventHandler;
    onMouseMove: React.MouseEventHandler;
}

export default ({isDragging, setIsDragging, x, setX, y, setY}: Props): Returns => {
    const [lastE, setLastE] = useState<MouseEvent>();

    return {
        onClick: (e: React.MouseEvent) => {
            setIsDragging(!isDragging);
            setLastE(e.nativeEvent);
        },
        onMouseMove: (e: React.MouseEvent) => {
            if (isDragging && lastE !== undefined) {
                const delta = {
                    x: e.nativeEvent.pageX - lastE.pageX,
                    y: e.nativeEvent.pageY - lastE.pageY
                };
                setX(x + delta.x);
                setY(y + delta.y);
                setLastE(e.nativeEvent);
            }
        }
    };
};
