import React from "react";
import { DefinitionRating, HandlerRating } from "./HandlerRating";
import { IcStar } from "../icons/IcStar";
import { IcStarBorder } from "../icons/IcStarBorder";

export const HandlerRatingStar = (props: DefinitionRating) =>
    <HandlerRating
        {...props}
        className={'q-rating-star'}
        CompStandard={IcStarBorder}
        CompActive={IcStar}
    />;
