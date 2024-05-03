import claudeSummarisationBoard from "../../breadboard/summarise";

let apiKey = "";

const getApiKey = () =>
  chrome.storage.sync.get(["apiKey"], async (result) => {
    apiKey = await result["apiKey"];
  });

chrome.contextMenus.create({
  id: "bb-context-menu",
  title: "Send selection to Breadboard",
  type: "normal",
  contexts: ["selection"],
});

/* chrome.contextMenus.create({
  id: "bb-context-menu",
  title: "Send page to Breadboard",
  type: "normal",
  contexts: [""],
}); */

chrome.contextMenus.onClicked.addListener(async () => {
  getApiKey();
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  let result;
  chrome.action.setBadgeText({ text: "ON" });
  try {
    [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id ?? 0 },
      func: () => getSelection()?.toString(),
    });
  } catch (e) {
    return; // ignoring an unsupported page like chrome://extensions
  }
  const boardRun = await claudeSummarisationBoard({
    message: result,
    claudeKey: apiKey,
  });
  chrome.action.setBadgeText({ text: "DONE" });
  console.log(boardRun["completion"]);
});
