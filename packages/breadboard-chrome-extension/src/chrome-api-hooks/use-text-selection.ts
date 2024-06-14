const useTextSelection = async (): Promise<string | undefined> => {
  let result;
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  try {
    [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id ?? 0 },
      func: () => getSelection()?.toString(),
    });
  } catch (e) {
    return;
  }
  return result;
};

export default useTextSelection;
