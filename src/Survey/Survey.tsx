import { QuestionProps } from "./SurveyQuestion";
import { SurveyStore } from "./SurveyStore";

export interface SurveyDefinition {
    questions: QuestionProps[];
    title?: string;
    titleLevel?: number;
}

export interface SurveyProps extends SurveyDefinition {
    store: SurveyStore;
    questions: QuestionProps[];
}
