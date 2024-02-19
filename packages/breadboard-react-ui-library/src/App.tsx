import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Toast from "./components/Toast";
import "../../breadboard-ui/public/styles/global.css";

function App() {
  const [count, setCount] = useState(0);
  const [info, setInfo] = useState(false);

  const handleError = () => {
    console.log("error");
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <button id="toast-info" onClick={() => setInfo(true)}>
          Info Toast
        </button>
        {info && (
          <Toast
            onClick={() => console.log("clicked")}
            onError={handleError}
            errorMessage="Error message"
            toastMessage="Info"
          />
        )}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
