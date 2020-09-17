import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface XY {
    x: number;
    y: number;
}

/**
 * most actions can accept an optional disabled prop such that the action is ignored if disabled is true
 */
export interface PropDisabled {
    disabled?: boolean;
}

/**
 * expects the position state to be stored externally and passed in with a value (position) and setter (setPosition)
 */
export interface BaseMoveProps extends PropDisabled {
    /**
     * the x/y position at the current moment
     */
    position: XY;

    /**
     * callback to set the position to a new x/y value
     */
    setPosition(point: XY): void;

    /**
     * whether to disable movement
     */
    disabled?: boolean;
}

/**
 * mouse move takes all of the Base props, but also takes a set state pair isDragging & setIsDragging
 */
export interface IsDraggingProps {
    /**
     * whether the object is currently moving
     */
    isDragging: boolean;

    /**
     * callback to update isDragging when the movement starts and ends
     */
    setIsDragging(isDragging: boolean): void;
}
export interface MouseMoveProps extends BaseMoveProps, IsDraggingProps {
}

/**
 * when moving as a response to an action (key press, button press, etc.), can control how much movement takes place
 * for each action
 */
export interface IncrementProps {
    /**
     * whether to flip the increment such that the right arrow is a negative move instead of positive, etc.
     * defaults to false
     */
    invert?: boolean;
    /**
     * how many pixels to move on each action
     */
    increment?: number;
}

/**
 * get and set a value
 */
interface EditProps<T> {
    value: T;
    setValue(val: T): void;
}

export type SetValueProps = EditProps<number>;

/**
 * for incrementing a single numeric value
 */
export type IncrementedValueProps = IncrementProps & PropDisabled & SetValueProps;

/**
 * an incremented move combines the Base with Increment props
 */
export interface IncrementedMoveProps extends IncrementProps, BaseMoveProps {
}

/**
 * a single function shift takes an x and y value pair with the amount to shift in each direction
 */
export interface ShiftPosition {
    shift(point: XY): void;
}

/**
 * a pair of functions which each handle shifting in one direction only
 */
export interface ShiftPair {
    shiftX(n: number): void;

    shiftY(n: number): void;
}

/**
 * union type can accept either a single shift function or a pair
 */
export type EitherShift = ShiftPosition | ShiftPair;

/**
 * for when the position is not passed down.
 * callback with the amount to move rather than the the new position
 */
export type ShiftProps  = EitherShift & PropDisabled;

export type IncrementedShiftProps = ShiftProps & IncrementProps;

/**
 * hook definition for creating div binding
 */
export type MoveHook = (
    props: MouseMoveProps
) => DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface EventListenerHook {
    add(): void;

    remove(): void;

    isActive: boolean;
}

export type Direction = "up" | "down" | "left" | "right";

export interface IncreaseDecreasePair {
    increase(): void;

    decrease(): void;
}
