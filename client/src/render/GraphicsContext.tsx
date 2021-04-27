import { createContext, ReactElement, useContext, useEffect } from "react";
import { Option, None, isNone } from "../math/constants";

export const GraphicsContext = createContext<Option<CanvasRenderingContext2D>>(
  None
);

export function useDraw2d(
  drawing: (context: CanvasRenderingContext2D) => void
): ReactElement {
  const context = useContext(GraphicsContext);

  useEffect(() => {
    if (isNone(context)) return;
    drawing(context);
  });

  return <></>;
}
