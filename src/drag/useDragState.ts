import {useState} from "react";
import {IPoint, IRangeMethods} from "@lindapaiste/geometry";

export interface DragProps {
    /**
     * boundaries is an object which has a method to constrain a point
     */
    boundaries?: IRangeMethods<IPoint>;
    /**
     * can start with an initial translation, but does this make sense?
     * vs. starting at 0,0 and adding the initial higher up
     */
    initialTranslateX?: number;
    initialTranslateY?: number;
}

export interface DragEventHandlers {
    onDragStart(e: MouseEvent): void;

    onDragEnd(e: MouseEvent): void;

    onDragMove(e: MouseEvent): void;
}

/**
 * note: could reduce the number of variables if storing previous x/y instead of start
 */
export interface DragState {
    /**
     * save the position where the mouse move started in order to see how much it has changed
     */
    startMouseX: number;
    startMouseY: number;
    /**
     * the current translation, cumulative across all drags
     */
    translateX: number;
    translateY: number;
    /**
     * the existing translation at the start of this current drag movement
     */
    startTranslateX: number;
    startTranslateY: number;
    /**
     * whether or not the mouse is currently dragging
     */
    isDragging: boolean;
}

/**
 * converting the old DragController class which takes render as a prop
 * into a series of hooks for better composability
 *
 *
 * here, a drag state is managed internally
 * returns event handlers to be used by DragResponder
 *
 * applies event movements to state, but also constrains them based on boundaries
 *
 * what about integrating with native PanResponder?
 */

export default ({boundaries}: Pick<DragProps, "boundaries">): DragState & DragEventHandlers => {
    const [state, setState] = useState<DragState>({
        startMouseX: 0,
        startMouseY: 0,
        translateX: 0,
        translateY: 0,
        startTranslateX: 0,
        startTranslateY: 0,
        isDragging: false
    });

    const onDragStart = (e: MouseEvent) => {
        e.preventDefault();
        setState((prevState) => ({
            ...prevState,
            isDragging: true,
            startMouseX: e.screenX,
            startMouseY: e.screenY,
            startTranslateX: prevState.translateX,
            startTranslateY: prevState.translateY
        }));
        window.addEventListener("mousemove", onDragMove);
        window.addEventListener("mouseup", onDragEnd);
    };

    const onDragMove = (e: MouseEvent) => {
        if (state.isDragging) {
            e.preventDefault();
            const dx = e.screenX - state.startMouseX;
            const dy = e.screenY - state.startMouseY;
            const move = boundaries
                ? boundaries.constrain({x: dx, y: dy})
                : {x: dx, y: dy};
            setState((prevState) => ({
                ...prevState,
                translateX: prevState.startTranslateX + move.x,
                translateY: prevState.startTranslateY + move.y
            }));
            // return so that it can be used for the onDragEnd callback
            return move;
        }
    };

    const onDragEnd = () => {
        setState((prevState) => ({
            ...prevState,
            isDragging: false
        }));
        window.removeEventListener("mousemove", onDragMove);
        window.addEventListener("mouseup", onDragEnd);
    };

    // useEffect clean-up?

    return {
        ...state,
        onDragStart,
        onDragEnd,
        onDragMove
    };
};
