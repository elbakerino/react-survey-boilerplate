import React from "react";
import clsx from "clsx";

export interface InputToggleProps {
    id: string;
    style?: {};
    checked: boolean;
    renderChecked?: React.ReactNode;
    renderUnchecked?: React.ReactNode;
    type?: 'radio' | 'checkbox';
}

export const InpToggle = ({
                              id,
                              style,
                              checked,
                              children,
                              renderChecked,
                              renderUnchecked,
                              type = 'checkbox',
                              ...props
                          }: React.PropsWithChildren<InputToggleProps> & React.ComponentPropsWithoutRef<'input'>) => {
    const [focus, setFocus] = React.useState(false);
    return <label className={clsx('ic-label', focus && 'focused')} htmlFor={id} style={style}>
            <span style={{
                pointerEvents: 'none',
                position: 'relative',
                display: 'block',
                zIndex: 1,
                height: 0,
                width: 0,
                overflow: 'visible'
            }}><input
                type={type}
                style={{position: 'absolute', top: 0, left: 6, opacity: 0, margin: 0}}
                id={id}
                checked={checked}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                {...props}
            /></span>
        {checked ? renderChecked : renderUnchecked}
        {children}
    </label>;
};
