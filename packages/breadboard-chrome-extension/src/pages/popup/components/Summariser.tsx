import { useEffect, useState } from "react";
import { claudeSummarisationBoard } from "../../../breadboard/summarise";
import useActiveTab from "../../../chrome-api-hooks/use-active-tab";
import useCurrentTabText from "../../../chrome-api-hooks/use-current-tab-text";
import { PacmanLoader } from "react-spinners";
import useTextSelection from "../../../chrome-api-hooks/use-text-selection";

const Summariser = (): React.JSX.Element => {
  const [output, setOutput] = useState<React.ReactNode | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get(["apiKey"], (result) => {
      setKey(result["apiKey"]);
    });
  }, [key]);

  const runBoard = async (message: string, apiKey: string) => {
    const board = await claudeSummarisationBoard({
      message: message,
      claudeKey: apiKey,
    });
    return board;
  };

  const handlePageSummarisation = async (): Promise<void> => {
    const activeTab = await useActiveTab();
    const activeTabText = await useCurrentTabText(activeTab.id ?? 0);
    setLoading(true); //TODO: use the "status" property on the boardRun to set loading
    const boardRun = await runBoard(activeTabText, key);
    setOutput(boardRun["completion"] as React.ReactNode);
    setLoading(false);
  };

  const handleSelectionSummarisation = async () => {
    const activeTab = await useActiveTab();
    const result = await useTextSelection(activeTab.id ?? 0);
    setLoading(true);
    const boardRun = await runBoard(result ?? "", key);
    setOutput(boardRun["completion"] as React.ReactNode);
    setLoading(false);
  };

  return (
    <main>
      <section className="summarisationForm">
        <button type="submit" onClick={handlePageSummarisation}>
          Summarise this page
        </button>
        <button
          className="submitSelected"
          onClick={handleSelectionSummarisation}
        >
          Summarise selected text
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

export default Summariser;
