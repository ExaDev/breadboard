import { useState } from "react";
import "./App.css";
import BreadboardInputView from "./views/BreadboardInputView";
//import BreadboardToastsView from "./views/BreadboardToastsView";

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
            {/* <EmbedWrapper /> */}
            {/* <PreviewWrapper /> */}
            {/*  <BreadboardToastsView /> */}
            <BreadboardInputView />
          </>
        )}
      </div>
    </>
  );
}

export default App;
