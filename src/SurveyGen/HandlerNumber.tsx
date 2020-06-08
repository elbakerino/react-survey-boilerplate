import React from "react";
import clsx from "clsx";
import { useSurvey } from "../Survey";
import { QuestionGenProps } from "./SurveyGenQuestion";
import { IcRemove } from "../icons/IcRemove";
import { IcAdd } from "../icons/IcAdd";

export interface DefinitionNumber extends QuestionGenProps {
    min?: number;
    count?: number;
}

export const HandlerNumber = ({id, label, min = 0, count}: DefinitionNumber) => {
    const {store} = useSurvey();

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
                className={clsx('q--input')}
                type={'number'}
                min={min}
                count={count}
                onChange={(e) => store.onChange(id, parseInt(e.target.value, 10))}
                value={store.getValue(id) || 0}
            />
            <button
                type={'button'}
                className={clsx('q--input-number--control', 'q--input-number--control--increase')}
                onClick={() =>
                    typeof count === 'undefined' || (store.getValue(id) || 0) < count ? store.onChange(id, (store.getValue(id) || 0) + 1) : null
                }
            ><IcAdd/></button>
        </div>
    </div>;
};
