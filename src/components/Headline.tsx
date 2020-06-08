import React from "react";

export interface HProps {
    level?: number;
}

export const H = (
    {
        level = 1, ...props
    }
        : HProps & React.ComponentPropsWithoutRef<'h1'>
): React.ReactElement => {
    const Comp = level === 2 ? 'h2' :
        level === 3 ? 'h3' :
            level === 4 ? 'h4' :
                level === 5 ? 'h5' :
                    level === 6 ? 'h6' : 'h1';
    return <Comp {...props}/>;
};
