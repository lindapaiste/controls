import {MoveHook, MoveProps} from "./types";
import React, {PropsWithChildren} from "react";

/**
 * turns a hook into a div wrapper element
 */
export default (hook: MoveHook ) =>
    ({children, ...props}: PropsWithChildren<MoveProps>) => (
        <div {...hook(props)}>
            {children}
        </div>
    )
