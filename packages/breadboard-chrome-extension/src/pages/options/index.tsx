import React from "react";
import { createRoot } from "react-dom/client";

const boardSettings = (): React.JSX.Element => {
	const dropdownRef = React.createRef<HTMLSelectElement>();
	const statusRef = React.createRef<HTMLDivElement>();

	const saveOptions = () => {
		const chosenBoard = dropdownRef.current?.value;
		chrome.storage.sync.set(
			{ board: chosenBoard },
			() => {
				// Update status to let user know options were saved.
				const status = statusRef.current;
				if(status) {
					status.textContent = 'Options saved.';
					setTimeout(() => {
						status.textContent = '';
					}, 750);
				}
			}
		);
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
		<select id="board" ref={dropdownRef}>
			<option value="summarise">Claude Summarisation Board</option>
			<option value="blank">Blank Board</option>
		</select>
		<div id="status" ref={statusRef}></div>
		<button id="save" onClick={saveOptions}>Save</button>
	</>
	)
}

const container = document.createElement('main');
document.body.appendChild(container);
const root = createRoot(container);
root.render(boardSettings());
