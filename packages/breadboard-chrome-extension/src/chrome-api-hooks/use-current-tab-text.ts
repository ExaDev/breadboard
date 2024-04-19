const useCurrentTabText = async (activeTabId: number): Promise<string> => {
  const callback = await chrome.scripting.executeScript({
    target: { tabId: activeTabId },
    func: () => document.body.innerText,
  });
  return callback[0].result;
};

export default useCurrentTabText;
