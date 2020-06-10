import React from "react";
import clsx from "clsx";
import { useUID } from "react-uid";
import { useSurvey, QuestionProps } from "../Survey";
import { InpRadio } from "../SurveyGen/InputRadio";

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
    return <InpRadio id={`qq` + uid} checked={value === val} onChange={() => store.onChange(id, val)}/>;
};

export const HandlerRadio = ({id, label, values = []}: DefinitionRadio & HandlerRadioProps) => {
    const uid = useUID();

    return <tr className={clsx('q--row', 'q-table-radio')}>
        <td colspan={3}>
            <span className={clsx('q-table-radio--label')}>{label}</span>
            <table style={{width: '100%'}}>
                <tbody>
                {values.map((val, i) =>
                    <tr>
                        <td style={{borderLeft: 0, borderBottom: i < values.length - 1 ? null : 0}}></td>
                        <td style={{borderBottom: i < values.length - 1 ? null : 0}}>
                            <span style={{marginLeft: 2}}>{val}</span>
                        </td>
                        <td style={{borderRight: 0, borderBottom: i < values.length - 1 ? null : 0}}>
                            <RadioItem key={i} uid={`${uid}_${i}`} id={id} val={val}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </td>
    </tr>;
};
