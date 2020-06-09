import React from "react";
import { SurveyProvider, SurveyProps, QuestionRenderer } from "../Survey";
import { H } from "../components/Headline";

export interface SurveyTableProps extends SurveyProps {
    questionHeader: [];
}

export const SurveyTable = (
    {
        title,
        titleLevel,
        questions,
        questionHeader,
        store,
        types,
        children
    }: React.PropsWithChildren<SurveyTableProps>
) => (<SurveyProvider store={store} questions={questions} types={types}>
    {title ? <H level={titleLevel}>
        {title}
    </H> : null}
    <table>
        <thead>
        <tr>
            {questionHeader.map((head, i) => <th key={i}>{head}</th>)}
        </tr>
        </thead>
        <tbody>
        {questions.map(question => <QuestionRenderer key={question.id} {...question}/>)}
        </tbody>
    </table>
    {children}
</SurveyProvider>);
