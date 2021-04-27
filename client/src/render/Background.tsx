import { FC } from "react";
import { None, Option } from "../math/constants";
import { GraphicsContext } from "./GraphicsContext";

const EMPTY = (<></>);

export const Background: FC<{color: string}> = (props) => {
    function draw(graphics: Option<CanvasRenderingContext2D>) {
        if (graphics !== None) {
            graphics.fillStyle = props.color;
            graphics.fillRect(0, 0, 200, 200);
        }
        return EMPTY;
    }

    return (
        <GraphicsContext.Consumer>{ draw }</GraphicsContext.Consumer>
    );
}