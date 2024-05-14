import React from "react";

const BoardSettings = (): React.JSX.Element => {
  //References to inputs created below as JSX
  const inputRef = React.createRef<HTMLInputElement>();
  const statusRef = React.createRef<HTMLDivElement>();
  const taskRef = React.createRef<HTMLSelectElement>();

  const saveKey = () => {
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

  const saveModel = () => {
    const model = taskRef.current?.value;
    chrome.storage.sync.set({ model: model }, () => {
      // Update status to let user know options were saved.
      const status = statusRef.current;
      if (status) {
        status.textContent = "Claude summarisation model saved.";
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
          <li>Integrations</li>
        </ul>
      </aside>
      <section>
        <h4>Anthropic Claude</h4>
        <label htmlFor="inputRef">API Key</label>
        <input ref={inputRef} type="password" />
        <button onClick={saveKey}>Save</button>
        <div ref={statusRef}></div>
        <label htmlFor="inputRef">Model</label>
        <select ref={taskRef}>
          <option>claude-2</option>
          <option>claude-3</option>
        </select>
        <button onClick={saveModel}>Save</button>
      </section>
    </>
  );
};

export default BoardSettings;
