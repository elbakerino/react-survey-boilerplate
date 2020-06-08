import React from "react";
import { TableQuestion } from "./SurveyTableQuestion";
import { SurveyProvider, SurveyProps } from "../Survey";
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
        children
    }: React.PropsWithChildren<SurveyTableProps>
) => (<SurveyProvider store={store}>
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
        {questions.map(question => <TableQuestion key={question.id} {...question}/>)}
        </tbody>
    </table>
    {children}
</SurveyProvider>);
