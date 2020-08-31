import React from "react";
import makeBoundDiv from "./makeBoundDiv";
import useDragMove from "./useDragMove";

/**
 * component automatically handles binding event handlers by wrapping in a div
 */
export default makeBoundDiv(useDragMove);
