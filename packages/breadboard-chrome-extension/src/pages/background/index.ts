import sentimentAnalysisBoard from "../../breadboard/boards/sentiment-analysis";
import claudeSummarisationBoard from "../../breadboard/boards/summarise";
import "./settings";
/** LISTENERS FOR CONTEXT MENU/SUBMENU AND BADGE */

//Get api key from local storage
let apiKey = "";
const getApiKey = () => {
  chrome.storage.sync.get(["apiKey"], async (result) => {
    apiKey = await result["apiKey"];
  });
};

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
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "bb-sub-context-menu-sentiment",
    title: "Get sentiment",
    parentId: "bb-context-menu",
    contexts: ["selection"],
  });
});

/* //Define submenu for menu with id of "bb-sub-context-menu-translate"
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "bb-sub-context-menu-translate",
    title: "Get translation",
    parentId: "bb-context-menu",
    contexts: ["selection"],
  });
});
 */
//Add onClicked event listener if the menu item id matches that of the submenu created previously
chrome.contextMenus.onClicked.addListener(async (info) => {
  switch (info.menuItemId) {
    case "bb-sub-context-menu-summary":
      handleSummariseClick(info);
      break;
    case "bb-sub-context-menu-sentiment":
      handleSentimentClick(info);
      break;
    /* case "bb-sub-context-menu-translate":
      handleTranslateClick(info);
      break; */
    default:
      console.log("default case");
      break;
  }
});

//Set the badge text back to " " when the current tab is updated (on page refresh)
chrome.tabs.onUpdated.addListener(() => {
  chrome.action.setBadgeText({ text: "" });
});

//Handle click for the Summarise sub menu option
const handleSummariseClick = async (info: chrome.contextMenus.OnClickData) => {
  getApiKey(); //Get Claude API key from storage
  const result = info.selectionText;
  chrome.action.setBadgeText({ text: "ON" });
  const boardRun = await claudeSummarisationBoard({
    message: result,
    claudeKey: apiKey,
  });
  console.log(boardRun["completion"]);
  chrome.action.setBadgeText({ text: "DONE" });
};

//Handle click for the Get sentiment sub menu option
const handleSentimentClick = async (info: chrome.contextMenus.OnClickData) => {
  const result = info.selectionText;
  chrome.action.setBadgeText({ text: "ON" });
  const boardRun = await sentimentAnalysisBoard({
    message: result,
  });
  console.log(JSON.stringify(boardRun["output"], null, 2));
  chrome.action.setBadgeText({ text: "DONE" });
};

//Handle click for the Get sentiment sub menu option
/* const handleTranslateClick = async (info: chrome.contextMenus.OnClickData) => {
  console.log(info);
  const message =
    "The tower is 324 metres (1,063 ft) tall, about the same height as an 81-storey building, and the tallest structure in Paris. Its base is square, measuring 125 metres (410 ft) on each side. During its construction, the Eiffel Tower surpassed the Washington Monument to become the tallest man-made structure in the world, a title it held for 41 years until the Chrysler Building in New York City was finished in 1930. It was the first structure to reach a height of 300 metres. Due to the addition of a broadcasting aerial at the top of the tower in 1957, it is now taller than the Chrysler Building by 5.2 metres (17 ft). Excluding transmitters, the Eiffel Tower is the second tallest free-standing structure in France after the Millau Viaduct.";

  const extensionRunner = new ExtensionBoardRunner(serializedBoard);
  extensionRunner.runBoard({
    message: message,
    claudeKey: apiKey,
  });
}; */
