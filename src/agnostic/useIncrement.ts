import {useMemo} from "react";
import {IncreaseDecreasePair, IncrementedValueProps, IncrementProps, PropDisabled} from "../types";

/**
 * combines increment, inversion, and disabled into a single number which can then be multiplied by a positive or
 * negative integer representing the direction and count of movements
 */
export const useIncrement = ({disabled = false, increment = 1, invert = false}: IncrementProps & PropDisabled): number => {

    /**
     * apply inversion to increment -- or don't
     * handle disabled by setting move to 0
     */
    return useMemo(
        () => disabled ? 0 : increment * (invert ? -1 : 1),
        [disabled, increment, invert]
    );
}

/**
 * map a value/setValue and IncrementProps into an increase/decrease pair
 * assumes that the increment is additive rather than multiplicative
 */
export const useIncrementedValue = ({value, setValue, ...props}: IncrementedValueProps): IncreaseDecreasePair => {
    const increment = useIncrement(props);

    return {
        increase: () => setValue(value + increment),
        decrease: () => setValue(value - increment)
    };
}
