import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const boardSettings = (): React.JSX.Element => {
  const inputRef = React.createRef<HTMLInputElement>();
  const statusRef = React.createRef<HTMLDivElement>();

  const saveOptions = () => {
    const apiKey = inputRef.current?.value;
    chrome.storage.sync.set({ apiKey: apiKey }, () => {
      // Update status to let user know options were saved.
      console.log("Value is set");
      const status = statusRef.current;
      if (status) {
        status.textContent = "API key saved.";
        setTimeout(() => {
          status.textContent = "";
        }, 750);
      }
    });
  };

  /* const restoreOptions = () => {
		chrome.storage.sync.get(
			{ board: 'blank' },
			(items) => {
				(document.getElementById('board') as HTMLSelectElement).value = items.favoriteColor;
			}
		);
	}; */

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

const container = document.createElement("div");
container.setAttribute("class", "settings");
document.body.appendChild(container);
const root = createRoot(container);
root.render(boardSettings());
