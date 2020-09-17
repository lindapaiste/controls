import * as React from "react";
import {useArrowMove, useClickDragMove, usePlusMinusValue} from "@lindapaiste/react-controls";
import {useState} from "react";

export default () => {
    const [position, setPosition] = useState({x: 50, y: 50});

    const [isDragging, setIsDragging] = useState(false);

    const [scale, setScale] = useState(1);
    /**
     * arrow and click/drag share props
     */
    const dragProps = { position, setPosition, isDragging, setIsDragging };

    return (
        <div
            style={{
                position: "relative"
            }}
        >
            <div
                style={{
                    position: "absolute",
                    top: position.y,
                    left: position.x,
                    width: 100 * scale,
                    height: 100 * scale,
                    backgroundColor: "blue"
                }}
                {...useClickDragMove(dragProps)}
                {...useArrowMove(dragProps)}
                {...usePlusMinusValue({
                    value: scale,
                    setValue: setScale,
                    increment: .1,
                })}
            />
        </div>
    );
}
