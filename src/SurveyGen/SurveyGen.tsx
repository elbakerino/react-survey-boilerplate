import React from "react";
import clsx from "clsx";
import AnimateHeight from 'react-animate-height';
import { QuestionGenProps } from "./SurveyGenQuestion";
import { SurveyProvider, SurveyProps, SurveyDefinition, useSurvey } from "../Survey";
import { H } from "../components/Headline";
import { DefinitionRating, HandlerRating } from "./HandlerRating";
import { HandlerNumber } from "./HandlerNumber";
import { HandlerString, HandlerText } from "./HandlerString";
import { HandlerRatingHeart } from "./HandlerRatingHeart";
import { HandlerRatingStar } from "./HandlerRatingStar";
import { HandlerRatingEmoji } from "./HandlerRatingEmoji";

interface QuestionTypesDefinition {
    [key: string]: React.ElementType;
}

const questionTypes: QuestionTypesDefinition = {
    rating: HandlerRating,
    rating_heart: HandlerRatingHeart,
    rating_star: HandlerRatingStar,
    rating_emoji: HandlerRatingEmoji,
    number: HandlerNumber,
    string: HandlerString,
    text: HandlerText,
    select: () => null,
    chips: () => null,
    date: () => null,
};

const QuestionRenderer = ({type, showIf, ...props}: QuestionGenProps): React.ReactElement | string => {
    const QuestionHandler = questionTypes[type];
    const {store} = useSurvey();
    let show = true;
    if (showIf) {
        for (const id of Object.keys(showIf)) {
            if (!showIf[id](store.getValue(id))) {
                show = false;
            }
        }
    }
    return questionTypes[type] ?
        <AnimateHeight
            duration={showIf ? 450 : 0}
            height={showIf ? show ? 'auto' : 0 : 'auto'}
        >
            <QuestionHandler {...props} type={type}/>
        </AnimateHeight>
        : 'no-handler';
};

export interface SurveyGenDefinition extends SurveyDefinition {
    questions: QuestionGenProps[] | DefinitionRating[];
}

export interface SurveyGenProps extends SurveyProps {
    questions: QuestionGenProps[] | DefinitionRating[];
}

export const SurveyGenBody = () => {
    const {questions} = useSurvey();
    return <div className={clsx('flex', 'flex-column')}>
        {questions.map(question => <QuestionRenderer key={question.id} {...question}/>)}
    </div>;
};

export const SurveyGen = (
    {
        title,
        titleLevel,
        questions,
        store,
        children
    }: React.PropsWithChildren<SurveyGenProps>
) => (<SurveyProvider store={store} questions={questions}>
    {title ? <H level={titleLevel}>{title}</H> : null}
    <SurveyGenBody/>
    {children}
</SurveyProvider>);
