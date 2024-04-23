import "./App.css";
import myBoard from "./breadboard";
import breadboardLogo from "/breadboard-logo.svg";
import viteLogo from "/vite.svg";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
import React from "react";
import { PacmanLoader } from "react-spinners";
import useActiveTab from "./chrome-api-hooks/use-active-tab";
import useCurrentTabText from "./chrome-api-hooks/use-current-tab-text";

function App() {
  const [apiKey, setApiKey] = useState<string>("");
  const [summary, setSummary] = useState<React.ReactNode | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  const keyInput = React.createRef<HTMLInputElement>(); //TODO: use local storage for api key

  const onClick = async (): Promise<void> => {
    //setAlarm();
    const activeTab = await useActiveTab();
    const activeTabText = await useCurrentTabText(activeTab.id ?? 0);
    setLoading(true); //TODO: use the "status" property on the boardRun to set loading
    const boardRun = await myBoard({
      //TODO: move board runner into its own separate class
      message: activeTabText,
      claudeKey: apiKey,
    });
    setSummary(boardRun["completion"] as React.ReactNode);
    setLoading(false);
    //clearAlarm();
  };

  /* const setAlarm = () => {
    chrome.action.setBadgeText({ text: "ON" });
  };

  const clearAlarm = () => {
    chrome.action.setBadgeText({ text: "DONE" });
    chrome.alarms.clearAll();
  }; */

  return (
    <>
      <header>
        <a href="https://github.com/breadboard-ai/breadboard" target="_blank">
          <img src={breadboardLogo} className="logo" alt="Breadboard logo" />{" "}
        </a>
        <h4>Breadboard Summariser</h4>
      </header>
      <main>
        <section className="summarisationForm">
          <label htmlFor="keyInput">Please enter your API Key</label>
          <input
            id="keyInput"
            ref={keyInput}
            type="password"
            onChange={(): void => {
              if (keyInput.current !== null) setApiKey(keyInput.current!.value);
            }}
          ></input>
          <button type="submit" onClick={onClick}>
            Generate summary!
          </button>
        </section>
        <section className="summary">
          <p>
            {loading ? (
              <PacmanLoader loading={loading} color="#ef7900" />
            ) : (
              summary
            )}
          </p>
        </section>
      </main>
      <footer>
        <p>Made with</p>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        +
        <a href="https://react.dev" target="_blank">
          <img
            src={chrome.runtime.getURL(reactLogo)}
            className="logo react"
            alt="React logo"
          />
        </a>
      </footer>
    </>
  );
}

export default App;
