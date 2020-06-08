import React from "react";
import { DefinitionRating, HandlerRating } from "./HandlerRating";
import { IcFavorite } from "../icons/IcFavorite";
import { IcFavoriteBorder } from "../icons/IcFavoriteBorder";

export const HandlerRatingHeart = (props: DefinitionRating) =>
    <HandlerRating
        {...props}
        className={'q-rating-heart'}
        CompStandard={IcFavoriteBorder}
        CompActive={IcFavorite}
    />;
