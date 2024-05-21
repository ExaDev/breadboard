import React, { useState } from "react";

const BoardSettings = (): React.JSX.Element => {
  //References to inputs created below as JSX
  const nameRef = React.createRef<HTMLInputElement>();
  const valueRef = React.createRef<HTMLInputElement>();
  const statusRef = React.createRef<HTMLDivElement>();
  //const taskRef = React.createRef<HTMLSelectElement>();
  const [showSettingsGroup, setShowSettingsGroup] = useState<boolean>(false);

  const saveKey = () => {
    const name = nameRef.current?.value;
    const value = valueRef.current?.value;
    if (name && value) {
      chrome.storage.sync.set({ [name]: value }, () => {
        // Update status to let user know options were saved.
        console.log(name, value);
        const status = statusRef.current;
        if (status) {
          status.textContent = "Key-Value pair saved";
          setTimeout(() => {
            status.textContent = "";
          }, 750);
        }
      });
    }
  };

  /* const saveModel = () => {
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
  }; */

  return (
    <ul className="settingsGroup">
      <li>
        <button
          className="settingGroupName"
          onClick={() => setShowSettingsGroup(true)}
        >
          Secrets
        </button>
      </li>
      {showSettingsGroup ? (
        <section className="settingsGroupItems">
          <label htmlFor="nameRef">Name</label>
          <input ref={nameRef} type="text" />
          <label htmlFor="valueRef">Value</label>
          <input ref={valueRef} type="password" />
          <button onClick={saveKey}>Save</button>
        </section>
      ) : null}
    </ul>
  );
};

export default BoardSettings;
