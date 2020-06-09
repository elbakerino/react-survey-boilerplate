import React from "react";
import clsx from "clsx";
import { useSurvey, QuestionProps } from "../Survey";

export const HandlerRadio = ({id, label}: QuestionProps) => {
    const {store} = useSurvey();

    return <tr className={'q--row'}>
        <td className={'q--label'}>
            {label}
        </td>
        <td>
            <button
                className={clsx('q--btn', store.getValue(id) === true && 'active')}
                onClick={() => store.onChange(id, true)}
            >
                ✓
            </button>
        </td>
        <td>
            <button
                className={clsx('q--btn', store.getValue(id) === false && 'active')}
                onClick={() => store.onChange(id, false)}
            >
                ✗
            </button>
        </td>
    </tr>;
};
