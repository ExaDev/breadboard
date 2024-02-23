import { useState } from "react";
import "./App.css";
import EmbedWrapper from "./components/Embed";

function App() {
  const [preview, setPreview] = useState(false);

  return (
    <>
      <div className="card">
        <button id="toast-info" onClick={() => setPreview(true)}>
          Show Embedded Board
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
