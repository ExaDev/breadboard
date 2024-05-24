import { useEffect, useState } from "react";
import useActiveTab from "../../../chrome-api-hooks/use-active-tab";
import useCurrentTabText from "../../../chrome-api-hooks/use-current-tab-text";
import { PacmanLoader } from "react-spinners";
import useTextSelection from "../../../chrome-api-hooks/use-text-selection";
import { ExtensionBoardRunner } from "@breadboard/classes/ExtensionBoardRunner";
import serializedClaudeBoard from "@breadboard/graphs/claudeBoard.json";
import { ClaudeKit } from "@breadboard/kits/kits-as-code-node";

const Summariser = (): React.JSX.Element => {
  const [output, setOutput] = useState<React.ReactNode | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get(["CLAUDE_API_KEY"], (result) => {
      setKey(result["CLAUDE_API_KEY"]);
    });
  }, [key]);

  const handlePageSummarisation = async (): Promise<void> => {
    const activeTab = await useActiveTab();
    const activeTabText = await useCurrentTabText(activeTab.id ?? 0);
    setLoading(true); //TODO: use the "status" property on the boardRun to set loading
    const extensionRunner = new ExtensionBoardRunner(serializedClaudeBoard, [
      ClaudeKit,
    ]);
    const boardRun = await extensionRunner.runBoard({
      message: activeTabText,
      claudeKey: key,
    });
    if (boardRun) setOutput(boardRun["completion"] as React.ReactNode);
    setLoading(false);
  };

  const handleSelectionSummarisation = async () => {
    const activeTab = await useActiveTab();
    const result = await useTextSelection(activeTab.id ?? 0);
    setLoading(true);
    const extensionRunner = new ExtensionBoardRunner(serializedClaudeBoard, [
      ClaudeKit,
    ]);
    const boardRun = await extensionRunner.runBoard({
      message: result,
      claudeKey: key,
    });
    if (boardRun) setOutput(boardRun["completion"] as React.ReactNode);
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
