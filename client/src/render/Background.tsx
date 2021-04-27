import { FC } from "react";
import { useDraw2d } from "./GraphicsContext";

export const Background: FC<{ color: string }> = (props) =>
  useDraw2d(({ context: graphics, props: { height, width } }) => {
    graphics.fillStyle = props.color;
    graphics.fillRect(0, 0, width, height);
  });
