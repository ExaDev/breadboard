import "./App.css";
import myBoard from "./breadboard";
import breadboardLogo from "/breadboard-logo.svg";
import { useState } from "react";
import React from "react";
//import { Readability } from "@mozilla/readability";

function App() {
  const [textToSummarise, setTextToSummarise] = useState<string>("");
  const [apiKey, setApiKey] = useState<string>("");
  const [summary, setSummary] = useState<React.ReactNode | undefined>(
    undefined
  );

  const textInput = React.createRef<HTMLTextAreaElement>();
  const keyInput = React.createRef<HTMLInputElement>();

  /*  useEffect(() => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        const activeTab = tabs[0];
        const activeUrl = activeTab.url;
        // const tabDom = activeTab.highlighted;

        const res = await (await fetch(activeUrl ?? "")).json();
        const article = new Readability(document).parse();
      }
    );
  }, []); */

  const onClick = async (): Promise<void> => {
    const boardRun = await myBoard({
      message: textToSummarise,
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
        <label htmlFor="textInput">Enter your article to summarise</label>
        <textarea
          id="textInput"
          ref={textInput}
          onChange={(): void => {
            if (textInput.current !== null)
              setTextToSummarise(textInput.current.value); //TODO: create hook for setting the value of a ref
          }}
        ></textarea>
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
