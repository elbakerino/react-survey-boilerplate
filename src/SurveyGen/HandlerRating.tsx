import React from "react";
import clsx from "clsx";
import { useSurvey } from "../Survey";
import { QuestionGenProps } from "./SurveyGenQuestion";

export interface DefinitionRating extends QuestionGenProps {
    min: number;
    count: number;
}

export interface RatingElementProps {
    current?: number;
    value?: number;
}

export interface PropsWithComponent {
    CompStandard?: React.ComponentType<RatingElementProps>;
    CompActive?: React.ComponentType<RatingElementProps>;
    className?: string;
}

export const HandlerRating = (
    {
        id, label,
        min = 0, count = 5,
        CompStandard, CompActive, className
    }: DefinitionRating & PropsWithComponent
) => {
    const {store} = useSurvey();

    return <div className={clsx(className, 'q-rating')}>
        <p className={'q--label'}>
            {label}
        </p>
        <div className={clsx('flex')}>
            {[...Array(count)].map((i, k) => <button
                className={clsx('q--btn', store.getValue(id) === k + min && 'active')}
                onClick={() => store.onChange(id, k + min)}
                key={k}
            >
                {CompStandard && CompActive ?
                    store.getValue(id) >= (k + min) ?
                        <CompActive current={store.getValue(id)} value={k + min}/> :
                        <CompStandard current={store.getValue(id)} value={k + min}/>
                    : k + min}
            </button>)}
        </div>
    </div>;
};
