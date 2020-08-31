import React from "react";
import useClickMove from "./useClickMove";
import makeBoundDiv from "./makeBoundDiv";

/**
 * component automatically handles binding event handlers by wrapping in a div
 */
export default makeBoundDiv(useClickMove);
