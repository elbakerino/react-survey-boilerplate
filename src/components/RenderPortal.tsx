import React from "react";
import ReactDOM from "react-dom";

export interface RenderPortalData {
    Component: React.ComponentType;
    portalProps?: {};
}

export interface MountPortalProps {
    target: HTMLElement;
}

const MountPortal = (
    {
        target,
        Component,
        portalProps = {}
    }: MountPortalProps & RenderPortalData
) => {
    const extractProps = React.useRef();

    if (!extractProps.current) {
        const extractPropsRaw = target.querySelector('[type="application/json"][rel="props"]');
        if (extractPropsRaw) {
            try {
                extractProps.current = JSON.parse(extractPropsRaw.innerText);
            } catch (e) {
                // tslint-ignore
            }
        }
    }

    return ReactDOM.createPortal(<Component
        {...target.dataset}
        {...portalProps}
        {...(extractProps.current || {})}
    />, target);
};

export type WrapperType = undefined | Element[] | HTMLElement[];

export interface RenderPortalsProps {
    selector: string;
    clear?: boolean;
}

export const RenderPortal = (
    {
        selector,
        Component,
        clear = false,
        portalProps = {}
    }: RenderPortalsProps & RenderPortalData
): React.ReactElement[] | null => {
    const [targets, setTargets] = React.useState<WrapperType>(undefined);

    React.useEffect(() => {
        setTargets(Array.from(
            document.querySelectorAll(selector)
        ).map((t) => {
            if (t && clear) {
                Array.from(t.childNodes).forEach(child => {
                    if (child.nodeName !== 'SCRIPT') {
                        child.remove();
                    }
                });
            }
            return t;
        }));
    }, [setTargets]);

    return targets ? targets.map((target, i) =>
        <MountPortal
            key={i}
            target={target}
            Component={Component}
            clear={clear}
            portalProps={portalProps}
        />
    ) : null;
};
