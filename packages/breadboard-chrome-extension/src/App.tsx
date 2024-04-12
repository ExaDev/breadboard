import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import myBoard from "./breadboard";
import breadboardLogo from "/breadboard-logo.svg";

function App() {

  const onClick = async (): Promise<void> => {
	const boardRun = await myBoard({ message: "ajsdhsakj", claudeKey: "" });
	console.log(boardRun);
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
        <a href="https://github.com/breadboard-ai/breadboard" target="_blank">
          <img
            src={breadboardLogo}
            className="logo breadboard"
            alt="Breadboard logo"
          />
        </a>
      </div>
      <h1>Vite + React + Breadboard</h1>
      <div className="card">
	  <button type="submit" onClick={onClick}>Run summarisation board</button>
      </div>
    </>
  );
}

export default App;
