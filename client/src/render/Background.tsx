import { FC } from "react";
import { useDraw2d } from "./GraphicsContext";

export const Background: FC<{ color: string }> = (props) =>
  useDraw2d((graphics) => {
    graphics.fillStyle = props.color;
    graphics.fillRect(0, 0, 200, 200);
  });
