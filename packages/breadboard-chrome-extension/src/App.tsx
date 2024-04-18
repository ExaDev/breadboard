import "./App.css";
import myBoard from "./breadboard";
import breadboardLogo from "/breadboard-logo.svg";
import { useState } from "react";
import React from "react";
import { PuffLoader } from "react-spinners";

function App() {
  const [apiKey, setApiKey] = useState<string>("");
  const [summary, setSummary] = useState<React.ReactNode | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  const keyInput = React.createRef<HTMLInputElement>(); //TODO: use local storage for api key

  const onClick = async (): Promise<void> => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    const callback = await chrome.scripting.executeScript({
      target: { tabId: tab.id ? tab.id : 0 },
      func: () => document.body.innerText,
    });
    console.log(callback[0]);
    setLoading(true); //TODO: use the "status" property on the boardRun to set loading
    const boardRun = await myBoard({
      //TODO: move board runner into its own separate class
      message: callback[0].result,
      claudeKey: apiKey,
    });
    setSummary(boardRun["completion"] as React.ReactNode);
    setLoading(false);
  };

  return (
    <>
      <header>
        <a href="https://github.com/breadboard-ai/breadboard" target="_blank">
          <img src={breadboardLogo} className="logo" alt="Breadboard logo" />{" "}
        </a>
        <h4>Breadboard Summariser</h4>
      </header>
      <main>
        <label htmlFor="keyInput">Please enter your API Key</label>
        <input
          id="keyInput"
          ref={keyInput}
          onChange={(): void => {
            if (keyInput.current !== null) setApiKey(keyInput.current!.value);
          }}
        ></input>
        <button type="submit" onClick={onClick}>
          Generate summary!
        </button>
        <p>
          {loading ? <PuffLoader loading={loading} color="#ef7900" /> : summary}
        </p>
      </main>
      <footer>
        <p>Made with Vite, React, Breadboard</p>
      </footer>
    </>
  );
}

export default App;
