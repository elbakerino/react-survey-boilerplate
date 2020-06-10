import React from "react";
import clsx from "clsx";
import { QuestionGenWrapper } from "./SurveyGenQuestion";
import { SurveyProvider, SurveyProps, SurveyDefinition, useSurvey, QuestionRenderer, QuestionProps } from "../Survey";
import { H } from "../components/Headline";
import { DefinitionRating } from "./HandlerRating";

export interface SurveyGenDefinition extends SurveyDefinition {
    questions: QuestionProps[] | DefinitionRating[];
}

export interface SurveyGenProps extends SurveyProps {
    questions: QuestionProps[] | DefinitionRating[];
}

export const SurveyGenBody = () => {
    const {questions} = useSurvey();
    return <div className={clsx('flex', 'flex-column')}>
        {questions.map(question => <QuestionRenderer key={question.id} {...question} Wrapper={QuestionGenWrapper}/>)}
    </div>;
};

export const SurveyGen = (
    {
        title,
        titleLevel,
        questions,
        types,
        store,
        children
    }: React.PropsWithChildren<SurveyGenProps>
) => (<SurveyProvider store={store} questions={questions} types={types}>
    {title ? <H level={titleLevel}>{title}</H> : null}
    <SurveyGenBody/>
    {children}
</SurveyProvider>);
