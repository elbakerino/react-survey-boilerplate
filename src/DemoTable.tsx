import React from "react";

import { OrderedMap } from "immutable";

import { createSurvey, QuestionTypesDefinition } from "./Survey";
import {
    SurveyTable, SurveyTableProps,
    SurveyStats,
    HandlerYesNo, HandlerRadio as HandlerRadioTable
} from "./SurveyTable";

const structureSurveyTable = {
    title: 'Dummy Title Overwritten by JSON Props',
    questionHeader: [
        '',
        '😀',
        '😞'
    ],
    questions: [
        {
            id: 'table_q_1',
            label: 'Is that good?',
            type: 'yes_no',
        }, {
            id: 'table_q_2',
            label: 'You like this?',
            type: 'yes_no',
        }, {
            id: 'table_q_3',
            label: 'Any more of those?',
            type: 'yes_no',
        }, {
            id: 'table_q_4',
            label: 'That looks nice, doesn\'t it?',
            type: 'yes_no',
        }, {
            id: 'table_q_5',
            label: 'Your preferred Way?',
            values: [
                'Top',
                'Right',
                'Bottom',
                'Left',
            ],
            type: 'radio',
        }, {
            id: 'table_q_6',
            label: 'Accept it?',
            type: 'check',
        }
    ]
};

const questionTypesTable: QuestionTypesDefinition = {
    yes_no: HandlerYesNo,
    radio: HandlerRadioTable,
    check: () => null,
};

export const CustomSurveyTable = (props: SurveyTableProps) => {
    const store = createSurvey(OrderedMap({}));
    return <SurveyTable {...structureSurveyTable} {...props} store={store} types={questionTypesTable}>
        <SurveyStats questions={structureSurveyTable.questions}/>
    </SurveyTable>;
};
