import { createContext, ReactElement, useContext, useEffect } from "react";
import { Option, None, isNone } from "../math/constants";

export interface CanvasProperties {
  width: number;
  height: number;
}

export interface Graphics2D {
  context: CanvasRenderingContext2D;
  props: CanvasProperties;
}

export const GraphicsContext = createContext<Option<Graphics2D>>(None);

export function useDraw2d(
  drawing: (graphics: Graphics2D) => void
): ReactElement {
  const context = useContext(GraphicsContext);

  useEffect(() => {
    if (isNone(context)) return;
    drawing(context);
  });

  return <></>;
}
