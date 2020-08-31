import * as React from "react";
import { useCallback, useState } from "react";
import { Props } from "./types";

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

export default ({
  isDragging,
  setIsDragging,
  x,
  setX,
  y,
  setY
}: Props): Returns => {
  /**
   * store the position of the mouseDown event
   */
  const [mouseDown, setMouseDown] = useState<MouseEvent>();

  /**
   * store the values of x and y at the time of the mouseDown
   */
  const [initial, setInitial] = useState<{ x: number; y: number }>();

  const startMove = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMouseDown(e.nativeEvent);
    setInitial({ x, y });
  };

  const endMove = (e: React.MouseEvent) => {
    setIsDragging(false);
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
    startMove,
    endMove,
    mouseDown
  };
};
