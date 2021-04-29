import { Background } from "./render/Background";
import { Canvas } from "./render/Canvas";
import "./math/main";
import { Earth, Mars, Mercury, Venus } from "./math/planets";
import { Star } from "./render/Star";
import { Planet } from "./render/Planet";
import { AnimationTimer } from "./render/Animation";
import { useState } from "react";
import { DAY, HOUR, MINUTE } from "./math/constants";

function App() {
  const [tick, setTick] = useState<number>(0);

  return (
    <div className="App">
      <AnimationTimer.Provider value={tick}>
        <Canvas className="absolute inset-0" title="render stage">
          <Background color="black"></Background>
          <Star color="yellow"></Star>
          <Planet planet={Mercury} color="gray"></Planet>
          <Planet planet={Venus} color="tan"></Planet>
          <Planet planet={Earth} color="blue"></Planet>
          <Planet planet={Mars} color="red"></Planet>
        </Canvas>
      </AnimationTimer.Provider>
      <div className="fixed text-black bg-white">
        <button onClick={() => setTick(tick + 1 * MINUTE)}>One Minute</button>
        <button onClick={() => setTick(tick + 1 * HOUR)}>One Hour</button>
        <button onClick={() => setTick(tick + 1 * DAY)}>One Day</button>
        <button onClick={() => setTick(tick + 30 * DAY)}>One Month</button>
      </div>
    </div>
  );
}

export default App;
