import React from "react";
import clsx from "clsx";
import { useUID } from "react-uid";
import { useSurvey, QuestionProps } from "../Survey";
import { InpRadio } from "./InputRadio";

// tslint:disable-next-line:no-empty-interface
export interface DefinitionRadio extends QuestionProps {
}

export interface HandlerRadioProps {
    values?: string[];
}

export interface HandlerRadioItemProps {
    id: string;
    uid: string;
    val: string;
}

const RadioItem = ({id, uid, val}: HandlerRadioItemProps) => {
    const {store} = useSurvey();
    const value = store.getValue(id) || '';
    return <div className={clsx('q-radio--input')} style={{display: 'flex', marginRight: 9}}>
        <InpRadio id={`qq` + uid} checked={value === val} onChange={() => store.onChange(id, val)}>
            <span style={{marginLeft: 2}}>{val}</span>
        </InpRadio>
    </div>;
};

export const HandlerRadio = ({id, label, values = []}: DefinitionRadio & HandlerRadioProps) => {
    const uid = useUID();
    return <fieldset className={clsx('q-radio', 'flex')}>
        <legend className={'q--label'}>
            {label}
        </legend>
        <div className={clsx('flex', 'flex-wrap')}>
            {values.map((val, i) => <RadioItem key={i} uid={`${uid}_${i}`} id={id} val={val}/>)}
        </div>
    </fieldset>;
};
