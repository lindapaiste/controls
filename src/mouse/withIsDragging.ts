import {IsDraggingProps} from "../types";
import {useState} from "react";

/**
 * locally store dragging state
 */

export default <HookProps, HookReturns> (hook: (props: HookProps & IsDraggingProps) => HookReturns): (props: HookProps) => HookReturns => {
    const [isDragging, setIsDragging] = useState(false);

    return (props) => hook({
        ...props,
        isDragging,
        setIsDragging,
    })
}
