import { useEffect, useState } from "react";
import useActiveTab from "../../../chrome-api-hooks/use-active-tab";
import useCurrentTabText from "../../../chrome-api-hooks/use-current-tab-text";
import { PacmanLoader } from "react-spinners";
import { ExtensionBoardRunner } from "@breadboard/classes/ExtensionBoardRunner";
import serializedLabellingBoard from "@breadboard/graphs/HuggingFaceLabellingBoard.json";

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
      candidate_labels: "legal, economy",
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
      </section>
      <section className="summary">
        <p>
          {loading ? (
            <PacmanLoader loading={loading} color="#ef7900" />
          ) : (
            <div>
              {output?.labels.map((r: string) => <td>{r}</td>)}
              {output?.scores.map((r: string) => <td>{r}</td>)}
            </div>
          )}
        </p>
      </section>
    </main>
  );
};

export default Labelling;
