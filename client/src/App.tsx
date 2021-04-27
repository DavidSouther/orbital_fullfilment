import { MouseEventHandler, useState } from "react";
import "./App.css";
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
      <header className="App-header">
        <Canvas title="render stage" onClick={updateCenter}>
          <Background color={color}></Background>
          <Circle center={center} radius={30} color="green"></Circle>
        </Canvas>
        <button onClick={() => setColor("red")}>Red</button>
        <button onClick={() => setColor("yellow")}>Yellow</button>
        <button onClick={() => setColor("blue")}>Blue</button>
      </header>
    </div>
  );
}

export default App;
