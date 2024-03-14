
import React, { createContext } from "react";
import Goods from "../storage/Goods";
import { defer } from "react-router-dom";

const context = createContext(null);

function GoodsContext() {
    return (
        <context.Provider
            value={new Goods()}>
        </context.Provider >
    );
}

export default GoodsContext;