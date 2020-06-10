import React from "react";
import AnimateHeight from "react-animate-height";
import { QuestionWrapperProps } from "../Survey";

export const QuestionGenWrapper = ({showIf, show, children}: React.PropsWithChildren<QuestionWrapperProps>) =>
    <AnimateHeight
        duration={showIf ? 450 : 0}
        height={showIf ? show ? 'auto' : 0 : 'auto'}
        children={children}
    />;
