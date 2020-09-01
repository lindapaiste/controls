import {MouseMoveProps, MoveHook} from "../types";
import React, {DetailedHTMLProps, HTMLAttributes, PropsWithChildren} from "react";

type DivProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

/**
 * turns a hook into a div wrapper element
 * passes through props which are not MouseMoveProps
 */
export default (hook: MoveHook) =>
    (props: PropsWithChildren<MouseMoveProps & DivProps>) => {
        const {moveProps, divProps} = separateProps(props);
        return (
            <div
                {...divProps}
                {...hook(moveProps)}
            />
        )
    }


const separateProps = (props: PropsWithChildren<MouseMoveProps & DivProps>): { moveProps: MouseMoveProps, divProps: PropsWithChildren<DivProps> } => {
    const {isDragging, setIsDragging, position, setPosition, disabled, ...divProps} = props;
    const moveProps = {isDragging, setIsDragging, position, setPosition, disabled};
    return {
        divProps,
        moveProps,
    }
}
