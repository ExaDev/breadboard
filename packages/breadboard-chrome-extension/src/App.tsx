import "./App.css";
import myBoard from "./breadboard";
import breadboardLogo from "/breadboard-logo.svg";
import { useState } from "react";
import React from "react";

function App() {
  const [apiKey, setApiKey] = useState<string>("");
  const [summary, setSummary] = useState<React.ReactNode | undefined>(
    undefined
  );

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
    const boardRun = await myBoard({
      //TODO: move board runner into its own separate class
      message: callback[0].result,
      claudeKey: apiKey,
    });
    setSummary(boardRun["completion"] as React.ReactNode);
  };

  return (
    <>
      <div>
        <a href="https://github.com/breadboard-ai/breadboard" target="_blank">
          <img
            src={breadboardLogo}
            className="logo breadboard"
            alt="Breadboard logo"
          />
        </a>
      </div>
      <h4>Made with Vite, React, Breadboard</h4>
      <div className="card">
        <label htmlFor="keyInput">Please enter your api key</label>
        <input
          id="keyInput"
          ref={keyInput}
          onChange={(): void => {
            if (keyInput.current !== null) setApiKey(keyInput.current!.value);
          }}
        ></input>
        <button type="submit" onClick={onClick}>
          Run summarisation board
        </button>
        <p>{summary ? summary : "Loading"}</p>
      </div>
    </>
  );
}

export default App;
