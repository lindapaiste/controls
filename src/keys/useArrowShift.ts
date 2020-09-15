import useKeydownListener from "./useKeydownListener";
import {useCallback} from "react";
import {EventListenerHook, IncrementedShiftProps} from "../types";
import {useDirectionShift} from "../agnostic";
import {getArrowDirection} from "./getKeyDirection";

export default (props: IncrementedShiftProps): EventListenerHook => {

    const onDirection = useDirectionShift(props);

    const handleKeyPress = useCallback(
        (e: KeyboardEvent): void => {
            const dir = getArrowDirection(e);
            onDirection(dir);
        },
        [onDirection]
    );

    return useKeydownListener(handleKeyPress);
};
