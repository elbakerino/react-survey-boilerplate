import React from "react";
import { QuestionProps, useSurvey } from "../Survey";

export interface SurveyStatsProps {
    questions: QuestionProps[];
}

export const SurveyStats = ({questions = []}: SurveyStatsProps) => {
    const {store: survey} = useSurvey();
    let answered = 0;
    let neg = 0;
    let pos = 0;
    questions.forEach(q => {
        if (typeof survey.getValue(q.id) !== 'undefined') {
            answered++;
            if (survey.getValue(q.id)) {
                pos++;
            } else {
                neg++;
            }
        }
    });

    return <>
        {answered === questions.length ? <>
            {pos && !neg ? <>Great, really perfect!!</> : null}
            {pos && neg ? <>Great, let us work on {neg === 1 ? 'that negative point' : `those ${neg} negative points`}</> : null}
            {!pos && neg ? <>Sorry, we will be better in the future!</> : null}
            <div style={{display: 'flex'}}>
                <input type={'text'}/>
                <button className={'btn'}>contact</button>
            </div>
        </> : null}
    </>;
};
