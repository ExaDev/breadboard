chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "settings",
    title: "Settings",
    type: "normal",
    contexts: ["action"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  console.log(info);
  chrome.windows.create({
    url: chrome.runtime.getURL("src/pages/settings/index.html"),
    type: "popup",
    width: 200,
    height: 200,
  });
});
