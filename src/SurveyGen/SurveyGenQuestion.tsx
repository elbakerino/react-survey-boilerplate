import { QuestionProps } from "../Survey";

export interface QuestionGenProps extends QuestionProps {
    type: string;
    format?: string;
    result?: {};
}
