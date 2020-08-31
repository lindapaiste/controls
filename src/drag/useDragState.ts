import {DragEventHandlers, DragProps, DragState} from "./types";
import {useState} from "react";

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


export default ({boundaries}: Pick<DragProps, 'boundaries'>): DragState & DragEventHandlers => {

    const [state, setState] = useState<DragState>({
        startMouseX: 0,
        startMouseY: 0,
        translateX: 0,
        translateY: 0,
        startTranslateX: 0,
        startTranslateY: 0,
        isDragging: false,
    })

    const onDragStart = (e: MouseEvent) => {
        e.preventDefault();
        console.log('beginning drag');
        setState(prevState => ({
            ...prevState,
            isDragging: true,
            startMouseX: e.screenX,
            startMouseY: e.screenY,
            startTranslateX: prevState.translateX,
            startTranslateY: prevState.translateY,
        }));
        window.addEventListener('mousemove', onDragMove);
        window.addEventListener('mouseup', onDragEnd);
    }

    const onDragMove = (e: MouseEvent) => {
        if (state.isDragging) {
            e.preventDefault();
            const dx = e.screenX - state.startMouseX;
            const dy = e.screenY - state.startMouseY;
            const move = boundaries ? boundaries.constrain({x: dx, y: dy}) : ({x: dx, y: dy});
            /**const translate = {
                x: this.state.startTranslateX + x,
                y: this.state.startTranslateY + y
            }
             if (this.props.onDrag) {
                //don't pass this current movement, pass the overall translation
                this.props.onDrag(translate);
            }*/
            setState(prevState => ({
                ...prevState,
                translateX: prevState.startTranslateX + move.x,
                translateY: prevState.startTranslateY + move.y,
            }));
            //return so that it can be used for the onDragEnd callback
            return move;
        }
    }

    const onDragEnd = () => {
        /*let move = this.doDrag(e);
        if (this.props.onDragEnd) {
          this.props.onDragEnd(move);
        }*/
        setState(prevState => ({
            ...prevState,
            isDragging: false
        }));
        //console.log(move);
        window.removeEventListener('mousemove', onDragMove);
        window.addEventListener('mouseup', onDragEnd);
        console.log('ending drag');
    }

    //useEffect clean-up?

    return {
        ...state,
        onDragStart,
        onDragEnd,
        onDragMove,
    }
}
