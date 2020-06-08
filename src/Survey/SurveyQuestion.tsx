export interface QuestionProps {
    id: string;
    label: string;
    showIf?: {
        [key: string]: Function;
    };
}
