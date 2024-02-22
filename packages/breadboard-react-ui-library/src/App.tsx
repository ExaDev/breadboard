import { useState } from "react";
import "./App.css";
import EmbedWrapper from "./components/Embed";

function App() {
  const [preview, setPreview] = useState(false);

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <button id="toast-info" onClick={() => setPreview(true)}>
          Show Board Preview
        </button>
        {preview && (
          <>
            <EmbedWrapper />
          </>
        )}
      </div>
    </>
  );
}

export default App;
