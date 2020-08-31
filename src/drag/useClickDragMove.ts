import {MoveProps} from "./types";
import {Returns} from "./useDragMove";
import useMouseMove from "./useMouseMove";

/**
 * in order to use the same handlers for both a click and a drag, need to distinguish
 *  between an immediate down/up click and a drag, such that the movement ends
 *  on mouseup from a drag but not from a click
 */

export default (props: MoveProps): Returns => {
    const {mouseDown, startMove, endMove} = useMouseMove(props);

    return {
        /**
         * mouse down starts the move if not already dragging, but will end it if it's a second click for a click move
         */
        onMouseDown: (e) => {
            props.isDragging ? endMove(e) : startMove(e);
        },
        /**
         * mouse up ends the move if a drag has taken place, but does nothing, ie. continues the move, if there was no
         * movement between mouse down and mouse up.
         */
        onMouseUp: (e) => {
            if ( mouseDown && (
                e.nativeEvent.pageX !== mouseDown.pageX ||
                e.nativeEvent.pageY !== mouseDown.pageY )
            ) {
                endMove(e);
            }
        }
    };
};
