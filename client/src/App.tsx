import './App.css';
import { Background } from './render/Background';
import { Canvas } from './render/Canvas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas title="render stage">
          <Background color="yellow"></Background>
        </Canvas>
      </header>
    </div>
  );
}

export default App;
