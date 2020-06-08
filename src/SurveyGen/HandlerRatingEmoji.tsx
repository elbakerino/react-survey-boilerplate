import React from "react";
import { DefinitionRating, HandlerRating } from "./HandlerRating";
import { IcStar } from "../icons/IcStar";
import { IcStarBorder } from "../icons/IcStarBorder";

const EmojiActive = () => '🚀';
const EmojiStandard = () => '😴';

export const HandlerRatingEmoji = (props: DefinitionRating) =>
    <HandlerRating
        {...props}
        className={'q-rating-emoji'}
        CompStandard={EmojiStandard}
        CompActive={EmojiActive}
    />;
