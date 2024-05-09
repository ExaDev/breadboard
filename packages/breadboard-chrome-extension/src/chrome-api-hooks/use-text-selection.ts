const useTextSelection = async (
  activeTabId: number
): Promise<string | undefined> => {
  let result;
  try {
    [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: activeTabId },
      func: () => getSelection()?.toString(),
    });
  } catch (e) {
    return;
  }
  return result;
};

export default useTextSelection;
