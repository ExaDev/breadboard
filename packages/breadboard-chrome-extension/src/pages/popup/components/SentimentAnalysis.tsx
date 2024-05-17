import React, { useState } from "react";
import { PacmanLoader } from "react-spinners";
import sentimentAnalysisBoard from "../../../breadboard/boards/sentiment-analysis";
import useActiveTab from "../../../chrome-api-hooks/use-active-tab";
import useTextSelection from "../../../chrome-api-hooks/use-text-selection";

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
    const activeTabId = (await useActiveTab()).id;
    const result = useTextSelection(activeTabId ?? 0);
    setLoading(true);
    const boardRun = await runBoard(await result);
    console.log(JSON.stringify(boardRun["output"], null, 2));
    setOutput(JSON.stringify(boardRun["output"], null, 2));
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
