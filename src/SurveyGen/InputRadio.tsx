import React from "react";
import { IcRadioButtonChecked } from "../icons/IcRadioButtonChecked";
import { IcRadioButtonUnchecked } from "../icons/IcRadioButtonUnchecked";
import { InpToggle } from "./InputToggle";

export const InpRadio = (props) => <InpToggle
    type={'radio'}
    renderChecked={<IcRadioButtonChecked size={props.size} fill={props.fill} style={{
        position: 'relative',
        zIndex: 2,
        cursor: props.cursor || 'pointer',
    }}/>}
    renderUnchecked={<IcRadioButtonUnchecked size={props.size} fill={props.fill} style={{
        position: 'relative',
        zIndex: 2,
        cursor: props.cursor || 'pointer',
    }}/>}
    {...props}
/>;
