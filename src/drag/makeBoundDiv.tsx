import {Hook, Props} from "./types";
import React, {PropsWithChildren} from "react";

/**
 * turns a hook into a div wrapper element
 */
export default (hook: Hook ) =>
    ({children, ...props}: PropsWithChildren<Props>) => (
        <div {...hook(props)}>
            {children}
        </div>
    )
