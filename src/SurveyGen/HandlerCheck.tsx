import React from "react";
import clsx from "clsx";
import { List } from "immutable";
import { useUID } from "react-uid";
import { useSurvey, QuestionProps } from "../Survey";
import { InpCheckbox } from "./InputCheckbox";

// tslint:disable-next-line:no-empty-interface
export interface DefinitionCheck extends QuestionProps {
}

export interface HandlerCheckProps {
    values?: string[];
}

export interface HandlerCheckItemProps {
    id: string;
    uid: string;
    val: string;
}

const CheckItem = ({id, uid, val}: HandlerCheckItemProps) => {
    const {store} = useSurvey();
    const value = store.getValue(id) || List();
    return <div className={clsx('q-check--input')} style={{display: 'flex', marginRight: 9}}>
        <InpCheckbox id={`qq` + uid} checked={value.indexOf(val) !== -1} onChange={() => store.onChange(id,
            (value = List()) => value.indexOf(val) === -1 ? value.push(val) : value.splice(value.indexOf(val), 1))}>
            <span style={{marginLeft: 2}}>{val}</span>
        </InpCheckbox>
    </div>;
};

export const HandlerCheck = ({id, label, values = []}: DefinitionCheck & HandlerCheckProps) => {
    const uid = useUID();
    return <fieldset className={clsx('q-check', 'flex')}>
        <legend className={'q--label'}>
            {label}
        </legend>
        <div className={clsx('flex', 'flex-wrap')}>
            {values.map((val, i) => <CheckItem key={i} uid={`${uid}_${i}`} id={id} val={val}/>)}
        </div>
    </fieldset>;
};
