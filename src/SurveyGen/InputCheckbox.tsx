import React from "react";
import { IcCheckBox } from "../icons/IcCheckBox";
import { IcCheckBoxOutlineBlank } from "../icons/IcCheckBoxOutlineBlank";
import { InpToggle } from "./InputToggle";

export const InpCheckbox = (props) => <InpToggle
    renderChecked={<IcCheckBox size={props.size} fill={props.fill} style={{
        position: 'relative',
        zIndex: 2,
        cursor: props.cursor || 'pointer',
    }}/>}
    renderUnchecked={<IcCheckBoxOutlineBlank size={props.size} fill={props.fill} style={{
        position: 'relative',
        zIndex: 2,
        cursor: props.cursor || 'pointer',
    }}/>}
    {...props}
/>;
