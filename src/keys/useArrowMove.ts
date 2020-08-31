import useKeydownListener from "./useKeydownListener";
import {EventListenerHook} from "../types";
import {useCallback} from "react";

/**
 * idea: could call repeatedly on a time interval if the key is held down
 */

export interface Props {
    /**
     * callback functions to execute the move
     * these expect to receive a number. optional props invert and increment control what that number is.
     *
     * could make both optional with the intention that movement might only exist in one direction
     */
    moveX(n: number): void;
    moveY(n: number): void;
    /**
     * whether to flip the increment such that the right arrow is a negative move instead of positive, etc.
     * defaults to false
     */
    invert?: boolean;
    /**
     * how much to move on each key press
     */
    increment?: number;
}

export default ({moveX, moveY, increment = 1, invert = false}: Props): EventListenerHook => {

    /**
     * apply inversion to increment -- or don't
     */
    const _increment = increment * (invert ? -1 : 1);

    /**
     * how to handle each key
     */
    const handleKeyPress = useCallback(
        (e: KeyboardEvent): void => {
            switch (e.key) {
                case "ArrowLeft":
                    return moveX(-1 * _increment);
                case "ArrowRight":
                    return moveX(_increment);
                case "ArrowUp":
                    return moveY(-1 * _increment);
                case "ArrowDown":
                    return moveY(_increment);
            }
        },
        [moveX, moveY, _increment]
    );

    return useKeydownListener( handleKeyPress );

}
