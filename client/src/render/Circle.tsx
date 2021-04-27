import { FC } from "react";
import { useDraw2d } from "./GraphicsContext";

export const Circle: FC<{
  center: { x: number; y: number };
  radius: number;
  color: string;
}> = ({ center: { x, y }, radius, color }) =>
  useDraw2d((context) => {
    context.fillStyle = "transparent";
    context.strokeStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.stroke();
  });
