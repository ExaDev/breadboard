import { useEffect, useState } from "react";
import useCurrentTabText from "../../../chrome-api-hooks/use-current-tab-text";
import { PacmanLoader } from "react-spinners";
import useTextSelection from "../../../chrome-api-hooks/use-text-selection";
import { ExtensionBoardRunner } from "@breadboard/classes/ExtensionBoardRunner";
import serializedClaudeBoard from "@breadboard/graphs/claudeSummarisationBoard.json";
import { ClaudeKit } from "@breadboard/kits/kits-as-code-node";
import { API_KEY_NAME } from "@/chrome-api-hooks/types/types";

const Summariser = (): React.JSX.Element => {
  const [output, setOutput] = useState<React.ReactNode | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get([API_KEY_NAME], (result) => {
      setKey(result[API_KEY_NAME]);
    });
  }, [key]);

  const handlePageSummarisation = async (): Promise<void> => {
    const activeTabText = await useCurrentTabText();
    setLoading(true);
    const extensionRunner = new ExtensionBoardRunner(serializedClaudeBoard, [
      ClaudeKit,
    ]);
    const boardRun = await extensionRunner.runBoard({
      message: activeTabText,
      claudeKey: key,
    });
    if (boardRun) {
      setOutput(boardRun["completion"] as React.ReactNode);
      setLoading(false);
    }
  };

  const handleSelectionSummarisation = async () => {
    const result = await useTextSelection();
    setLoading(true);
    const extensionRunner = new ExtensionBoardRunner(serializedClaudeBoard, [
      ClaudeKit,
    ]);
    const boardRun = await extensionRunner.runBoard({
      message: result,
      claudeKey: key,
    });
    if (boardRun) {
      setOutput(boardRun["completion"] as React.ReactNode);
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="outputForm">
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
      <section className="output">
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
