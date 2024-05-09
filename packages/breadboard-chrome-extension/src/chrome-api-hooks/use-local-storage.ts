const useLocalStorage = (entryName: string) => {
  let entry;
  chrome.storage.sync.get([entryName], async (result) => {
    entry = await result[entryName];
  });
  console.log(entry);
  return entry;
};

export default useLocalStorage;
