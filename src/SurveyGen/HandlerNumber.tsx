import React from "react";
import clsx from "clsx";
import { useSurvey } from "../Survey";
import { QuestionGenProps } from "./SurveyGenQuestion";
import { IcRemove } from "../icons/IcRemove";
import { IcAdd } from "../icons/IcAdd";

export interface DefinitionNumber extends QuestionGenProps {
    min?: number;
    max?: number;
    showMoreThen?: boolean;
}

export const HandlerNumber = ({id, label, min = 0, max, showMoreThen}: DefinitionNumber) => {
    const {store} = useSurvey();
    const doMoreThen = showMoreThen && typeof max !== 'undefined';
    const isMoreThen = doMoreThen && store.getValue(id) === max;
    return <div className={clsx('q-number', 'flex')}>
        <label className={'q--label'}>
            {label}
        </label>
        <div className={'q--input-number'}>
            <button
                type={'button'}
                className={clsx('q--input-number--control', 'q--input-number--control--decrease')}
                onClick={() =>
                    (store.getValue(id) || 0) > min ? store.onChange(id, (store.getValue(id) || 0) - 1) : null
                }
            ><IcRemove/></button>
            <input
                className={clsx('q--input', isMoreThen && 'more-then')}
                type={'number'}
                min={min}
                max={max}
                onChange={(e) => store.onChange(id, parseInt(e.target.value, 10))}
                value={store.getValue(id) || 0}
            />
            {isMoreThen ? <span className={'q--input-number--more-then'}>+</span> : null}
            <button
                type={'button'}
                className={clsx('q--input-number--control', 'q--input-number--control--increase')}
                disabled={isMoreThen}
                onClick={() =>
                    typeof max === 'undefined' || (store.getValue(id) || 0) < max ? store.onChange(id, (store.getValue(id) || 0) + 1) : null
                }
            ><IcAdd/></button>
        </div>
    </div>;
};
