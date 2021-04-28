import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { isNone, isSome, None, Option } from "../math/constants";
import { Graphics2D, GraphicsContext } from "./GraphicsContext";

export const Canvas: FC<{
  title: string;
  className: string;
  onClick: MouseEventHandler<HTMLCanvasElement>;
}> = (props) => {
  const canvas = useRef<Option<HTMLCanvasElement>>(None);
  const [context, setContext] = useState<Option<Graphics2D>>(None);

  useEffect(() => {
    if (isNone(context) && isSome(canvas.current)) {
      const { width, height } = canvas.current.getBoundingClientRect();
      const newContext = canvas.current.getContext("2d");
      if (isSome(newContext)) {
        setContext({ context: newContext, props: { width, height } });
      }
    }
  }, [context]);

  return (
    <>
      <canvas
        ref={canvas}
        className={props.className}
        title={props.title}
        onClick={props.onClick}
        width={window.innerWidth}
        height={window.innerHeight}
      ></canvas>
      <GraphicsContext.Provider value={context}>
        {props.children}
      </GraphicsContext.Provider>
    </>
  );
};
