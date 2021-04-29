import { FC, useContext } from "react";
import { AU, TAU } from "../math/constants";
import { Orbit, toEllipse } from "../math/orbit";
import { add, asXYZ, scale } from "../math/vector";
import { AnimationTimer } from "./Animation";
import { useDraw2d } from "./GraphicsContext";

export const Planet: FC<{ planet: Orbit; color: string }> = ({
  planet,
  color,
}) => {
  const tick = useContext<number>(AnimationTimer);
  return useDraw2d(({ context, props: { height, width } }) => {
    const factor = Math.min(height, width) / (4 * AU);
    const center = { x: width / 2, y: height / 2, z: 0 };
    const pos = planet.position(tick);
    const scaled = scale(pos, factor);
    const added = add(scaled, center);
    const position = asXYZ(added);
    context.fillStyle = color;
    context.beginPath();
    context.arc(position.x, position.y, 3, 0, TAU);
    context.fill();

    context.strokeStyle = color;
    const { x, y, radiusX, radiusY, rotation } = toEllipse(planet);
    let { x: x2, y: y2 } = asXYZ(add(scale({ x, y, z: 0 }, factor), center));
    const rX = radiusX * factor;
    const rY = radiusY * factor;
    context.beginPath();
    context.ellipse(x2, y2, rX, rY, rotation, 0, TAU);
    context.stroke();
  });
};
