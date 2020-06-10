# React Survey Boilerplate

Typescript+React boilerplate for custom surveys with either a simple table based survey or complex any-question surveys.

## Usage with Portals

## Usage in CRA

## Components

### Survey Basics

The files in [src/Survey](./src/Survey) are the base files for the rendering and storing the questions and answers.

#### SurveyStore

- `createSurvey()`, creates the immutable record `SurveyStore`, which holds the state and state updater
-  `SurveyProvider` with props
    - `store: SurveyStore` the returned value of `createSurvey()`   
        - `store.values` the immutable [OrderedMap](https://immutable-js.github.io/immutable-js/docs/#/OrderedMap/OrderedMap) which stores the answers
        - `store.values.toJS()` to convert back to JS-object
        - Note: if your app requires high performance, you may need to avoid toJS()
        - `store.onChange(id, value)` to update with an hard coded value
        - `store.onChange(id, oldvalue => { return newvalue })` to get the old value from the onchange handler (recommended)
        - `store.getValue(id)` to get the value of a single answer
    - `types: {}`, the types available for questions
    - `questions: []`, all questions for this survey
- `useSurvey()` hook to get the store, types and questions
- and typings

#### SurveyQuestion

- `QuestionRenderer`, the universal renderer for one question
    - `type` determines the handler for the question
    - `showIf` basic "show when that" logic handler
    - `Wrapper` component that should wrap any component, like the `showIf` handler in `SurveyGen`
    - and any other prop that the actual question handler should receive
    
#### Implementing Custom Survey

Two ready-to-use survey implementations are included in the boilerplate: [SurveyGen](#survey-generator-surveygen) and [SurveyTable](#survey-table). They handle/show the survey in different ways and support different question types through multiple question handler.

### Question Handler

Each implementation needs it's question type handlers, the basic data/properties are defined in the [QuestionProps](./src/Survey/SurveyQuestion.tsx) interface.

An minimal question in JSON:
```json
{
    "id": "fav_num_select2",
    "label": "How many children do you have?",
    "type": "number"
}
```

### Survey Table

See [src/DemoTable.tsx](./src/DemoTable.tsx) for a basic question schema and basic setup using portals.

- `HandlerRadio`
- `HandlerYesNo`

### Survey Generator (SurveyGen)

See [src/DemoGen.tsx](./src/DemoGen.tsx) for a basic question schema and basic setup using portals.

- `HandlerCheck` showing multiple checkboxes, saving selected as an array
    - additional properties
        - `values?: string[]` defines the checkboxes/values
- `HandlerNumber`
    - additional properties
        - `min?: number`
        - `max?: number`
        - `showMoreThen?: boolean`
- `HandlerRadio`
    - additional properties
        - `values?: string[]` defines the checkboxes/values
- `HandlerRating` basic handler number rating, can be used to display anything else as rating, like icons
    - additional properties
        - `min: number` the start number for the rating
        - `count: number` how many numbers can be rated
        - `CompActive` react component
        - `CompStandard` react component
- `HandlerRatingEmoji` 
    - additional properties
        - `min: number` the start number for the rating
        - `count: number` how many numbers can be rated 
- `HandlerRatingHeart`
    - additional properties
        - `min: number` the start number for the rating
        - `count: number` how many numbers can be rated
- `HandlerRatingStar`
    - additional properties
        - `min: number` the start number for the rating
        - `count: number` how many numbers can be rated 
- `HandlerString`
    - additional properties
        - `multiline` will render an `textarea`


## License

This project is free software distributed under the **MIT License**.

See: [LICENSE](https://github.com/elbakerino/react-survey-boilerplate/blob/master/LICENSE).

© 2020 [Michael Becker](https://mlbr.xyz)

### License Icons

The icons used in [src/icons](./src/icons) are [Material UI](https://material.io/icons/) icons under the [Apache-2.0 License](https://github.com/google/material-design-icons/blob/master/LICENSE). 

### Contributors

By committing your code/creating a pull request to this repository you agree to release the code under the MIT License attached to the repository.
