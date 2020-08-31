import useDragMove, {Props as HookProps} from "./useDragMove";
import React, {PropsWithChildren, useEffect} from "react";

/**
 * component automatically handles binding event handlers by wrapping in a div
 */

type Props = HookProps & {
    setIsDragging?: (isDragging: boolean) => void;
}

export default ({moveX, moveY, setIsDragging, children}: PropsWithChildren<Props>) => {
    const { isDragging, ...handlers } = useDragMove({ moveX, moveY });

    useEffect(() => {
        if (setIsDragging) {
            setIsDragging(isDragging);
        }
    }, [isDragging]);

    return (
        <div draggable="true" {...handlers}>
            {children}
        </div>
    );
};
