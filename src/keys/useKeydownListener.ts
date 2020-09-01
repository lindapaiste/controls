import {useEffect, useState} from "react";
import {EventListenerHook} from "../types";

/**
 * helper utility hook handles adding and removing a listener
 *
 * if listener varies, should be memoized before being passed in here
 *
 * also returns a method which the user can call to remove the listener as a result of some action
 */

/**
 * listener is for a plain JS native event, not a synthetic react event
 */
export type KeyListener = (e: KeyboardEvent) => void;

export default (listener: KeyListener): EventListenerHook => {

    const [isActive, setIsActive] = useState(false);

    const add = () => {
        window.addEventListener('keydown', listener);
        setIsActive(true);
    }

    const remove = () => {
        window.removeEventListener('keydown', listener);
        setIsActive(false);
    }
    /**
     * automatically adds the listener on mount -- could make this optional based on a param
     */
    useEffect(() => {
            add();

            return remove;
        },
        [listener]
    );

    return {
        isActive,
        add,
        remove,
    }
}
