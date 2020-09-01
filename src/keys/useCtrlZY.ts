import useKeydownListener from "./useKeydownListener";
import {EventListenerHook} from "../types";

/**
 * takes props undo() amd optional redo()
 *
 * adds global window event listeners on keys ctrl+Z and ctrl+Y
 */

export interface Props {
    undo(): void;
    redo?(): void;
}

export default (props: Props): EventListenerHook => {

    return useKeydownListener( e => {
        if (e.ctrlKey) {
            if (e.key === 'z') {
                props.undo();
            } else if (e.key === 'y' && props.redo !== undefined) {
                props.redo();
            }
        }
    })
}
