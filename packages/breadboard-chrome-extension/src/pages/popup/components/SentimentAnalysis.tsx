import React, { useEffect, useState } from "react";
import { PacmanLoader } from "react-spinners";
import useActiveTab from "../../../chrome-api-hooks/use-active-tab";
import useTextSelection from "../../../chrome-api-hooks/use-text-selection";
import { ExtensionBoardRunner } from "@/breadboard/classes/ExtensionBoardRunner";
import serializedSentimentBoard from "../../../breadboard/graphs/sentimentBoard.json";

const SentimentAnalysis = (): React.JSX.Element => {
  const [output, setOutput] = useState<React.ReactNode | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState<string>("");

  useEffect(() => {
    chrome.storage.sync.get(["HUGGING_FACE_API_KEY"], (result) => {
      setKey(result["HUGGING_FACE_API_KEY"]);
    });
  }, [key]);

  const handleSelectionSentiment = async () => {
    const activeTab = await useActiveTab();
    const result = await useTextSelection(activeTab.id ?? 0);
    setLoading(true);
    const extensionRunner = new ExtensionBoardRunner(serializedSentimentBoard, []);
    const boardRun = await extensionRunner.runBoard({
		inputs: result,
		apiKey: key,
		use_cache: true,
		wait_for_model: false
    });
	console.log(boardRun)
    if (boardRun) setOutput(boardRun["output"] as React.ReactNode);
    setLoading(false);
  };

  return (
    <main>
      <section className="summarisationForm">
        <button className="submitSelected" onClick={handleSelectionSentiment}>
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
