import React from "react";

const BoardSettings = (): React.JSX.Element => {
  //References to inputs created below as JSX
  const inputRef = React.createRef<HTMLInputElement>();
  const statusRef = React.createRef<HTMLDivElement>();

  const saveOptions = () => {
    const apiKey = inputRef.current?.value;
    chrome.storage.sync.set({ apiKey: apiKey }, () => {
      // Update status to let user know options were saved.
      const status = statusRef.current;
      if (status) {
        status.textContent = "Claude API key saved.";
        setTimeout(() => {
          status.textContent = "";
        }, 750);
      }
    });
  };

  return (
    <>
      <aside>
        <ul>
          <li>Board settings</li>
        </ul>
      </aside>
      <main>
        <label htmlFor="inputRef">Please enter your API Key</label>
        <input ref={inputRef} type="password" />
        <button onClick={saveOptions}>Save</button>
        <div ref={statusRef}></div>
      </main>
    </>
  );
};

export default BoardSettings;
