import {MoveHook, MouseMoveProps} from "../types";
import React, {PropsWithChildren} from "react";

/**
 * turns a hook into a div wrapper element
 */
export default (hook: MoveHook ) =>
    ({children, ...props}: PropsWithChildren<MouseMoveProps>) => (
        <div {...hook(props)}>
            {children}
        </div>
    )
