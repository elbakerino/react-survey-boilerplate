import React from "react";
import ReactDOM from "react-dom";

import './style.scss';

import { RenderPortal } from "./components/RenderPortal";
import { CustomSurvey } from "./DemoGen";
import { CustomSurveyTable } from "./DemoTable";

const App = () => {
    return <>
        {/* @ts-ignore */}
        <RenderPortal selector={'.pwa-survey'} Component={CustomSurvey}/>
        {/* @ts-ignore */}
        <RenderPortal selector={'.pwa-survey-table'} Component={CustomSurveyTable} clear/>
    </>;
};

ReactDOM.render(
    <App compiler="TypeScript" framework="React"/>,
    document.getElementById("root")
);
