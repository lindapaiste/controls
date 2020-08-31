import * as React from "react";
import "./styles.css";
import useArrowMove from "./keys/useArrowMove";
import ClickMove from "./drag/ClickMove";

export default function App() {
    const [x, setX] = React.useState(50);

    const [y, setY] = React.useState(50);

    const [isDragging, setIsDragging] = React.useState(false);

    const moveX = React.useCallback((n: number) => setX((prev) => prev + n), [
        setX
    ]);
    const moveY = React.useCallback((n: number) => setY((prev) => prev + n), [
        setY
    ]);

    useArrowMove({
        moveX,
        moveY
    });

    return (
        <div
            style={{
                position: "relative"
            }}
        >
            <ClickMove
                x={x}
                setX={setX}
                y={y}
                setY={setY}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
            >
                <div
                    style={{
                        position: "absolute",
                        top: y,
                        left: x,
                        width: 100,
                        height: 100,
                        backgroundColor: "blue"
                    }}
                />
            </ClickMove>
        </div>
    );
}
