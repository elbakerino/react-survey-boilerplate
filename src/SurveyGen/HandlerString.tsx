import React from "react";
import clsx from "clsx";
import { useSurvey } from "../Survey";
import { QuestionGenProps } from "./SurveyGenQuestion";

// tslint:disable-next-line:no-empty-interface
export interface DefinitionString extends QuestionGenProps {
}

export interface HandlerStringProps {
    multiline?: boolean;
}

export const HandlerString = ({id, label, multiline = false}: DefinitionString & HandlerStringProps) => {
    const {store} = useSurvey();

    const Input = multiline ? 'textarea' : 'input';

    return <div className={clsx('q-string', 'flex')}>
        <label className={'q--label'}>
            {label}
        </label>
        <Input
            className={clsx('q--input')}
            type={'text'}
            onChange={(e: React.ChangeEvent) => store.onChange(id, e.target.value)}
            value={store.getValue(id) || ''}
        />
    </div>;
};

export const HandlerText = (props: DefinitionString & HandlerStringProps) => {
    return <HandlerString {...props} multiline/>;
};
