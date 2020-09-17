import useKeydownListener from "./useKeydownListener";
import {EventListenerHook, IncreaseDecreasePair, IncrementedValueProps, PropDisabled} from "../types";
import {useIncrementedValue} from "../agnostic";

/**
 * calls passed-in functions increase and decrease when plus and minus keys are pressed
 */
export const usePlusMinus = ({increase, decrease, disabled = false}: IncreaseDecreasePair & PropDisabled): EventListenerHook => {

    return useKeydownListener(e => {
        if (!disabled) {
            if (e.key === '-') {
                decrease();
            } else if (e.key === '=' || e.key === '+') {
                increase();
            }
        }
    })
}

/**
 * expects a single numeric value which can be increased and decreased
 *
 * validation (max and min) should be handled by setValue()
 */
export const usePlusMinusValue = (props: IncrementedValueProps): EventListenerHook => {

    const functions = useIncrementedValue(props);

    // could pass through disabled or not.  It doesn't make a difference since the increase and decrease methods won't
    // do anything if called when disabled=true
    return usePlusMinus(functions);
}
