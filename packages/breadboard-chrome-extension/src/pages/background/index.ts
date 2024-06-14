import useDownloads from "@/chrome-api-hooks/use-downloads";
import serializedClaudeBoard from "@breadboard/graphs/claudeSummarisationBoard.json";
import "@settings/background-scripts/settings";
import { ExtensionBoardRunner } from "@/breadboard/classes/ExtensionBoardRunner";
import { ClaudeKit } from "@/breadboard/kits/kits-as-code-node";
import { API_KEY_NAME } from "@/chrome-api-hooks/types/types";

//Get api key from local storage
let apiKey = "";
const getApiKey = () => {
  chrome.storage.sync.get([API_KEY_NAME], (result) => {
    apiKey = result[API_KEY_NAME];
  });
};

//#region LISTENERS FOR CONTEXT MENU/SUBMENU AND BADGE

//Define context menu for sending current selection to Breadboard
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "bb-context-menu",
    title: "Send selection to Breadboard",
    type: "normal",
    contexts: ["selection"],
  });
});

//Define submenu for menu with id of "bb-sub-context-menu-summary"
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "bb-sub-context-menu-summary",
    title: "Summarise",
    parentId: "bb-context-menu",
    contexts: ["selection"],
  });
});

//Define submenu for menu with id of "bb-sub-context-menu-sentiment"
/* chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "bb-sub-context-menu-sentiment",
    title: "Get sentiment",
    parentId: "bb-context-menu",
    contexts: ["selection"],
  });
}); */

//Add onClicked event listener if the menu item id matches that of the submenu created previously
chrome.contextMenus.onClicked.addListener(async (info) => {
  switch (info.menuItemId) {
    case "bb-sub-context-menu-summary":
      handleSummariseClick(info);
      break;
    /* case "bb-sub-context-menu-sentiment":
      handleSentimentClick(info);
      break; */
    default:
      break;
  }
});

//Set the badge text back to " " when the current tab is updated (on page refresh)
chrome.tabs.onUpdated.addListener(() => {
  chrome.action.setBadgeText({ text: "" });
});

//#endregion

//Handle click for the Summarise sub menu option
const handleSummariseClick = async (info: chrome.contextMenus.OnClickData) => {
  getApiKey(); //Get Claude API key from storage
  const result = info.selectionText;
  chrome.action.setBadgeText({ text: "ON" });
  const extensionRunner = new ExtensionBoardRunner(serializedClaudeBoard, [
    ClaudeKit,
  ]);
  const boardRun = await extensionRunner.runBoard({
    message: result,
    claudeKey: apiKey,
  });
  console.log(boardRun);
  if (boardRun) {
    useDownloads(boardRun["completion"]);
    chrome.action.setBadgeText({ text: "DONE" });
  }
};
