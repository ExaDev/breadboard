import { useEffect, useState } from "react";
import useActiveTab from "../../../chrome-api-hooks/use-active-tab";
import useCurrentTabText from "../../../chrome-api-hooks/use-current-tab-text";
import { PacmanLoader } from "react-spinners";
import { ExtensionBoardRunner } from "@breadboard/classes/ExtensionBoardRunner";
import serializedLabellingBoard from "@breadboard/graphs/HuggingFaceLabellingBoard.json";
import useTextSelection from "@/chrome-api-hooks/use-text-selection";
import "./Labelling.css";

const Labelling = (): React.JSX.Element => {
  const [output, setOutput] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get(["HUGGING_FACE_API_KEY"], (result) => {
      setKey(result["HUGGING_FACE_API_KEY"]);
    });
  }, [key]);

  const handlePageLabelling = async (): Promise<void> => {
    const activeTab = await useActiveTab();
    const activeTabText = await useCurrentTabText(activeTab.id ?? 0);
    setLoading(true);
    const extensionRunner = new ExtensionBoardRunner(
      serializedLabellingBoard,
      []
    );
    const boardRun = await extensionRunner.runBoard({
      inputs: activeTabText,
      apiKey: key,
      candidate_labels: "travel, England, history",
      multi_label: true,
      use_cache: false,
      wait_for_model: true,
    });
    console.log(boardRun);
    if (boardRun) {
      const boardResponse: any = boardRun.response;
      setOutput(boardResponse);
      setLoading(false);
    }
  };

  const handleSelectionLabelling = async (): Promise<void> => {
    const activeTab = await useActiveTab();
    const result = await useTextSelection(activeTab.id ?? 0);
    setLoading(true);
    setLoading(true);
    const extensionRunner = new ExtensionBoardRunner(
      serializedLabellingBoard,
      []
    );
    const boardRun = await extensionRunner.runBoard({
      inputs: result,
      apiKey: key,
      candidate_labels: "travel, England, history",
      multi_label: true,
      use_cache: false,
      wait_for_model: true,
    });
    if (boardRun) {
      const boardResponse: any = boardRun.response;
      setOutput(boardResponse);
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="summarisationForm">
        <button type="submit" onClick={handlePageLabelling}>
          Label text on this page
        </button>
        <button className="submitSelected" onClick={handleSelectionLabelling}>
          Label selected text
        </button>
      </section>
      <section className="summary">
        <div>
          {loading ? (
            <PacmanLoader loading={loading} color="#ef7900" />
          ) : (
            <div className="resultsGrid">
              <div className="resultsGridData">
                {output?.labels.map((r: string) => <p>{r}</p>)}
              </div>
              <div className="resultsGridData">
                {output?.scores.map((r: string) => <p>{r}</p>)}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Labelling;
