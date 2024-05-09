import claudeSummarisationBoard from "../../breadboard/summarise";
import useActiveTab from "../../chrome-api-hooks/use-active-tab";

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

//Define submenu for menu with id of "bb-context-menu-sub-1"
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "bb-context-menu-sub-1",
    title: "Summarise",
    parentId: "bb-context-menu",
    contexts: ["selection"],
  });
});

//Add onClicked event listener if the menu item id matches that of the submenu created previously
chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "bb-context-menu-sub-1") {
    getApiKey(); //Get Claude API key from storage
    const activeTabId = (await useActiveTab()).id;
    let result;
    chrome.action.setBadgeText({ text: "ON" });
    try {
      [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: activeTabId ?? 0 },
        func: () => getSelection()?.toString(),
      });
    } catch (e) {
      return;
    }
    const boardRun = await claudeSummarisationBoard({
      message: result,
      claudeKey: apiKey,
    });

    chrome.action.setBadgeText({ text: "DONE" });
    console.log(boardRun["completion"]);
  }
});

//Set the badge text back to " " when the current tab is updated (on page refresh)
chrome.tabs.onUpdated.addListener(() => {
  chrome.action.setBadgeText({ text: "" });
});
