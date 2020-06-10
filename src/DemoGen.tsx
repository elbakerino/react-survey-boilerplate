import React from "react";

import { OrderedMap } from "immutable";

import { createSurvey, QuestionTypesDefinition } from "./Survey";
import {
    HandlerNumber,
    HandlerRating, HandlerRatingEmoji,
    HandlerRatingHeart,
    HandlerRatingStar, HandlerString, HandlerText,
    HandlerCheck, HandlerRadio,
    SurveyGen,
    SurveyGenDefinition,
    SurveyGenProps
} from "./SurveyGen";

const structureSurveyGen: SurveyGenDefinition = {
    title: 'Choose your Favorites!',
    questions: [
        {
            id: 'fav_no_1',
            label: 'Numbers from 1 to 5?',
            type: 'rating',
            min: 1,
            count: 5,
        }, {
            id: 'fav_no_2',
            label: 'Numbers from 5 to 9?',
            type: 'rating',
            min: 5,
            count: 5,
            showIf: {
                fav_no_1: v => v > 0
            }
        }, {
            id: 'fav_hearts',
            label: 'Hearts?',
            type: 'rating_heart',
        }, {
            id: 'fav_stars',
            label: 'Stars?',
            type: 'rating_star',
        }, {
            id: 'fav_emojis',
            label: 'Emojis?',
            type: 'rating_emoji',
        }, {
            id: 'fav_num_select',
            label: 'How much do you do?',
            type: 'number',
            max: 5,
            showMoreThen: true,
        }, {
            id: 'fav_num_select2',
            label: 'How many children do you have?',
            type: 'number',
        }, {
            id: 'fav_cocktail',
            label: 'What is your favorite cocktail?',
            type: 'string',
        }, {
            id: 'fav_comment',
            label: 'Some wish?',
            type: 'text',
        }, {
            id: 'fav_drinks',
            label: 'What are your favorite drinks?',
            type: 'check',
            values: ['Gin', 'Whisky', 'Raki', 'Uzo', 'Wine', 'Beer', 'Secco', 'Champagner', 'Cider', 'Cherry'],
        }, {
            id: 'fav_eats',
            label: 'Are you:',
            type: 'radio',
            values: ['Vegan', 'Vegetarian', 'Meat Eater'],
        }
    ]
};

const questionTypes: QuestionTypesDefinition = {
    rating: HandlerRating,
    rating_heart: HandlerRatingHeart,
    rating_star: HandlerRatingStar,
    rating_emoji: HandlerRatingEmoji,
    number: HandlerNumber,
    string: HandlerString,
    text: HandlerText,
    check: HandlerCheck,
    radio: HandlerRadio,
    select: () => null,
    chips: () => null,
    date: () => null,
};

// this is the actual component which can be mounted with an ready survey included
// the survey can also:
//   - be loaded from an api
//   - added through portals and usind dataset & json in html
//   - answers saved in localStorage (and more)
// you must add an button for sending the survey
export const CustomSurvey = (props: SurveyGenProps) => {
    const store = createSurvey(OrderedMap({}));
    console.log(store.values.toJS());
    return <SurveyGen {...props} {...structureSurveyGen} store={store} types={questionTypes}/>;
};
