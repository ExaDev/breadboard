chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "settings",
    title: "Settings",
    type: "normal",
    contexts: ["action"],
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "settings") {
    const currentWindow = await chrome.windows.getCurrent();
    const screenWidth = currentWindow.width;
    const screenHeight = currentWindow.height;
    chrome.windows.create({
      url: chrome.runtime.getURL("src/pages/settings/index.html"),
      type: "popup",
      width: 700,
      height: 500,
      left: screenWidth ? Math.round(screenWidth / 2 - 700 / 2) : 0,
      top: screenHeight ? Math.round(screenHeight / 2 - 500 / 2) : 0,
    });
  }
});
