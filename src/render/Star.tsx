import { FC } from "react";
import { TAU } from "../math/constants";
import { useDraw2d } from "./GraphicsContext";

export const Star: FC<{ color: string }> = ({ color }) =>
  useDraw2d(({ context, props: { height, width } }) => {
    context.strokeStyle = color;
    context.fillStyle = color;
    context.beginPath();
    context.arc(width / 2, height / 2, 15, 0, TAU);
    context.fill();
  });
