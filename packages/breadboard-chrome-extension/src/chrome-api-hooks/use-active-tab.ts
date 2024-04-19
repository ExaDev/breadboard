const useActiveTab = async (): Promise<chrome.tabs.Tab> => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  return tab;
};

export default useActiveTab;
