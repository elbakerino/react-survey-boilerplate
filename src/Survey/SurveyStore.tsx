import React from "react";
import { Record, RecordFactory, RecordOf, OrderedMap } from "immutable";
import { unstable_trace as trace } from "scheduler/tracing";
import { QuestionProps } from "./SurveyQuestion";

export type onChangeHandler = (store: SurveyStore) => SurveyStore;
export type onChange = (handler: onChangeHandler) => void;

export interface SurveyStoreProps {
    values: OrderedMap<any, any>;
    getValue: (id: string) => any;
    onChange: (id: string, value: any) => void;
    onChangeHandler: onChange;
}

const defaultSurveyStore: SurveyStoreProps = {
    values: OrderedMap({}),
    onChangeHandler: (handler) => null,
    getValue(id: string): any {
        return this.getIn(['values', id]);
    },
    onChange(id: string, value: any) {
        trace(`SurveyStore Change ${id}`, performance.now(), () => {
            this.onChangeHandler(prevStore =>
                prevStore.setIn(
                    ['values', id],
                    value
                )
            );
        });
    },
};

export const SurveyStore: RecordFactory<SurveyStoreProps> = Record(defaultSurveyStore);

export type SurveyStore = RecordOf<SurveyStoreProps>;

export interface SurveyProviderProps {
    store: SurveyStore;
    questions: QuestionProps[];
}

const SurveyContext: React.Context<SurveyProviderProps> = React.createContext({store: new SurveyStore({}), questions: []});

export const SurveyProvider = (
    {children, store, questions}
        : React.PropsWithChildren<SurveyProviderProps>
) => <SurveyContext.Provider value={{store, questions}} children={children}/>;

export const createSurvey = (values: Function | OrderedMap<any, any>) => {
    const [survey, onChange] = React.useState(() => new SurveyStore({
        values: typeof values === 'function' ? values() : values,
    }));
    return survey.set('onChangeHandler', onChange);
};

export const useSurvey = (): SurveyProviderProps => {
    return React.useContext(SurveyContext);
};
