import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import { sentimentAnalysisBoard } from "../../../breadboard/sentiment-analysis";
import useActiveTab from "../../../chrome-api-hooks/use-active-tab";
import useCurrentTabText from "../../../chrome-api-hooks/use-current-tab-text";

const SentimentAnalysis = (): React.JSX.Element => {
  const [output, setOutput] = useState<React.ReactNode | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const runBoard = async (message: string | undefined) => {
    const board = await sentimentAnalysisBoard({
      message: message,
    });
    return board;
  };

  const handlePageText = async () => {
    const activeTab = await useActiveTab();
    const activeTabText = await useCurrentTabText(activeTab.id ?? 0);
    setLoading(true); //TODO: use the "status" property on the boardRun to set loading
    const boardRun = await runBoard(activeTabText);
    setOutput(boardRun["output"] as React.ReactNode);
    setLoading(false);
  };

  return (
    <main>
      <section className="summarisationForm">
        <button className="submitSelected" onClick={handlePageText}>
          Get sentiment of page
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
