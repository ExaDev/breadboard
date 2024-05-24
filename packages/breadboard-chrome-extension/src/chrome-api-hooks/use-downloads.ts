import { NodeValue } from "@google-labs/breadboard";

const useDownloads = (textToSave: NodeValue) => {
  chrome.downloads.download({
    url: "data:text/plain," + textToSave,
    filename: "summary.txt",
    conflictAction: "uniquify",
    saveAs: false,
  });
};

export default useDownloads;
