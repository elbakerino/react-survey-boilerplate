import React from "react";
import clsx from "clsx";
import AnimateHeight from "react-animate-height";
import { QuestionGenProps } from "./SurveyGenQuestion";
import { SurveyProvider, SurveyProps, SurveyDefinition, useSurvey, QuestionRenderer } from "../Survey";
import { H } from "../components/Headline";
import { DefinitionRating } from "./HandlerRating";

export interface SurveyGenDefinition extends SurveyDefinition {
    questions: QuestionGenProps[] | DefinitionRating[];
}

export interface SurveyGenProps extends SurveyProps {
    questions: QuestionGenProps[] | DefinitionRating[];
}

const QuestionWrapper = ({showIf, show, children}) => <AnimateHeight
    duration={showIf ? 450 : 0}
    height={showIf ? show ? 'auto' : 0 : 'auto'}
    children={children}
/>;

export const SurveyGenBody = () => {
    const {questions} = useSurvey();
    return <div className={clsx('flex', 'flex-column')}>
        {questions.map(question => <QuestionRenderer key={question.id} {...question} Wrapper={QuestionWrapper}/>)}
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
