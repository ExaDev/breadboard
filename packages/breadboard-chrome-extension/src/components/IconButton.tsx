import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import "./IconButton.css";

interface Params {
  className?: string;
  Icon: IconDefinition;
  onClick?: () => void;
}

export const IconButton = ({ Icon, onClick }: Params): ReactElement => {
  return (
    <button className="iconButton" onClick={onClick}>
      <div>
        <FontAwesomeIcon icon={Icon} />
      </div>
    </button>
  );
};
