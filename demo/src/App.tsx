import * as React from "react";
import {useArrowMove, useClickDragMove} from "@lindapaiste/react-controls";

export default () => {
    const [position, setPosition] = React.useState({x: 50, y: 50});

    const [isDragging, setIsDragging] = React.useState(false);

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
                    width: 100,
                    height: 100,
                    backgroundColor: "blue"
                }}
                {...useClickDragMove(dragProps)}
                {...useArrowMove(dragProps)}
            />
        </div>
    );
}
