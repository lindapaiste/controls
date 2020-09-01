import {Direction} from "../types";

/**
 * mapping of e.key keycodes for arrows
 */

export type KeyMap = [string, Direction][];

const KEYS: KeyMap = [
    ["ArrowLeft", "left"],
    ["ArrowRight", "right"],
    ["ArrowUp", "up"],
    ["ArrowDown", "down"],
]

/**
 * make this be a factory so that it can apply to another set of keys, such as WASD
 */
export const createGetDirection = (map: KeyMap) =>
    (e: KeyboardEvent): Direction | null => {
        const pair = map.find(([key]) => e.key === key );
        return pair ? pair[1] : null;
    }

/**
 * standard usage is for the arrow keys
 */
export const getArrowDirection = createGetDirection(KEYS);
