import "./App.css";
import myBoard from "../../breadboard/index";
import breadboardLogo from "/breadboard-logo.svg";
import viteLogo from "/vite.svg";
import reactLogo from "../../assets/react.svg";
import { useEffect, useState } from "react";
import React from "react";
import { PacmanLoader } from "react-spinners";
import useActiveTab from "../../chrome-api-hooks/use-active-tab";
import useCurrentTabText from "../../chrome-api-hooks/use-current-tab-text";

function App() {
  const [summary, setSummary] = useState<React.ReactNode | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get(["apiKey"], (result) => {
      console.log(result["apiKey"]);
      setKey(result["apiKey"]);
    });
  }, [key]);

  const onClick = async (): Promise<void> => {
    //setAlarm();
    const activeTab = await useActiveTab();
    const activeTabText = await useCurrentTabText(activeTab.id ?? 0);
    setLoading(true); //TODO: use the "status" property on the boardRun to set loading
    const boardRun = await myBoard({
      //TODO: move board runner into its own separate class
      message: activeTabText,
      claudeKey: key,
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
        <section className="summarisationForm">
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
