import React from "react";
import { useSurvey } from "./SurveyStore";

export interface QuestionProps {
    // the type for getting a question handler
    type: string;
    // the data key in which the questionhandler will save the data
    id: string;
    // the main label for that question
    label: string;
    // if the question should be visible or not (very very very basic)
    showIf?: {
        [key: string]: Function;
    };
}

export interface QuestionRendererProps {
    Wrapper?: React.ElementType;
}

export interface QuestionWrapperProps {
    show: boolean;
    showIf?: {
        [key: string]: Function;
    };
}

export interface QuestionTypesDefinition {
    [key: string]: React.ElementType;
}

export const QuestionRenderer = (
    {
        type,
        showIf,
        Wrapper,
        ...props
    }: QuestionProps & QuestionRendererProps
): React.ReactElement | string => {
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
