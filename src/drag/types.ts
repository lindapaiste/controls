// @ts-ignore
import {IRangeMethods} from "@lindapaiste/geometry/lib/range";
import {IPoint} from "@lindapaiste/geometry";
import {DetailedHTMLProps, HTMLAttributes} from "react";

export interface Props {
    isDragging: boolean;
    setIsDragging(isDragging: boolean): void;
    x: number;
    setX(x: number): void;
    y: number;
    setY(y: number): void;
}

/**
 * hook definition for creating div binding
 */
export type Hook = (props: Props) => DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;


export interface DragProps {
    /**
     * boundaries is an object which has a method to constrain a point
     */
    boundaries?: IRangeMethods<IPoint>
    /**
     * can start with an initial translation, but does this make sense?
     * vs. starting at 0,0 and adding the initial higher up
     */
    initialTranslateX?: number;
    initialTranslateY?: number;
}

export interface DragEventHandlers {
    onDragStart(e: MouseEvent): void;
    onDragEnd(e: MouseEvent): void;
    onDragMove(e: MouseEvent): void;
}

/**
 * note: could reduce the number of variables if storing previous x/y instead of start
 */
export interface DragState {
    /**
     * save the position where the mouse move started in order to see how much it has changed
     */
    startMouseX: number;
    startMouseY: number;
    /**
     * the current translation, cumulative across all drags
     */
    translateX: number;
    translateY: number;
    /**
     * the existing translation at the start of this current drag movement
     */
    startTranslateX: number;
    startTranslateY: number;
    /**
     * whether or not the mouse is currently dragging
     */
    isDragging: boolean;
}
