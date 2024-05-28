import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useState } from "react";
import { IconButton } from "@/components/IconButton";
import { Button } from "@/components/Button";

const BoardSettings = (): React.JSX.Element => {
  //References to inputs created below as JSX
  const nameRef = React.createRef<HTMLInputElement>();
  const valueRef = React.createRef<HTMLInputElement>();
  const statusRef = React.createRef<HTMLDivElement>();
  const [showSettingsGroup, setShowSettingsGroup] = useState<boolean>(true);
  const [secretsToAdd, setSecretsToAdd] = useState<
    { name: string; value: string }[]
  >([]);

  const saveKey = () => {
    secretsToAdd.map(({ name, value }) => {
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
    });
  };

  const secretsRow = () => {
    return (
      <>
        <input ref={nameRef} type="text" />
        <input ref={valueRef} type="password" />
        <IconButton
          onClick={() =>
            onAddClick(
              nameRef.current?.value ?? "",
              valueRef.current?.value ?? ""
            )
          }
          Icon={faPlus}
        />
      </>
    );
  };

  const onAddClick = useCallback(
    (name: string, value: string) => {
      if (secretsToAdd.findIndex((val) => val.name === name) === -1) {
        secretsToAdd.push({ name, value });
        setSecretsToAdd(Object.assign([], secretsToAdd));
      }
    },
    [secretsToAdd, setSecretsToAdd]
  );

  const onRemoveClick = useCallback(
    (keyToDelete: string) => {
      return () => {
        const filteredEmails = secretsToAdd.filter(
          (val) => val.name !== keyToDelete
        );
        setSecretsToAdd(filteredEmails);
      };
    },
    [secretsToAdd, setSecretsToAdd]
  );

  return (
    <>
      <ul className="settingsGroup">
        <li className="settingsGroupButtons">
          <Button title="General" />
          <Button title="Secrets" onClick={() => setShowSettingsGroup(true)} />
          <Button title="Boards" />
          <Button title="Saved Outputs" />
        </li>
        {showSettingsGroup ? (
          <li className="settingsGroupItems">
            <p>
              This is where you can set secrets as key-value pairs. For example,
              you can add a Claude API key for performing text summarisation.
            </p>
            <div className="secretFields">{secretsRow()}</div>
            <div>
              {secretsToAdd.map((nameAndValue) => (
                <div>
                  <span>{nameAndValue.name}</span>
                  <IconButton
                    Icon={faTrash}
                    onClick={onRemoveClick(nameAndValue.name)}
                  />
                </div>
              ))}
            </div>
            <div ref={statusRef} />
          </li>
        ) : null}
      </ul>
      <footer>
        <button className="saveButton" onClick={saveKey}>
          Save
        </button>
        <button className="cancelButton" onClick={(): void => {}}>
          Cancel
        </button>
      </footer>
    </>
  );
};

export default BoardSettings;
