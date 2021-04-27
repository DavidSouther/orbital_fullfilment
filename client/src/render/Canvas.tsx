import {FC, useRef } from "react";
import { None, Option } from "../math/constants";
import { GraphicsContext } from "./GraphicsContext";

export const Canvas: FC<{title: string}> = (props) => {
    const canvas = useRef<Option<HTMLCanvasElement>>(None);

    let context: Option<CanvasRenderingContext2D> = None;
    const getContext = () => {
        if (context == null && canvas.current !== None) {
            context = canvas.current.getContext('2d');
        }
        return context;
    };

    return (
        <canvas ref={canvas} title={props.title}>
            <GraphicsContext.Provider value={getContext()}>
                {props.children}
            </GraphicsContext.Provider>
        </canvas>
    );
};