import * as React from "react";
import useArrowMove from "./keys/useArrowMove";
import ClickMove from "./drag/ClickMove";
import useMouseMove from "./drag/useMouseMove";
import useDragMove from "./drag/useDragMove";
import useClickMove from "./drag/useClickMove";
import useClickDragMove from "./drag/useClickDragMove";

export default function App() {
  const [x, setX] = React.useState(50);

  const [y, setY] = React.useState(50);

  const [isDragging, setIsDragging] = React.useState(false);

  /**
   * arrow and click/drag share props
   */
  const dragProps = { x, y, setX, setY, isDragging, setIsDragging };

  return (
    <div
      style={{
        position: "relative"
      }}
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
        {...useClickDragMove(dragProps)}
        {...useArrowMove(dragProps)}
      />
    </div>
  );
}

/*
      <ClickMove
        x={x}
        setX={setX}
        y={y}
        setY={setY}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
      >
*/