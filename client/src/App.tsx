import { MouseEventHandler, useState } from "react";
import { Background } from "./render/Background";
import { Canvas } from "./render/Canvas";
import { Circle } from "./render/Circle";

function App() {
  const [color, setColor] = useState("yellow");
  const [center, setCenter] = useState<{ x: number; y: number }>({
    x: 100,
    y: 50,
  });

  const updateCenter: MouseEventHandler<HTMLCanvasElement> = (click) => {
    const {
      left,
      top,
    } = (click.target as HTMLCanvasElement).getBoundingClientRect();
    const { clientX: x, clientY: y } = click;
    setCenter({ x: x - left, y: y - top });
  };

  return (
    <div className="App">
      <Canvas
        className="absolute inset-0"
        title="render stage"
        onClick={updateCenter}
      >
        <Background color={color}></Background>
        <Circle center={center} radius={30} color="green"></Circle>
      </Canvas>
      <div className="fixed bottom-2 inset-x-5 container">
        <div className="flex flex-row flex-1 justify-around bg-black text-white shadow-xl">
          <button className="w-24" onClick={() => setColor("red")}>
            Red
          </button>
          <button className="w-24" onClick={() => setColor("yellow")}>
            Yellow
          </button>
          <button className="w-24" onClick={() => setColor("blue")}>
            Blue
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
