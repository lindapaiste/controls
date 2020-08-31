import makeBoundDiv from "./makeBoundDiv";
import useClickMove from "./useClickMove";
import useDragMove from "./useDragMove";
import useClickDragMove from "./useClickDragMove";

export * from "./types";

export const ClickMove = makeBoundDiv(useClickMove);
export const DragMove = makeBoundDiv(useDragMove);
export const ClickDragMove = makeBoundDiv(useClickDragMove);

export {default as useClickMove} from "./useClickMove";
export {default as useDragMove} from "./useDragMove";
export {default as useClickDragMove} from "./useClickDragMove";
