const useCurrentTabText = async (): Promise<string> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  const callback = await chrome.scripting.executeScript({
    target: { tabId: tab.id ?? 0 },
    func: () => document.body.innerText,
  });
  return callback[0].result;
};

export default useCurrentTabText;
