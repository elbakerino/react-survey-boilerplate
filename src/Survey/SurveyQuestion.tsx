import React from "react";
import { QuestionGenProps } from "../SurveyGen";
import { useSurvey } from "./SurveyStore";

export interface QuestionProps {
    id: string;
    label: string;
    showIf?: {
        [key: string]: Function;
    };
}

export interface QuestionTypesDefinition {
    [key: string]: React.ElementType;
}

export const QuestionRenderer = ({type, showIf, Wrapper, ...props}: QuestionGenProps): React.ReactElement | string => {
    const {store, types} = useSurvey();
    const QuestionHandler = types[type];
    let show = true;
    if (showIf) {
        for (const id of Object.keys(showIf)) {
            if (!showIf[id](store.getValue(id))) {
                show = false;
            }
        }
    }
    return types[type] ?
        Wrapper ? <Wrapper show={show} showIf={showIf}>
            <QuestionHandler {...props} type={type} show={show} showIf={showIf}/>
        </Wrapper> : <QuestionHandler {...props} type={type} show={show} showIf={showIf}/>
        : 'no-handler';
};
