import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { isNone, isSome, None, Option } from "../math/constants";
import { GraphicsContext } from "./GraphicsContext";

export const Canvas: FC<{
  title: string;
  onClick: MouseEventHandler<HTMLCanvasElement>;
}> = (props) => {
  const canvas = useRef<Option<HTMLCanvasElement>>(None);
  const [context, setContext] = useState<Option<CanvasRenderingContext2D>>(
    None
  );

  useEffect(() => {
    if (isNone(context) && isSome(canvas.current)) {
      setContext(canvas.current.getContext("2d"));
    }
  }, [context]);

  return (
    <>
      <canvas ref={canvas} title={props.title} onClick={props.onClick}></canvas>
      <GraphicsContext.Provider value={context}>
        {props.children}
      </GraphicsContext.Provider>
    </>
  );
};
