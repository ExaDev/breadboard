import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import { sentimentAnalysisBoard } from "../../../breadboard/sentiment-analysis";

const SentimentAnalysis = (): React.JSX.Element => {
  const [output, setOutput] = useState<React.ReactNode | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const runBoard = async (message: string | undefined) => {
    const board = await sentimentAnalysisBoard({
      message: message,
    });
    return board;
  };

  const handleSelection = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    let result;
    setLoading(true);
    try {
      [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id ?? 0 },
        func: () => getSelection()?.toString(),
      });
    } catch (e) {
      return;
    }
    const boardRun = await runBoard(result);
    console.log(boardRun);
    //console.log("output code node only", JSON.stringify(boardRun, null, 2));
    setOutput(boardRun["output"] as React.ReactNode);
    setLoading(false);
  };

  return (
    <main>
      <section className="summarisationForm">
        <button className="submitSelected" onClick={handleSelection}>
          Get sentiment for selected text
        </button>
      </section>
      <section className="summary">
        <p>
          {loading ? (
            <PacmanLoader loading={loading} color="#ef7900" />
          ) : (
            output
          )}
        </p>
      </section>
    </main>
  );
};

export default SentimentAnalysis;
