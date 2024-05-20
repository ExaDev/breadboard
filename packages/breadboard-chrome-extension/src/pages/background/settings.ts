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
    width: 700,
    height: 500,
    //left: screenWidth / 2 - 700 / 2, //get screen width and height to enable the calculation
    //top: screenHeight / 2 - 500 / 2,
  });
});
